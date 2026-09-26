import numpy as np, json
d=np.loadtxt(__import__('os').environ.get('V19DATA','/tmp/v19data')+'/iris.csv',delimiter=',',skiprows=1)
X=d[:,2:4]; y=d[:,4].astype(int)
def gini(y):
    if len(y)==0: return 0
    p=np.bincount(y,minlength=3)/len(y); return 1-(p*p).sum()
def best(X,y):
    bst=None
    for f in range(X.shape[1]):
        vals=np.unique(X[:,f])
        for a,b in zip(vals[:-1],vals[1:]):
            t=(a+b)/2; L=X[:,f]<=t
            g=(L.sum()*gini(y[L])+(~L).sum()*gini(y[~L]))/len(y)
            if bst is None or g<bst[0]-1e-12: bst=(g,f,t)
    return bst
def grow(X,y,depth,path):
    counts=np.bincount(y,minlength=3).tolist()
    if depth==3 or gini(y)==0: return {'leaf':int(np.argmax(counts)),'counts':counts,'path':path}
    g,f,t=best(X,y); L=X[:,f]<=t
    return {'f':int(f),'t':float(round(t,3)),'counts':counts,'l':grow(X[L],y[L],depth+1,path+[(f,'<=',t)]),'r':grow(X[~L],y[~L],depth+1,path+[(f,'>',t)])}
T=grow(X,y,0,[])
print(json.dumps(T,indent=1)[:3000])
json.dump({'X':X.tolist(),'y':y.tolist(),'tree':T},open(__import__('os').environ.get('V19DATA','/tmp/v19data')+'/iris_tree.json','w'))
