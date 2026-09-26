import sys
from PIL import Image
d='/home/user/some-new-logo/covers/23-wildcard3/renders/'
names=sys.argv[2:]; out=sys.argv[1]
cols=3 if len(names)>4 else 2
w,h=int(720*0.6),int(888*0.6)
rows=(len(names)+cols-1)//cols
W=Image.new('RGB',(cols*w+(cols-1)*8,rows*h+(rows-1)*8),'#888')
for i,nm in enumerate(names):
    W.paste(Image.open(d+nm+'.png').resize((w,h),Image.LANCZOS),((i%cols)*(w+8),(i//cols)*(h+8)))
W.save(out)
