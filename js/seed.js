'use strict';

var mongoose = require('mongoose');
var founders = require('fs').readFileSync('./founders.json', 'utf8');
founders = JSON.parse(founders).founders;

var connection = mongoose.connect('mongodb://localhost/my_database');

var FounderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  cover: { type: String, required: true },
  memory: [
    {
      category: { type: String, enum: ['Fun', 'Work', 'Hope we meet up soon'] },
      occasion: String,
      body: String,
      author: String
    }
  ]
});

var Founder = mongoose.model('Founder', FounderSchema);

founders = founders.map(function(founder) {
	return Founder.create(founder);
});

Promise.all(founders)
	.then(function(founders) {
		console.log(founders);
	});