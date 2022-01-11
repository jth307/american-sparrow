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
      currProdId: '40348',
      prodInfo: {},
      prodStyles: {},
      prodStyleSelected: {},
      prodReviewsMeta: {},
      prodReviews: {},
      // stylesInCart: [],
      // itemCount: 0,
      isFetching: true,
    };
    this.changeProductHandler = this.changeProductHandler.bind(this);
    this.selectProductStyle = this.selectProductStyle.bind(this);
    // this.addStyleToCart = this.addStyleToCart.bind(this);
    // this.removeStyleFromCart = this.removeStyleFromCart.bind(this);
    // this.changeQty = this.changeQty.bind(this);
  }

  componentDidMount() {
    const { currProdId } = this.state;
    this.getCurrProdData(currProdId);
  }

  getCurrProdData(currProdId) {
    server.get(`/currentProduct/${currProdId}`)
      .then(({ data }) => this.setState({
        currProdId: data[0].id,
        prodInfo: data[0],
        prodStyles: data[1],
        prodStyleSelected: data[1].results[0],
        prodReviewsMeta: data[2],
        prodReviews: data[3],
        isFetching: false,
      }))
      .catch((err) => console.log(err, 'too many API calls!'));
  }

  changeProductHandler(productId) {
    const { currProdId } = this.state;
    if (productId !== currProdId) {
      this.getCurrProdData(productId);
    }
  }

  selectProductStyle(style) {
    const { prodStyleSelected } = this.state;
    if (style.style_id !== prodStyleSelected.style_id) {
      this.setState({ prodStyleSelected: style });
    }
  }

  // addStyleToCart(item) {
  //   stylesInCurrentCart.push(item);
  //   this.setState({
  //     stylesInCart: stylesInCurrentCart,
  //     itemCount: this.state.itemCount += item.quantity,
  //   });
  // }

  // removeStyleFromCart(item) {
  //   for (let i = 0; i < stylesInCurrentCart.length; i += 1) {
  //     if (stylesInCurrentCart[i].sku_id === item.sku_id) {
  //       stylesInCurrentCart.splice(i, 1);
  //       break;
  //     }
  //   }
  //   this.setState({
  //     stylesInCart: stylesInCurrentCart,
  //     itemCount: this.state.itemCount -= item.quantity,
  //   });
  // }

  // changeQty(item, qty) {
  //   if (qty < 0) {
  //     for (let i = 0; i < stylesInCurrentCart.length; i += 1) {
  //       if (stylesInCurrentCart[i].sku_id === item.sku_id && stylesInCurrentCart[i].quantity > 0) {
  //         stylesInCurrentCart[i].quantity += qty;
  //         this.setState({
  //           stylesInCart: stylesInCurrentCart,
  //           itemCount: this.state.itemCount += qty,
  //         });
  //         break;
  //       }
  //     }
  //   } else {
  //     for (let i = 0; i < stylesInCurrentCart.length; i += 1) {
  //       if (stylesInCurrentCart[i].sku_id === item.sku_id) {
  //         stylesInCurrentCart[i].quantity += qty;
  //         this.setState({
  //           stylesInCart: stylesInCurrentCart,
  //           itemCount: this.state.itemCount += qty,
  //         });
  //         break;
  //       }
  //     }
  //   }
  // }

  render() {
    const {
      currProdId,
      prodInfo,
      prodStyles,
      prodReviewsMeta,
      prodReviews,
      isFetching, prodStyleSelected,
      // stylesInCart, itemCount, changeQty,
    } = this.state;

    return (
      <div>
        {isFetching ? (
          <div>Loading...</div>
        )
          : (
            <div className="app-container">
              <Banner
              // currProdId={currProdId} changeProductHandler={this.changeProductHandler}
              />
              <ProductOverview
                product={prodInfo}
                productStyles={prodStyles}
                productStyleSelected={prodStyleSelected}
                productReviews={prodReviews}
                productRatings={prodReviewsMeta}
                selectProductStyle={this.selectProductStyle}
                // stylesInCart={stylesInCart}
                // addStyleToCart={this.addStyleToCart}
                // removeStyleFromCart={this.removeStyleFromCart}
                // itemCount={itemCount}
                // changeQty={this.changeQty}
              />
              <RelatedItemsAndOutfit
                currProdId={currProdId}
                prodInfo={prodInfo}
                prodStyles={prodStyles}
                prodReviewsMeta={prodReviewsMeta}
                prodStyleSelected={prodStyleSelected}
                changeProductHandler={this.changeProductHandler}
              />
              {/* <RatingsAndReviews
                currProdId={currProdId}
                prodInfo={prodInfo}
                prodReviews={prodReviews}
                prodReviewsMeta={prodReviewsMeta}
              /> */}
               <QuestionsAndAnswers
                currProdId={currProdId}
               />

            </div>
          )}
      </div>
    );
  }
}

export default App;
