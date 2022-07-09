from importlib_metadata import csv
import pandas as pd

 
import random 
csv1= pd.read_csv("dataalg1.csv")
src= pd.read_json("dzMap.json")


def getlat(src, id):
    for e in src.features:
        if e["properties"]["ID_1"]==id:
           # print("oh")
            return e["geometry"]["coordinates"][0][0][0]


def getlong(src, id):
    for e in src.features:
        if e["properties"]["ID_1"]==id:
           # print("oh")
            return e["geometry"]["coordinates"][0][0][1]


print(getlat(src, 1))
"""
print(csv1.shape[0])

wilaya = []
apis=[]
long=[]
lat=[]
text=csv1.text

csvdata=pd.DataFrame()
print(len(csv1))
for i in range(0,csv1.shape[0]):
    n = random. randint(1,48) 
    api=random.randint(0,2)
    long.append(  getlong(src, n))
    lat.append(  getlat(src, n))
    wilaya.append(n)
    apis.append(api)
    
    print(n)

csvdata["text"]=text
csvdata["Position"]=wilaya
csvdata["Api_type"]=apis
csvdata["latitude"]=lat
csvdata["long"]=long

csvdata.to_csv("dataset.csv")



 
"""
