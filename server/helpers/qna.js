const { api } = require('./api.js');

// const getQs = (queryParams) => (api.get('/qa/questions', { queryParams }));
// function getQs(params) {
//   console.log('hia')
//   return api.get('/qa/questions', { product_id: 40344, page:1, count:10});
// }

function getQs(productID) {
  return api.get(`/qa/questions/?product_id=${productID}&count=1000000`);
}
function getAs(questionID) {
  return api.get(`/qa/questions/${questionID}/answers`);
}
function markHelpful(questionID) {
  return api.put(`/qa/questions/${questionID}/helpful`);
}
function markAnswerHelpful(answerID) {
  return api.put(`/qa/answers/${answerID}/helpful`);
}



// /qa/questions/:question_id/answers
// const postQ = (body) => (api.post('/reviews', body));

// const markyHelpful = (id) => (api.put(`reviews/${id}/helpful`));

module.exports = {
  getQs, getAs, markHelpful, markAnswerHelpful,
};