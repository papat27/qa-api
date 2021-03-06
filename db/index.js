const mongoose = require('mongoose');

mongoose.connect('mongodb://3.231.55.186/qa', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
})

const questionsSchema = new mongoose.Schema({
  question_id: Number,
  question_body: String,
  question_date: String,
  asker_name: String,
  asker_email: String,
  question_helpfulness: Number,
  reported: Number,
  product_id: Number
}, {collection: 'questions'});

const answersSchema = new mongoose.Schema({
  answer_id: Number,
  body: String,
  date: String,
  answerer_name: String,
  email: String,
  helpfulness: Number,
  reported: Number,
  question_id: Number,
  photos: Array
}, {collection: 'combined_answers'});

const countersSchema = new mongoose.Schema({
  _id: String,
  sequence_value: Number
}, {collection: 'counters'});

const Question = mongoose.model('Question', questionsSchema);
const Answer = mongoose.model('Answer', answersSchema);
const Counter = mongoose.model('Counter', countersSchema);

const getNextId = async (idName) => {
  let counterDocument = await Counter.findOneAndUpdate({_id: idName}, {$inc:{sequence_value: 1}}, {new: true});

  return counterDocument.sequence_value;
}

module.exports.Question = Question;
module.exports.Answer = Answer;
module.exports.Counter = Counter;
module.exports.getNextId = getNextId;
module.exports.mongooseTypes = mongoose.Types;