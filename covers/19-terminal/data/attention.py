# Build Large Language Models: GPT-2 small's attention (layer 1, head 2) over the cover sentence.
# Needs model.safetensors, vocab.json, merges.txt from huggingface.co/openai-community/gpt2 in $V19DATA.
import json, numpy as np, gpt2np as G
W = G.load_safetensors(G.D + 'model.safetensors'); bpe = G.BPE()
text = ('A language model reads the tokens that came before and predicts the one that comes next. '
        'It learns this from text, one token at a time, until the patterns of language are stored in its weights. '
        'Then it writes text, one token at a time.')
ids = bpe.encode(text)                      # 51 tokens
maps, _ = G.forward(W, ids)                 # [layer, head, T, T]
a = maps[1, 2]
d = np.rint(9 * a / a.max(1, keepdims=True)).astype(int)   # each row scaled to max 9
print(json.dumps({'toks': [bpe.piece(i) for i in ids],
                  'rows': [''.join(str(d[i, j]) for j in range(i + 1)) for i in range(len(ids))]}))
