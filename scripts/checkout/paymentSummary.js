import {cart} from '../../data/cart.js';
import {getProducts} from '../../data/products.js';
import {getDeliveryOptionById} from '../../data/deliveryOptions.js'

export function renderPaymentSummary() {

    let priceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProducts(cartItem.productId);
        // console.log(`Product ID: ${product.priceCents}, Quantity: ${cartItem.quantity}`);
        priceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionsId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforetaxCents = priceCents + shippingPriceCents;
    const taxCents = Math.round(totalBeforetaxCents * 0.1);
    const totalCents = totalBeforetaxCents + taxCents;

    const paymentSummaryHTML = `          
        <div class="payment-summary-title">
            Order Summary
        </div>

          <div class="payment-summary-row">
            <div class="js-item">Items ():</div>
            <div class="payment-summary-money">$${(priceCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingPriceCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforetaxCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(taxCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalCents/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;

          document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
        //   renderOrderSummary();
}


