from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem import PorterStemmer

def summarize(text):
    stop_words = set(stopwords.words("english"))
    sum_values = 0
    stemmer = PorterStemmer()

    words = word_tokenize(text)
    freq_table = {}

    sentences = sent_tokenize(text)
    sentence_value = {}

    for word in words:
        word = word.lower()
        if word in stop_words:
            continue
        word = stemmer.stem(word)
        if word in freq_table:
            freq_table[word] += 1
        else:
            freq_table[word] = 1


    #print(freq_table)
    #for sentence in sentences:
        #print(sentence)

    for sentence in sentences:
        #print(sentence)
        sentence_length = 0
        for word, freq in freq_table.items():
            if word in sentence.lower():
                if sentence in sentence_value:
                    sentence_value[sentence] += freq
                    sentence_length += 1
                else:
                    sentence_value[sentence] = freq
        sentence_value[sentence] = sentence_value[sentence]/sentence_length

    for sentence in sentence_value:
        sum_values += sentence_value[sentence]

    average = int(sum_values/len(sentence_value))

    summary = ''
    for sentence in sentences:
            if (sentence in sentence_value) and (sentence_value[sentence] > (1.2 * average)):
                summary +=  " " + sentence

    print("-----------Summary----------\n" + summary)

paragraph = input("Text to analyze: ")
summarize(paragraph)
