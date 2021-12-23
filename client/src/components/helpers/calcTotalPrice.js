const calcTotalPrice = (cart) => {
  let totalprice = 0;

  if (!cart.length) {
    return totalprice;
  }

  cart.forEach((item) => {
    const cost = item.quantity
    * Number(item.style.sale_price ? item.style.sale_price : item.style.original_price);
    totalprice += cost;
  });
  return totalprice;
};

export default calcTotalPrice;
