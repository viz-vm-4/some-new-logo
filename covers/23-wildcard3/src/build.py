# Inline the engine, the roll and the page builder into one self-contained index.html
import os
d = os.path.dirname(os.path.abspath(__file__))
page = open(os.path.join(d, 'page.html')).read()
js = '\n'.join(open(os.path.join(d, f)).read() for f in ['arms.js', 'books.js', 'main.js'])
out = page.replace('<!--SCRIPTS-->', '<script>\n' + js + '\n</script>')
open(os.path.join(d, '..', 'index.html'), 'w').write(out)
print('index.html', len(out), 'bytes')
