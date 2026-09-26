# Minimal GPT-2 small forward pass in NumPy (picoGPT-style) that also returns every attention map.
import json, struct, re, numpy as np

import os
D = os.environ.get('V19DATA', '/tmp/v19data') + '/'

def load_safetensors(path):
    with open(path, 'rb') as f:
        n = struct.unpack('<Q', f.read(8))[0]
        hdr = json.loads(f.read(n))
        base = 8 + n
    mm = np.memmap(path, dtype=np.uint8, mode='r')
    out = {}
    for k, v in hdr.items():
        if k == '__metadata__':
            continue
        a, b = v['data_offsets']
        assert v['dtype'] == 'F32'
        out[k] = np.frombuffer(mm[base + a: base + b], dtype=np.float32).reshape(v['shape'])
    return out

def bytes_to_unicode():
    bs = list(range(ord('!'), ord('~') + 1)) + list(range(ord('¡'), ord('¬') + 1)) + list(range(ord('®'), ord('ÿ') + 1))
    cs = bs[:]
    n = 0
    for b in range(256):
        if b not in bs:
            bs.append(b); cs.append(256 + n); n += 1
    return dict(zip(bs, map(chr, cs)))

class BPE:
    def __init__(self):
        self.enc = json.load(open(D + 'vocab.json'))
        self.dec = {v: k for k, v in self.enc.items()}
        merges = open(D + 'merges.txt', encoding='utf-8').read().split('\n')[1:-1]
        self.ranks = {tuple(m.split()): i for i, m in enumerate(merges)}
        self.b2u = bytes_to_unicode()
        self.u2b = {v: k for k, v in self.b2u.items()}
        # ASCII-equivalent of GPT-2's pre-tokeniser pattern
        self.pat = re.compile(r"""'s|'t|'re|'ve|'m|'ll|'d| ?[A-Za-z]+| ?[0-9]+| ?[^\sA-Za-z0-9]+|\s+(?!\S)|\s+""")
    def bpe(self, tok):
        word = list(tok)
        while len(word) > 1:
            pairs = [(self.ranks.get((word[i], word[i + 1]), 1e18), i) for i in range(len(word) - 1)]
            r, i = min(pairs)
            if r == 1e18:
                break
            a, b = word[i], word[i + 1]
            new, j = [], 0
            while j < len(word):
                if j < len(word) - 1 and word[j] == a and word[j + 1] == b:
                    new.append(a + b); j += 2
                else:
                    new.append(word[j]); j += 1
            word = new
        return word
    def encode(self, text):
        ids = []
        for t in self.pat.findall(text):
            t = ''.join(self.b2u[b] for b in t.encode('utf-8'))
            ids += [self.enc[p] for p in self.bpe(t)]
        return ids
    def piece(self, i):
        return bytes(self.u2b[c] for c in self.dec[i]).decode('utf-8', errors='replace')

def gelu(x):
    return 0.5 * x * (1 + np.tanh(np.sqrt(2 / np.pi) * (x + 0.044715 * x ** 3)))

def ln(x, g, b, eps=1e-5):
    m = x.mean(-1, keepdims=True); v = x.var(-1, keepdims=True)
    return g * (x - m) / np.sqrt(v + eps) + b

def forward(W, ids, n_head=12):
    T = len(ids)
    x = W['wte.weight'][ids] + W['wpe.weight'][:T]
    maps = []
    mask = np.triu(np.full((T, T), -1e10, dtype=np.float32), 1)
    for l in range(12):
        p = f'h.{l}.'
        h = ln(x, W[p + 'ln_1.weight'], W[p + 'ln_1.bias'])
        qkv = h @ W[p + 'attn.c_attn.weight'] + W[p + 'attn.c_attn.bias']
        q, k, v = np.split(qkv, 3, axis=-1)
        hs = q.shape[-1] // n_head
        q = q.reshape(T, n_head, hs).transpose(1, 0, 2)
        k = k.reshape(T, n_head, hs).transpose(1, 0, 2)
        v = v.reshape(T, n_head, hs).transpose(1, 0, 2)
        att = q @ k.transpose(0, 2, 1) / np.sqrt(hs) + mask
        att = np.exp(att - att.max(-1, keepdims=True)); att /= att.sum(-1, keepdims=True)
        maps.append(att)
        y = (att @ v).transpose(1, 0, 2).reshape(T, -1)
        x = x + y @ W[p + 'attn.c_proj.weight'] + W[p + 'attn.c_proj.bias']
        h = ln(x, W[p + 'ln_2.weight'], W[p + 'ln_2.bias'])
        x = x + gelu(h @ W[p + 'mlp.c_fc.weight'] + W[p + 'mlp.c_fc.bias']) @ W[p + 'mlp.c_proj.weight'] + W[p + 'mlp.c_proj.bias']
    x = ln(x, W['ln_f.weight'], W['ln_f.bias'])
    logits = x @ W['wte.weight'].T
    return np.stack(maps), logits
