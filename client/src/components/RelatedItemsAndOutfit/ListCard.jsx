import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Stars from '../Stars';
import calcAvgRating from '../helpers/calcAvgRating';

const ListCard = ({
  prodInfo, prodStyles, prodMeta, changeProductHandler,
}) => {
  const origPrice = prodStyles.original_price;
  const salePrice = prodStyles.sale_price;
  const prodUrl = prodStyles.photos[0].url;
  const currStyle = useRef();


  useEffect(() => {
    if (currStyle.current !== prodInfo.id) {
      currStyle.current = prodInfo.id;
    }
  }, [prodUrl, prodInfo.id]);

  return (
    <div className="product-list-card">
      <div className="card-image-container">
        {prodUrl ? (
          <div
            alt="model-in-clothing"
            className="card-image-src"
            style={{backgroundImage: `url('${prodUrl}')`}}
            onClick={() => changeProductHandler(prodInfo.id)}
            role="presentation"
          />
        ) : <i onClick={() => changeProductHandler(prodInfo.id)} role="presentation" className="fas fa-image card-default-image" />}

      </div>

      <div className="card-details-container">
        <h6 className="category-heading">
          {prodInfo.category}
        </h6>
        <p className="product-name-p">
          {prodInfo.name}
          <br />
        </p>
        <p className="prod-price-p">
          {salePrice
            ? (
              <>
                <span className="sale-price">{`$${salePrice} `}</span>
                <span className="orig-price-strike">{`$${origPrice}`}</span>
              </>
            )
            : <span>{` $${origPrice}`}</span>}
        </p>
        <div className="rel-prod-card-stars">
          { Object.keys(prodMeta.ratings).length !== 0
          && <Stars id={`BG${prodMeta.product_id}${Math.random() * 10000}`} rating={calcAvgRating(prodMeta.ratings)} />}
        </div>
      </div>
    </div>
  );
};

ListCard.propTypes = {
  prodInfo: PropTypes.instanceOf(Object).isRequired,
  prodStyles: PropTypes.instanceOf(Object).isRequired,
  prodMeta: PropTypes.instanceOf(Object).isRequired,
  changeProductHandler: PropTypes.func.isRequired,
};

export default ListCard;
