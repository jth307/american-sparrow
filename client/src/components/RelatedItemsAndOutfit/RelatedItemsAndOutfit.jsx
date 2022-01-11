import React from 'react';
import PropTypes from 'prop-types';
import server from '../helpers/Axios';
import RelatedProducts from './RelatedProducts';

class RelatedItemsAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currProd: [],
      prodsInfo: [],
      prodsStyles: [],
      prodsMeta: [],
      isFetching: true,
    };
  }

  componentDidMount() {
    this.setCurrProdToState();
  }

  componentDidUpdate(prevProps) {
    const {currProdId} = this.props;
    if ((prevProps.currProdId !== currProdId)) {
      this.setCurrProdToState(currProdId);
    }
  }

  setCurrProdToState() {
    const {
      currProdId, prodInfo, prodStyles, prodReviewsMeta,
    } = this.props;
    this.setState({ currProd: [prodInfo, prodStyles, prodReviewsMeta] },
      this.getRelatedData(currProdId));
  }

  getRelatedData(currProdId) {
    server.get(`/related/${currProdId}`)
      .then((res) => {
        //remove duplicates from api
        for (let i = 0; i < res.data[0].length; i++){
          if (res.data[0][i].id === 40345 ) {
            res.data[0].splice(i,1);
            res.data[1].splice(i,1)
          }
          if (res.data[0][i+1] && res.data[0][i].id === res.data[0][i+1].id){
            res.data[0].splice(i,1);
            res.data[1].splice(i,1)
            break;
          }
        };

        this.setState({
        prodsInfo: res.data[0],
        prodsStyles: res.data[1],
        prodsMeta: res.data[2],
        isFetching: false,
      })})
      .catch((err) => console.log(err));
  }

  render() {
    const {
      isFetching, prodsInfo, prodsMeta, prodsStyles, currProd,
    } = this.state;
    const { prodStyleSelected } = this.props;
    const { changeProductHandler } = this.props;

    return (
      <div>
        {isFetching ? (
          <div>Loading...</div>
        )
          : (
            <div className="related-lists">
              <RelatedProducts
                changeProductHandler={changeProductHandler}
                currProd={currProd}
                prodsInfo={prodsInfo}
                prodsStyles={prodsStyles}
                prodsMeta={prodsMeta}
              />
            </div>
          )}
      </div>
    );
  }
}

RelatedItemsAndOutfit.propTypes = {
  currProdId: PropTypes.number.isRequired,
  prodInfo: PropTypes.instanceOf(Object).isRequired,
  prodStyles: PropTypes.instanceOf(Object).isRequired,
  prodReviewsMeta: PropTypes.instanceOf(Object).isRequired,
  changeProductHandler: PropTypes.func.isRequired,
};

export default RelatedItemsAndOutfit;
