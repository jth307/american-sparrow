import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Thumbnail from '../RatingsAndReviews/Thumbnail';

const QTile = ({ question, getQs }) => {
  const[answer, setAnswer] = useState('This question has not been answered')
  const[answerer, setAnswerer] = useState('')
  const[askDate, setAskDate] = useState('')
  const[helpfulness, setHelpfulness] = useState(0)
  const[answerID, setAnswerID] = useState(0)
  const[photos, setPhotos] = useState([])



  function getAs(id) {
    axios.get('/qa/answers', {
      params: {
        question_id: id,
      },
    })
      .then((response) => {
        return response.data.results[0];
      })
      .then((data) =>{
        setAnswer(data.body);
        setPhotos(data.photos);
        setAskDate(data.date);
        setHelpfulness(data.helpfulness);
        setAnswerID(data.answer_id);
        let readDate = new Date(askDate)
        let reviewMonthDay = readDate.toDateString().slice(0, -5);
        let reviewYear = readDate.toDateString().slice(-4);
        setAnswerer(data.answerer_name.concat(', ', reviewMonthDay, ', ', reviewYear));
      })
      .catch((err) => {
        console.error('err fetching answers',err);
      });
  }

  useEffect(() => {
    getAs(question.question_id);
  }, []);


  function markQsHelpful(questionId) {
    axios.put(`/qa/questions/helpful`, {
      params: {
        question_id: questionId,
      },
    })
      .then(() => {
        getQs();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function markAnswerHelpful(answerID) {
    axios.put(`/qa/answer/helpful`, {
      params: {
        answer_id: answerID,
      },
    })
      .then(() => {
        getAs(question.question_id);
      })
      .catch((err) => {
        console.error(err);
      });
  }



  const helpfulSection = (
    <p className="helpful-qs">
      <span className="answerer-info"> by {answerer} </span>
      <span className="spacer"> | </span>
       Helpful?
       {' '}
      <span className="helpfulq-yes"   onClick={() => markAnswerHelpful(answerID)} role="presentation">Yes</span>
       {' '}
      <span>
        (
        {helpfulness}
        )
      </span>
      <span className="spacer"> |</span>
      <span className="clicked-report" onClick={() => markAsHelpful(question.question_id)}>
        Report
      </span>
    </p>
  );

  const answerSection = answer === 'This question has not been answered'? (
    <div className="answer-Q">
     <span className='noanswer-summary'>{answer}</span>
    </div>
    ):(
      <>
      <div className="answer-Q">A:{' '}
      <span className='answer-summary'>{answer}</span>
      </div>
      <div className="question-heading">
      <span className="helpful-qs"> {helpfulSection} </span>
      </div>
     </>
      );

  return (
    <div className="question-tile">
       <p className="question-head">
      <div className="question-summary">Q:{' '}{question.question_body.slice()}</div>
      <div className = "helpful-qs2">
         Helpful?
        {' '}
      <span className="helpfulq-yes" onClick={() => markQsHelpful(question.question_id)} role="presentation">Yes</span>
        {' '}
      <span>
        (
        {question.question_helpfulness}
        )
      </span>
      <span className="spacer"> |</span>
      <span className="clicked-report" onClick={() => markAsHelpful(question.question_id)}>
         Add Answer
      </span>
      </div>
      </p>
      {answerSection}

          <div className="review-photos">
            {photos.slice(1).map((photo) => (
              <Thumbnail
                photo={photo}
                key={photo.id}
              />
            ))}
          </div>
      </div>
  );
};

QTile.propTypes = {
  question: PropTypes.shape({
    body: PropTypes.string,
    date: PropTypes.string,
    helpfulness: PropTypes.number,
    photos: PropTypes.instanceOf(Array),
    recommend: PropTypes.bool,
    response: PropTypes.string,
    question_id: PropTypes.number,
    asker_name: PropTypes.string,
  }).isRequired,
  getQs: PropTypes.instanceOf(Function).isRequired,
};

export default QTile;


