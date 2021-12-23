import React, { useState } from 'react';
import PropTypes from 'prop-types';
import calcTotalPrice from '../helpers/calcTotalPrice';

function CartModal(props) {
  const { stylesInCart, removeStyleFromCart, itemCount, changeQty} = props;

  const [modalClass, setModalClass] = useState('cart-popup-container');

  function openCartModal() {
    setModalClass('cart-popup-container cart-show-popup');
  }

  function closeCartModal() {
    setModalClass('cart-popup-container');
  }

  const show = stylesInCart.length === 0 ? <div className="nuthin">Nothing In Cart</div>
    : (
      <>
        <div className="Cart-Container">
          {stylesInCart.map((style) => (
            <div className="Cart-Items">
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
                  {style.style.name}
                </h5>
                <h5 className="subtitle">
                  Size:
                  {style.size}
                </h5>
              </div>
              <div className="counter">
                <div onClick={() => (changeQty(style, -1))} className="btnn">-</div>
                <div className="countbtnn">{style.quantity}</div>
                <div onClick={() => (changeQty(style, 1))} className="btnn">+</div>
              </div>
              <div classNames="prices">
                <div className="amount">
                  $
                  {style.style.sale_price
                    ? style.style.sale_price : style.style.original_price}
                </div>
                <div onClick={()=>(removeStyleFromCart(style))} className="save"><u>Save for later</u></div>
                <div onClick={()=>(removeStyleFromCart(style))} className="remove"><u>Remove</u></div>
              </div>
            </div>
          ))}
          <div className="HR">
            <div className="checkout">
              <div className="total">
                <div>
                  <div className="Subtotal">Sub-Total</div>
                  <div className="itemz">
                    {itemCount}
                    items
                  </div>
                </div>
                <div className="total-amount">
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
        id="add-to-favorites-button"
        className="interactive-button-copy"
        onClick={openCartModal}
      >
        &#128722;
      </button>
    </>
  );
}

export default CartModal;
