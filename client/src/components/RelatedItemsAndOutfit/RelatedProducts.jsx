import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import ListCard from './ListCard';

const RelatedProducts = ({
  prodsInfo, prodsStyles, prodsMeta,
  currProd, changeProductHandler,
}) => {


  const currProdDes = {
    [currProd[0].name]: currProd[2].characteristics,
  };


  return (
    <div className="related-product-list-container">
      <h2 className="related-products-header" id="ratings-reviews-title">RELATED PRODUCTS</h2>
      <Carousel>
        <></>
        {prodsInfo.map((prodInfo, index) => (
          <ListCard
            key={`${prodInfo.id}BG${Math.random() * 10000}`}
            prodInfo={prodInfo}
            prodStyles={prodsStyles[index].results[0]}
            prodMeta={prodsMeta[index]}
            changeProductHandler={changeProductHandler}
          >
          </ListCard>
        ))}
      </Carousel>
    </div>
  );
};

RelatedProducts.propTypes = {
  prodsInfo: PropTypes.instanceOf(Object).isRequired,
  prodsStyles: PropTypes.instanceOf(Object).isRequired,
  prodsMeta: PropTypes.instanceOf(Object).isRequired,
  currProd: PropTypes.instanceOf(Object).isRequired,
  changeProductHandler: PropTypes.instanceOf(Function).isRequired,
};

export default RelatedProducts;
