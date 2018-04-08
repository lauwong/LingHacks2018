import json
from pprint import pprint

data = json.load(open("train-v1.1.json"))

index = int(input("Data set index: "))

pprint(data["data"][index]["title"])
pprint(data["data"][index]["paragraphs"][0]["context"])
