export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
    deliveryOptionsId: '1'
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
    deliveryOptionsId: '2'
  }
  ];
}


function saveToCart(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

// Funtion to add to cart button and increase quantity by 1
export function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });

  let totalQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
  let quantity = Number(totalQuantity.value);

  if(matchingItem)
  {
    matchingItem.quantity+= quantity;
  }
  else
  {
      cart.push({
      productId : productId,
      quantity : quantity,
      deliveryOptionsId : '1'});
  }

  saveToCart();
}

export function removeCart(productId){
 let newCart=[];
cart.forEach((cartItem )=> {
  if(cartItem.productId !== productId){
    newCart.push(cartItem);
  }
});
cart = newCart;

saveToCart();
}


export function updateDeliveryOptions(productId, deliveryOptionsId) {

  let matchingItem;

  cart.forEach((item) => {
    if (item.productId === productId) {
      matchingItem = item;
    }
  });

  matchingItem.deliveryOptionsId = deliveryOptionsId;

  saveToCart();
}