import React from 'react';
import axios from 'axios';
import QTile from './QTile';

const QnaList = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allquestions: [],
      qdisplay: [],
      qnaCount: 2,
      showMoreQsButton: false,
      // answerData:{}
    };

    this.getQs = this.getQs.bind(this);
    // this.getAs = this.getAs.bind(this);
    this.updateqDisplay = this.updateqDisplay.bind(this);
    this.handleMoreQs = this.handleMoreQs.bind(this);
    }

    componentDidMount() {
      this.getQs();
    }


    handleMoreQs() {
      this.setState((prevState) => ({ qnaCount: prevState.qnaCount + 2 }), this.updateqDisplay);
    }

    getQs() {
      axios.get('/qa/questions', {
        params: { product_id: 40348 },
      })
    .then((response) => {
      this.setState({ allquestions: response.data.results });
      this.updateqDisplay();
    })
    .catch((err) => {
      console.error('err fetching questions',err);
    });
    }

  updateqDisplay() {
    const { allquestions, qnaCount, allanswers } = this.state;
    let qnaCopy = allquestions.slice(0, qnaCount);
      if (qnaCount < allquestions.length) {
        this.setState({ showMoreQsButton: true });
      } else {
        this.setState({ showMoreQsButton: false });
      }
    this.setState({ qdisplay: qnaCopy });
  }

  searchQs (query) {
    if (query.length >= 3) {
      var newQList = []
      this.state.allquestions.forEach((question) => {
        if (question.question_body.indexOf(query) > -1) {
        newQList.push(question)
        }
      });

      if (newQList.length > 0) {
        this.setState({
        qdisplay: newQList
        })
      }
    } else {
      this.updateqDisplay();
    }
  };

  render() {
    const { qdisplay, allquestions, showMoreQsButton } = this.state;

    let moreQsButton;
    if (showMoreQsButton) {
      moreQsButton = <button className="interactive-button" type="button" id="more-Qs" onClick={this.handleMoreQs}>more answered questions</button>;
    } else {
      moreQsButton = <p />;
    }

    if (qdisplay.length > 0) {
      return (
        <div>
          <div>
            <input
            className="q-search"
            type="text"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            onChange = {
              (e) => this.searchQs(e.target.value)}
              />
          </div>
          <div className="qna-list">
            <div className="qna-list-container">
              {qdisplay.map((question) => (
                <QTile
                  question={question}
                  key={question.question_id}
                  getQs={this.getQs}
                  // getAs={this.getAs}
                  // answerData={this.state.answerData}
                />
              ))}
            </div>
          </div>
          <div className="buttons-container">
              {moreQsButton}
              <button className="interactive-button" type="submit" id="add-a-review">add a question
              <span id="plus-icon"><i className="fas fa-plus" /></span></button>
          </div>
        </div>
      );
    } else {
      return (
        <div >
         <div className="noquestion-summary"> There are no questions about this product</div>
         <button className = "noQ-addQ" type="submit" >add a question
         <span id="plus-icon"><i className="fas fa-plus" /></span></button>
        </div>
      )
    }
  }
};

export default QnaList;




  // getAs(id) {
  //   axios.get('/qa/answers', {
  //     params: {
  //       question_id: id,
  //     },
  //   })
  //     .then((response) => {
  //       this.setState({
  //         answerData: response.data.results[0]
  //       })
  //     })
  //     .catch((err) => {
  //       console.error('err fetching answers',err);
  //     });
  // }

     // let qnaCopy;
    // if (allquestions.length <= 2) {
    //   qnaCopy = allquestions;
    // } else {
