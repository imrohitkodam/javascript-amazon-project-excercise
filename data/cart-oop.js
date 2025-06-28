function Cart(localStoregeKey){
  
    const cart = {
    cartItems : undefined,

    loadFromStorage()
    {
      this.cartItems = JSON.parse(localStorage.getItem(localStoregeKey));

      if(!this.cartItems)
      {
        this.cartItems = [  
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
    },

    saveToCart()
    {
      localStorage.setItem(localStoregeKey,JSON.stringify(this.cartItems));
    },

    // addToCart(productId) {
    //   let matchingItem;
    
    //   this.cartItems.forEach((item) => {
    //     if (item.productId === productId) {
    //       matchingItem = item;
    //     }
    //   });
    
    //   let totalQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
    //   let quantity = Number(totalQuantity.value);
    
    //   if(matchingItem)
    //   {
    //     matchingItem.quantity+= quantity;
    //   }
    //   else
    //   {
    //       this.cartItems.push({
    //       productId : productId,
    //       quantity : quantity,
    //       deliveryOptionsId : '1'});
    //   }
    
    //   cart.saveToCart();
    // },

    addToCart(productId, quantity = null)
    {
      let matchingItem;

      this.cartItems.forEach((item) => {
        if (item.productId === productId) {
          matchingItem = item;
        } 
      });

      if (quantity === null) {
        let totalQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
        quantity = totalQuantity ? Number(totalQuantity.value) : 1;
      }

      if(matchingItem)
      {
        matchingItem.quantity += quantity;
      }
      else
      {
        this.cartItems.push({
          productId : productId,
          quantity : quantity,
          deliveryOptionsId : '1'
        });
      }

      this.saveToCart();
    },

    removeCart(productId)
    {
      let newCart=[];
      this.cartItems.forEach((cartItem )=> {
        if(cartItem.productId !== productId){
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;

      this.saveToCart();
    },

    updateDeliveryOptions(productId, deliveryOptionsId)
    {
      let matchingItem;

      this.cartItems.forEach((item) => {
        if (item.productId === productId) {
          matchingItem = item;
        }
      });

      matchingItem.deliveryOptionsId = deliveryOptionsId;

      this.saveToCart();
    },

  };

  return cart;
}

let cart = Cart('cart-oop');
let buisnessCart = Cart('buisnessCart-oop');

cart.loadFromStorage();
buisnessCart.loadFromStorage();

console.log(cart);
console.log(buisnessCart);
