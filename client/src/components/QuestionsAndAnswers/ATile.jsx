import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import Thumbnail from './Thumbnail';

const ATile = ({ answerData}) => {
  const[answer, setAnswer] = useState('This question has not been answered')
  const[answerer, setAnswerer] = useState('')
  const[askDate, setAskDate] = useState('')
  const[helpfulness, setHelpfulness] = useState(0)
  const[answerData, setAnswerData] = useState({})


  function markAnswerHelpful(answerID) {
    console.log('mark q h')
    axios.put(`/qa/questions/helpful`, {
      params: {
        answer_id: answerID,
      },
    })
      .then(() => {
        getQs();
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
      <span className="helpfulq-yes"  role="presentation">Yes</span>
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
    <>
      {answerSection}

      //   <div className="review-body">
      //     {/* {salesResponse}
      //     <div className="review-photos">
      //       {review.photos.map((photo) => (
      //         <Thumbnail
      //           photo={photo}
      //           key={photo.id}
      //         />
      //       ))}
      //     </div> */}
      //     {/* {helpfulSection} */}
      //   </div>
      </>
  );
};

export default ATile;



  // let displaySummary;
  // let extraSummaryinBody;
  // if (review.summary.length <= 60) {
  //   displaySummary = review.summary;
  // } else {
  //   displaySummary = review.summary.slice(0, 57).concat('...');
  //   extraSummaryinBody = '...'.concat(review.summary.slice(57));
  // }

  // const [showMoreBody, setShowMoreBody] = useState(false);
  // let displayBody;
  // let showMoreSnippet;
  // if (review.body.length <= 250) {
  //   displayBody = review.body;
  // } else {
  //   displayBody = review.body.slice(0, 250).concat('...');
  //   showMoreSnippet = <p onClick={() => setShowMoreBody(true)} className="more-body" role="presentation">Show more...</p>;
  // }

  // let recommendProduct;
  // if (review.recommend) {
  //   recommendProduct = (
  //     <p className="recommend-product">
  //       <i className="fas fa-check" />
  //       {' '}
  //       I recommend this product
  //     </p>
  //   );
  // }

  // let qResponse;
  // if (review.response) {
  //   salesResponse = (
  //     <div className="sales-response">
  //       <div className="response-heading">Response: </div>
  //       {review.response}
  //     </div>
  //   );
  // }
