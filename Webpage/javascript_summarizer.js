var natural = require('natural');

var summarize = function(text) {

  stemmer = natural.PorterStemmer;
  stemmer.attach();

  sentenceTokenizer = new natural.SentenceTokenizer();

  TfIdf = natural.TfIdf;
  tfidf = new TfIdf();

  var sumValues = 0;

  sentences = sentenceTokenizer.tokenize(text);
  var sentenceValues = {};

  var words = text.tokenizeAndStem();
  var freq_table = {};

  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].toLowerCase();
    if (words[i] in freq_table) {
      freq_table[words[i]]++;
    } else {
      freq_table[words[i]] = 1;
    }
  }

  // tfidf.tfidfs('statue', function(i, measure) {
  //   console.log("\"" + sentenceTokenized[i] + "\"" + ' is ' + measure);
  // });

  var keys = Object.keys(freq_table);
  //console.log(keys);
  //console.log(keys.length);

  for(var i = 0; i < sentences.length; i++) {
    for(var pair = 0; pair < keys.length; pair++) {
      if(sentences[i].toLowerCase().includes(keys[pair])) {
        if(sentences[i] in sentenceValues) {
          sentenceValues[sentences[i]] += Object.values(freq_table)[pair];
        } else {
          sentenceValues[sentences[i]] = Object.values(freq_table)[pair];
        }
      }
    }
  }
  //console.log(freq_table);

  //console.log(sentenceValues);

  //console.log(freq_table);

  var sentenceValueArray = Object.values(sentenceValues)

  for(var i = 0; i < sentenceValueArray.length; i++) {
    sumValues += sentenceValueArray[i];
  }

  //console.log(sumValues);

  var average = Math.round(sumValues/sentenceValueArray.length);

  var summary = '';
  for(var i = 0; i < sentences.length; i++) {
    if(sentences[i] in sentenceValues && sentenceValues[sentences[i]] > (1.25 * average)) {
      summary += " " + sentences[i];
    }
  }

  return(summary);
}

module.exports = summarize;

// console.log(summarize("Architecturally, the school has a Catholic character. Atop the Main Building's gold dome is a golden statue of the Virgin Mary. Immediately in front of the Main Building and facing it, is a copper statue of Christ with arms upraised with the legend \"Venite Ad Me Omnes\". Next to the Main Building is the Basilica of the Sacred Heart. Immediately behind the basilica is the Grotto, a Marian place of prayer and reflection. It is a replica of the grotto at Lourdes, France where the Virgin Mary reputedly appeared to Saint Bernadette Soubirous in 1858. At the end of the main drive (and in a direct line that connects through 3 statues and the Gold Dome), is a simple, modern stone statue of Mary."));
