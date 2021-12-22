// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';


function ProductInformation(props) {
  const {
    product,
    productReviews,
    productRatings,
    productStyleSelected,
  } = props;

  // console.log('product', product);
  // console.log('productStyleSelected', productStyleSelected);



  return (
    <div id="product-information" className="product-right-component">

    </div>
  );
}

ProductInformation.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  productReviews: PropTypes.instanceOf(Object).isRequired,
  productRatings: PropTypes.instanceOf(Object).isRequired,
  productStyleSelected: PropTypes.instanceOf(Object).isRequired,
};

export default ProductInformation;
