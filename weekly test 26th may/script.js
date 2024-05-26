const products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];
  
  let cart = [];
  
  function renderProducts() {
    const productBox = document.getElementById('product-list');
    productBox.innerHTML = '';
    
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <span>${product.name} - $${product.price}</span>
        <button onclick="addToCart(${product.id})">+</button>
        <span id="quantity-${product.id}">0</span>
        <button onclick="removeFromCart(${product.id})">-</button>
      `;
      productBox.appendChild(productDiv);
    });
  }
  
  function renderCart() {
    const cartBox = document.getElementById('cart-list');
    cartBox.innerHTML = '';
    
    if (cart.length === 0) {
      cartBox.textContent = 'No Product added to the cart';
    } else {
      cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
          <span>${item.name} - $${item.price} x ${item.quantity}</span>
        `;
        cartBox.appendChild(cartItemDiv);
      });
    }
    
    const totalPriceDiv = document.getElementById('total-price');
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalPriceDiv.textContent = `Total Price: $${totalPrice}`;
  }
  
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    document.getElementById(`quantity-${productId}`).textContent = cartItem ? cartItem.quantity : 1;
    renderCart();
  }
  
  function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        cart = cart.filter(item => item.id !== productId);
      }
    }
    
    document.getElementById(`quantity-${productId}`).textContent = cartItem ? cartItem.quantity : 0;
    renderCart();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
  });
  