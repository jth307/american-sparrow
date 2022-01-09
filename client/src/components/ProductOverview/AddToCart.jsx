import React, { useState, useEffect } from 'react';
// import React from 'react';
import PropTypes from 'prop-types';
import CartModal from './CartModal';

function AddToCart(props) {
  const {
    product,
    productStyleSelected,
    stylesInCart,
    addStyleToCart,
    removeStyleFromCart,
    itemCount,
    changeQty,
  } = props;

  const [selectedSize, setSelectedSize] = useState({});
  const [sizesInStock, setSizesInStock] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  // Grab only the sizes in stock for current style. Using Object.entries() to appease linter.
  useEffect(() => {
    // console.log('productStyleSelected', productStyleSelected);
    // console.log('productStyleSelected SKUs', productStyleSelected.skus);
    // console.log('Object.values of SKUs', Object.values(productStyleSelected.skus));
    const sizeOptions = Object.entries(productStyleSelected.skus);
    // console.log('sizeOptions', sizeOptions);
    const sizeOptionsFiltered = {};
    for (let i = 0; i < sizeOptions.length; i += 1) {
      const sku = sizeOptions[i][0];
      const option = sizeOptions[i][1];
      if (option.quantity > 0) {
        // Handle the edge case where there are duplicate XLs - set 2nd XL equal to XXL
        // The right way to do this is to edit the productStyle object itself; too much work for now
        if (option.size === 'XL'
          && Object.values(sizeOptionsFiltered).map((optionFiltered) => optionFiltered.size).indexOf('XL') !== -1) {
          option.size = 'XXL';
        }
        sizeOptionsFiltered[sku] = option;
      }
    }
    setSizesInStock(sizeOptionsFiltered);
    setIsLoading(false); // This is ok, hooks don't trigger re-renders when state is unchanged
  }, [productStyleSelected, isLoading]);

  function disabledSizeSelector(message) {
    return (
      <select disabled defaultValue={message} id="size-dropdown" className="interactive-button-copy interactive-button-copy-disabled">
        <option disabled hidden value={message}>{message}</option>
      </select>
    );
  }

  function handleSizeSelector(event) {
    let targetedSize = {};
    const sizesInStockEntries = Object.entries(sizesInStock);
    for (let i = 0; i < sizesInStockEntries.length; i += 1) {
      const sku = sizesInStockEntries[i][0];
      const option = sizesInStockEntries[i][1];
      if (option.size === event.target.value) {
        targetedSize = {
          sku,
          quantity: option.quantity,
          size: option.size,
        };
      }
    }
    setSelectedSize(targetedSize);
    setShowError(false);
  }

  // console.log('sizesInStock', sizesInStock);
  // console.log('selectedSize', selectedSize);

  function handleAddToBag() {
    const selectedQuantity = document.getElementById('quantity-dropdown').value;
    // console.log('selectedQuantity', selectedQuantity);

    if (!isLoading) {
      if (Object.values(selectedSize).length === 0) {
        setShowError(true);
      } else if (selectedQuantity >= 1 && selectedQuantity <= 15) {
        const item = {
          product,
          style: productStyleSelected,
          sku_id: Number.parseInt(selectedSize.sku, 10),
          size: selectedSize.size,
          quantity: Number(selectedQuantity),
          photo: productStyleSelected.photos[0].url,
        };
        console.log('added to cart!', item);
        // alert(`Added to Cart!
        // \n ${item.product.name}
        // \n ${item.style.name}
        // \n ${item.sku_id}
        // \n ${item.size}
        // \n ${item.quantity}
        // \n ${item.style.sale_price ? item.style.sale_price : item.style.original_price}`);

        let notInCart = true;
        if (stylesInCart.length === 0) {
          addStyleToCart(item);
        } else {
          stylesInCart.forEach((style) => {
            if (item.sku_id === style.sku_id) {
              changeQty(item,item.quantity);
              notInCart = false;
            }
          });

          if (notInCart) {
            addStyleToCart(item);
          }
        }
      }
    }
  }

  return (
    <div id="add-to-cart" className="product-right-component">
      <div id="add-to-cart-dropdown-container">
        <div id="add-to-cart-error-container">
          {showError
            && (
              <div id="add-to-cart-error-message">
                <em>PLEASE SELECT A SIZE</em>
              </div>
            )}
        </div>
        <div id="add-to-cart-dropdowns" className="add-to-cart-component">
          {isLoading
            && disabledSizeSelector('SELECT SIZE')}
          {!isLoading
            && (Object.values(sizesInStock).length === 0
              ? disabledSizeSelector('OUT OF STOCK')
              : (
                <select defaultValue="Select Size" id="size-dropdown" className="interactive-button-copy" onChange={handleSizeSelector}>
                  <option disabled hidden value="Select Size"> SIZE</option>
                  {Object.values(sizesInStock)
                    .map((size) => <option key={size.size}>{size.size}</option>)}
                </select>
              ))}
          {Object.values(selectedSize).length === 0
            ? (
              <select disabled defaultValue="—" id="quantity-dropdown" className="interactive-button-copy interactive-button-copy-disabled">
                <option disabled hidden value="—">QUANTITY</option>
              </select>
            )
            : (
              <select id="quantity-dropdown" className="interactive-button-copy">
                {[...Array(Math.min(selectedSize.quantity, 16)).keys()]
                  .slice(1)
                  .map((quantity) => <option key={quantity}>{quantity}</option>)}
              </select>
            )}
        </div>
      </div>
      {!isLoading && Object.values(sizesInStock).length === 0
        ? null
        : (
          <div id="add-to-cart-buttons" className="add-to-cart-component">
            <button type="button" id="add-to-cart-button" className="interactive-button-copy cart" onClick={handleAddToBag}>
              <span>Add To Cart</span>
              <span>&#65291;</span>
            </button>
            {/* <CartModal
              stylesInCart={stylesInCart}
              changeQty={changeQty}
              removeStyleFromCart={removeStyleFromCart}
              itemCount={itemCount}
            /> */}
          </div>
        )}
    </div>
  );
}

AddToCart.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  productStyleSelected: PropTypes.instanceOf(Object).isRequired,
};

export default AddToCart;
