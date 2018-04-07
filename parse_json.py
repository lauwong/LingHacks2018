import json
from pprint import pprint

data = json.load(open("train-v1.1.json"))
item_index = 0

pprint("Title: " + data["data"][item_index]["title"])
pprint("Text: " + data["data"][item_index]["paragraphs"][0]["context"])
