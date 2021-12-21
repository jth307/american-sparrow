import React from 'react';
import QnaList from './QnaList';


class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }


render() {
  return (
    <section className="qna" id="qna-section">
      <h4 className="qna-title">Questions & Answers</h4>
      <div className="qna-container">
        <QnaList />
      </div>
    </section>
  );
}
};


export default QuestionsAndAnswers;
