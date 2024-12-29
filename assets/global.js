  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function addToCart(productName, price) {
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex === -1) {
      cart.push({ name: productName, price: price, quantity: 1 });
    } else {
      cart[existingProductIndex].quantity += 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    renderCart();
    checkCheckoutButton();
    updateCartIcon();
  }


  function updateCartIcon() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = cartCount;
    }
  }


  function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    cartItemsContainer.innerHTML = '';
    
    let totalPrice = 0;

    cart.forEach(item => {
      totalPrice += item.price * item.quantity;

      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');

      const productNameSpan = document.createElement('span');
      productNameSpan.textContent = item.name;

      const quantityDiv = document.createElement('div');
      
      const decreaseButton = document.createElement('button');
      decreaseButton.textContent = '-';
      decreaseButton.onclick = function() { updateQuantity(item.name, item.quantity - 1); };
      
      const quantitySpan = document.createElement('span');
      quantitySpan.classList.add('quantity');
      quantitySpan.textContent = item.quantity;

      const increaseButton = document.createElement('button');
      increaseButton.textContent = '+';
      increaseButton.onclick = function() { updateQuantity(item.name, item.quantity + 1); };

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.onclick = function() { removeProduct(item.name); };

      quantityDiv.appendChild(decreaseButton);
      quantityDiv.appendChild(quantitySpan);
      quantityDiv.appendChild(increaseButton);
      cartItemDiv.appendChild(productNameSpan);
      cartItemDiv.appendChild(quantityDiv);
      cartItemDiv.appendChild(removeButton);

      cartItemsContainer.appendChild(cartItemDiv);
    });

    totalElement.textContent = `Total: Rp${totalPrice.toLocaleString()}`;
  }


  function updateQuantity(productName, newQuantity) {
    const productIndex = cart.findIndex(item => item.name === productName);

    if (newQuantity <= 0) {
      removeProduct(productName);
    } else if (productIndex !== -1) {
      cart[productIndex].quantity = newQuantity;
    }


    localStorage.setItem('cart', JSON.stringify(cart));

    renderCart();
    updateCartIcon();
    checkCheckoutButton();
  }


  function removeProduct(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex !== -1) {
      cart.splice(productIndex, 1);
    }


    localStorage.setItem('cart', JSON.stringify(cart));

    renderCart();
    updateCartIcon();
    checkCheckoutButton();
  }


  function checkCheckoutButton() {
    const checkoutButton = document.querySelector('.checkout-btn');
    if (cart.length > 0) {
      checkoutButton.style.display = 'inline-block';
    } else {
      checkoutButton.style.display = 'none';
    }
  }


  function checkout() {
    if (cart.length > 0) {
      alert('Terima kasih telah berbelanja! Ini adalah demo toko online.');
    } else {
      alert('Keranjang kosong. Silakan tambahkan produk terlebih dahulu.');
    }
  }


  function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'flex';
    renderModalCart();
  }


  function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
  }


  function renderModalCart() {
    const modalCartItems = document.getElementById('modal-cart-items');
    modalCartItems.innerHTML = '';

    if (cart.length === 0) {
      modalCartItems.innerHTML = '<p>Keranjang kosong.</p>';
    } else {
      cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
          <span>${item.name}</span>
          <span>Rp${(item.price * item.quantity).toLocaleString()}</span>
          <span>x${item.quantity}</span>
        `;
        modalCartItems.appendChild(cartItemDiv);
      });
    }
  }


  window.onload = function() {
    renderCart();
    checkCheckoutButton();
    updateCartIcon();
  };


// this login

document.addEventListener('DOMContentLoaded', function() {
    const openMenuLogin = document.getElementById('openMenuLogin');
    const loginPopup = document.getElementById('loginPopup');
    const closePopup = document.getElementById('closePopup');
    const loginForm = document.getElementById('loginForm');

    openMenuLogin.addEventListener('click', function() {
        loginPopup.style.display = 'flex';
    });

    closePopup.addEventListener('click', function() {
        loginPopup.style.display = 'none';
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        alert('Login Successful!');
        loginPopup.style.display = 'none';
    });
});
