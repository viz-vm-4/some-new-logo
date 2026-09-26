# mnist_from_scratch.py -- a two-layer network in NumPy
import numpy as np

f = np.load("mnist.npz")
x_train = f["x_train"].reshape(-1, 784) / 255.0
x_test = f["x_test"].reshape(-1, 784) / 255.0
y_train, y_test = f["y_train"], f["y_test"]

rng = np.random.default_rng(0)
W1 = rng.normal(0, np.sqrt(2 / 784), (784, 128))
b1 = np.zeros(128)
W2 = rng.normal(0, np.sqrt(2 / 128), (128, 10))
b2 = np.zeros(10)

def relu(z):
    return np.maximum(0, z)

def softmax(z):
    z = z - z.max(axis=1, keepdims=True)
    e = np.exp(z)
    return e / e.sum(axis=1, keepdims=True)

def forward(x):
    z1 = x @ W1 + b1
    a1 = relu(z1)
    return z1, a1, softmax(a1 @ W2 + b2)

def loss(p, y):
    return -np.log(p[range(len(y)), y]).mean()

def step(x, y, lr=0.1):
    global W1, b1, W2, b2
    z1, a1, p = forward(x)
    d2 = p.copy()
    d2[range(len(y)), y] -= 1
    d2 /= len(y)
    dW2, db2 = a1.T @ d2, d2.sum(axis=0)
    d1 = (d2 @ W2.T) * (z1 > 0)
    dW1, db1 = x.T @ d1, d1.sum(axis=0)
    W2 -= lr * dW2; b2 -= lr * db2
    W1 -= lr * dW1; b1 -= lr * db1
    return loss(p, y)

for epoch in range(10):
    order = rng.permutation(len(x_train))
    for i in range(0, len(order), 64):
        idx = order[i:i + 64]
        l = step(x_train[idx], y_train[idx])
    _, _, p = forward(x_test)
    acc = (p.argmax(axis=1) == y_test).mean()
    print(f"epoch {epoch}  loss {l:.3f}  acc {acc:.3f}")

_, _, p = forward(x_test[:1])
print(p.round(3))    # a seven, like the one on the front
