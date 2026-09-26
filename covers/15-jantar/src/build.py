import pathlib
d = pathlib.Path(__file__).parent
t = (d/'template.html').read_text()
t = t.replace('/*ENGINE*/', (d/'engine.js').read_text()).replace('/*COVERS*/', (d/'covers.js').read_text())
(d.parent/'index.html').write_text(t)
print('built', len(t))
