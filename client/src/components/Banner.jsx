import React from 'react';
import saleTimer from './helpers/saleTimer';

class Banner extends React.Component {
  constructor(props) {
    super(props);

  }







  render() {


    return (
      <div>
        <div className="titlebar">
          <input
            type="text"
            className="product-search"

          />

        <div className="mini-banner">
          END OF SUMMER SALE! BUY ONE GET ONE 50% OFF! SALE ENDS IN <span id="timer"></span> MINUTES!</div>
      </div>
      </div>
    );
  }
}

export default Banner;
