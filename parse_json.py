import json
from pprint import pprint

data = json.load(open("train-v1.1.json"))

pprint(data["data"][0]["title"])
pprint(data["data"][0]["paragraphs"][0]["context"])
