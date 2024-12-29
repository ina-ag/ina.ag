    let cart = [];

    function addToCart(productName, price) {
      const existingProductIndex = cart.findIndex(item => item.name === productName);

      if (existingProductIndex === -1) {
        cart.push({ name: productName, price: price, quantity: 1 });
      } else {
        cart[existingProductIndex].quantity += 1;
      }

      renderCart();
      
      showPopup();
      checkCheckoutButton();
    }


    function updateQuantity(productName, quantity) {
      const productIndex = cart.findIndex(item => item.name === productName);

      if (productIndex !== -1 && quantity > 0) {
        cart[productIndex].quantity = quantity;
      } else {
        cart.splice(productIndex, 1);
      }

      renderCart();
      
      showPopup();
      checkCheckoutButton();
    }

    function removeProduct(productName) {
      cart = cart.filter(item => item.name !== productName);
      renderCart();
      
      showPopup();
      checkCheckoutButton();
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


    function showPopup() {
      const popup = document.getElementById('popup');
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      
      if (totalItems > 0) {
        popup.textContent = `Produk Total pesanan: ${totalItems} Cart. Cek out di bawah!`;
        popup.style.display = 'block';
      } else {
        popup.style.display = 'none';
      }
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
        alert('Terima kasih telah berbelanja! ini adalah demo Toko Online responsive design.');

      } else {
        alert('Keranjang kosong. Silakan tambahkan produk terlebih dahulu.');
      }
    }

    window.onload = function() {
      showPopup();
      
      checkCheckoutButton();
    };