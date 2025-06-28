import {cart, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';

let productHtml = "";
products.forEach((products) => {
productHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${products.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(products.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${products.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${products.extraInfo()} 

          <div class="product-spacer"></div>

          <div class="added-to-cart js-addedto-cart-${products.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${products.id}">
            Add to Cart
          </button>
        </div>`
});

          //${products.extraInfo()} 
          // Polymmorphic function to display extra information based on product type isko define nahi karna padega ki konse 
          // class ka hai it might be a book or a movie or a music album koi bhi case ho sakta hai hum 
          // isko change kare bina use kar sakte hain 

document.querySelector(".js-products-html").innerHTML = productHtml;

// // Funtion to add to cart button and increase quantity by 1
// function addToCart(productId) {
//   let matchingItem;

//   cart.forEach((item) => {
//     if (item.productId === productId) {
//       matchingItem = item;
//     }
//   });

//   let totalQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
//   let quantity = Number(totalQuantity.value);

//   if(matchingItem)
//   {
//     matchingItem.quantity++;
//   }
//   else
//   {
//       cart.push({
//       productId : productId,
//       quantity : quantity});
//   }
// }

// Function is for addtocart dropdown increase quantity by what choose form dropdown
export function updateCartQuantity(productId){
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

  const addedMsg = document.querySelector(`.js-addedto-cart-${productId}`);
  addedMsg.classList.add("js-show-added-msg");

  setTimeout(() => {
    addedMsg.classList.remove("js-show-added-msg");
  }, 1500);
}

document.querySelectorAll(".add-to-cart-button").forEach((button) => {
button.addEventListener("click", () => {
  const productId = button.dataset.productId;
  addToCart(productId)
  updateCartQuantity(productId);
});
});
