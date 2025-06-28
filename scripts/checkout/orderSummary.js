import {cart, removeCart, updateDeliveryOptions} from '../../data/cart.js';
import { products , getProducts} from '../../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOptionById} from '../../data/deliveryOptions.js'
import {renderPaymentSummary} from './paymentSummary.js';

// let now = dayjs();
// let deliveryDate = now.add(3, 'days');
// let formattedDate = deliveryDate.format('dddd, MMMM D');
// // console.log(formattedDate);

export function renderOrderSummary()
{
  let cartSummaryHtml = '';
  cart.forEach((cartItem) => {
      const product = cartItem.productId;

      let matchingItem = getProducts(product);

      const deliveryOptionId = cartItem.deliveryOptionsId;

      let deliveryOption = getDeliveryOptionById(deliveryOptionId);

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const formattedDate = deliveryDate.format('dddd, MMMM D');

      cartSummaryHtml += `<div class="cart-item-container-${matchingItem.id}">
              <div class="delivery-date">
                Delivery date: ${formattedDate}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingItem.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                  ${matchingItem.name}
                  </div>
                  <div class="product-price">
                  $ ${(matchingItem.priceCents / 100).toFixed(2)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-item" data-product-id=${matchingItem.id}>
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingItem,cartItem)}
                </div>
              </div>
            </div>`;
  });

  function deliveryOptionsHTML(matchingItem,cartItem){
    // console.log(cartItem.deliveryOptionsId);
    let html = '';
    deliveryOptions.forEach((deliveryOption)=>{
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const formattedDate = deliveryDate.format('dddd, MMMM D');
      // console.log(formattedDate);

      const priceString = deliveryOption.priceCents === 0 ? ' FREE' : `$${(deliveryOption.priceCents)/100}`;
      // console.log(priceString);

      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;
      // console.log(isChecked);
      // console.log(deliveryOption.id);
      // console.log(cartItem.deliveryOptionsId);

      html += `<div class="delivery-option js-delivery-option"
                  data-product-id="${matchingItem.id}" 
                  data-delivery-option-id="${deliveryOption.id}">
                <input type="radio" 
                  ${isChecked ? 'checked' : ''}
                  class="delivery-option-input" 
                  name="delivery-option-${matchingItem .id}" />
                  <div>
                    <div class="delivery-option-date">
                      ${formattedDate}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
              </div>
            `;     
    });
    return html;
  }

  document.querySelector(".js-cart-summary").innerHTML = cartSummaryHtml;

  document.querySelectorAll('.js-delete-item').forEach((deleteButton) => {
    // console.log(deleteButton);
      deleteButton.addEventListener('click', () => {
        let productId = deleteButton.dataset.productId;
        removeCart(productId);
        const htmlContainer = document.querySelector(`.cart-item-container-${productId}`);
        htmlContainer.remove();

        renderPaymentSummary();

        updateCartQuantity();
        // console.log(cart);
        // console.log('Delete : ' + deleteButton);
        // console.log(deleteButton.dataset.productId);
        // console.log(item.dataset.productId); // this is DOM object isme sari info ata hai jaise type kya hai ye sab
      // let productId = event.target.dataset.productId;
      // console.log(productId);
  });
  });

  function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-return-to-home-link')
      .innerHTML = `${cartQuantity} items`;

      document.querySelector('.js-item')
      .innerHTML = `Items ( ${cartQuantity} ) :`;
      
  }

  updateCartQuantity();


  document.querySelectorAll('.js-delivery-option').forEach((element) => {element.addEventListener('click', () => {

    // deliveryOption ye jo deliveryOption hai ye DOM object hai jiske madam se hum data ko access kar sakte hain

    // const productId = element.dataset.productId;
    // const deliveryOptionId = element.dataset.deliveryOptionId;

    // Uper wale code ke liye shortcut bana diya hai
    const {productId, deliveryOptionId} = element.dataset;

    updateDeliveryOptions(productId, deliveryOptionId);

    renderOrderSummary();

    renderPaymentSummary();
  })
  });
}