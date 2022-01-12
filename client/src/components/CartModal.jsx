import React, { useState } from 'react';
import PropTypes from 'prop-types';
import calcTotalPrice from './helpers/calcTotalPrice';

function CartModal(props) {
  const { stylesInCart, removeStyleFromCart, itemCount, changeQty} = props;

  const [modalClass, setModalClass] = useState('cart-popup-container');

  function openCartModal() {
    setModalClass('cart-popup-container cart-show-popup');
  }

  function closeCartModal() {
    setModalClass('cart-popup-container');
  }

  const show = stylesInCart.length === 0 ? <div id="nuthin">Your bag is empty</div>
    : (
      <>
        <div id="Cart-Container">
          {stylesInCart.map((style) => (
            <div id="Cart-Items">
              <div className="image-box">
                <div
                  className="txn-photo"
                  style={{ backgroundImage: `url('${style.photo}')` }}
                />
              </div>
              <div className="about">
                <h1 className="title">{style.product.name}</h1>
                <h5 className="subtitle">
                  Color:
                  {" "+style.style.name}
                </h5>
                <h5 className="subtitle">
                  Size:
                  {" "+style.size}
                </h5>
              </div>
              <div id="counter">
                <div onClick={() => (changeQty(style, -1))} id="btnn">-</div>
                <div id="countbtnn">{style.quantity}</div>
                <div onClick={() => (changeQty(style, 1))} id="btnn">+</div>
              </div>
              <div id="prices">
                <div id="amount">
                  $
                  {style.style.sale_price
                    ? style.style.sale_price : style.style.original_price}
                </div>
                <div onClick={()=>(removeStyleFromCart(style))} id="save">Save for later</div>
                <div onClick={()=>(removeStyleFromCart(style))} id="remove">Remove</div>
              </div>
            </div>
          ))}
          <div id="HR">
            <div id="checkout">
              <div id="total">
                <div>
                  <div id="Subtotal">Sub-Total</div>
                  <div id="itemz">
                    {itemCount+" "}
                    items
                  </div>
                </div>
                <div id="total-amount">
                  $
                  {calcTotalPrice(stylesInCart)}
                </div>
              </div>
              <button type="button" onClick={() => (alert('Members only!'))} className="checky-button">Checkout</button>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className={modalClass}>
        <div className="cart-popup-content">
          <button type="button" onClick={closeCartModal} className="cart-close-popup">&times;</button>
          <h1 className="cart-popup-header">Shopping Bag</h1>
          {show}
        </div>
      </div>

      <button
        type="button"
        id="cart-button"
        className="interactive-button-copyy"
        onClick={openCartModal}
      >
        Cart
      </button>
    </>
  );
}

export default CartModal;
