let similarity = require('sentence-similarity')
let similarityScore = require('similarity-score')

let s1 = ['how','close','is','this','to','that']
let s2 = ['these','two','are','not','that','close']

let winkOpts = { f: similarityScore.winklerMetaphone, options : {threshold: 0} }

console.log(similarity(s1,s2,winkOpts))