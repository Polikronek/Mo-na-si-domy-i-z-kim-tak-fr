const addToCartButtons = document.querySelectorAll(".add-to-cart");
const clearCartButton = document.querySelector(".clear-cart");
const checkoutButton = document.querySelector(".checkout");
const cartItems = document.querySelector(".cart-items");
const cartTotalPrice = document.querySelector(".cart-total-price");

let cart = [];


function addToCart(event) {
  const button = event.target;
  const id = button.dataset.id;
  const name = button.dataset.name;
  const price = parseFloat(button.dataset.price);
  const item = { id, name, price, quantity: 1 };
  const isInCart = cart.some(item => item.id === id);

  if (!isInCart) {
    cart.push(item);
  } else {
    const index = cart.findIndex(item => item.id === id);
    cart[index].quantity++;
  }

  showCartItems();
  showCartTotal();
}


function clearCart() {
  cart = [];
  showCartItems();
  showCartTotal();
}

function showCartItems() {
  cartItems.innerHTML = "";

  cart.forEach(item => {
    const { id, name, price, quantity } = item;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <span class="cart-item-name">${name}</span>
      <span class="cart-item-price">$${price.toFixed(2)}</span>
      <span class="cart-item-quantity">${quantity}</span>
      <button class="btn btn-danger remove-item" data-id="${id}"><i class="fas fa-trash"></i></button>
    `;

    cartItems.appendChild(cartItem);
  });
}

function showCartTotal() {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}

function removeItem(event) {
  const button = event.target;
  const id = button.dataset.id;
  const index = cart.findIndex(item => item.id === id);

  if (index >= 0) {
    const item = cart[index];
    if (item.quantity === 1) {
      cart.splice(index, 1);
    } else {
      item.quantity--;
    }
  }

  showCartItems();
  showCartTotal();
}

addToCartButtons.forEach(button => {
  button.addEventListener("click", addToCart);
});

clearCartButton.addEventListener("click", clearCart);

cartItems.addEventListener("click", event => {
  if (event.target.classList.contains("remove-item")) {
    removeItem(event);
  }
});

checkoutButton.addEventListener("click", () => {
  alert("Dziękujemy za zakupy!");
  clearCart();
});