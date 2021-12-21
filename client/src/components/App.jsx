import React from 'react';
import server from './helpers/Axios';
import Banner from './Banner';
import ProductOverview from './ProductOverview/ProductOverview';
import RelatedItemsAndOutfit from './RelatedItemsAndOutfit/RelatedItemsAndOutfit';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers';

const stylesInCurrentCart = [];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }



  render() {


    return (
      <div>

            <div className="app-container">
              <Banner />
              <ProductOverview/>
              <RelatedItemsAndOutfit/>
              <RatingsAndReviews />
              <QuestionsAndAnswers />
            </div>

      </div>
    );
  }
}

export default App;
