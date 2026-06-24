const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 10.99,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 19.99,
  },
  {
    id: 3,
    name: 'Product 3',
    price: 5.99,
  },
];

const productsListContainer = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart');
const cartTotalContainer = document.getElementById('cart-total');
const totalPriceElem = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-btn');

function displayProducts() {
  products.forEach((product) => {
    const productItem = document.createElement('div');
    productItem.classList.add('product');
    productItem.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    productsListContainer.appendChild(productItem);
  });
}
productsListContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart')) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    addToCart(productId);
  }
});

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    let cart = loadCart();
    cart.push(product);
    saveCart(cart);
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  const cart = loadCart();
  if (cart.length === 0) {
    reset();
  } else {
    emptyCartMessage.classList.add('hidden');
    cartTotalContainer.classList.remove('hidden');
    displayCartItems();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    totalPriceElem.textContent = totalPrice.toFixed(2);
  }
}

checkoutButton.addEventListener('click', () => {
  localStorage.removeItem('cart');
  alert('Thank you for your purchase!');
  updateCartDisplay();
});

document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
  updateCartDisplay();
});

function displayCartItems() {
  const cart = loadCart();
  cartItemsContainer.innerHTML = '';
  cart.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <h4>${item.name}</h4>
      <p>Price: $${item.price.toFixed(2)}</p>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart;
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function reset() {
  cartTotalContainer.classList.add('hidden');
  cartItemsContainer.innerHTML = ` <p id="empty-cart">Your cart is empty.</p>`;
}
s;
