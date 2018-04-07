from textblob import TextBlob

text = input()
blob = TextBlob(text)
blob.tags
blob.noun_phrases
#polarity -1 -> 1
#subjectivity: objective 0.0 -> 1.0 subjective
for sentence in blob.sentences:
    print(sentence.subjectivity)

