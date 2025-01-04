// 2024
// dev.ina.ag
// web design Global
// Devina Toko Online
// https://www.ina.ag/

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


// menu

        const openMenuProduk = document.getElementById('ina-menumenuproduk');
        const produkPopup = document.getElementById('ina-menumenuprodukPopup');
        const closePopup = document.getElementById('ina-closePopup');

        const pakaianSubcategory = document.getElementById('ina-pakaianSubcategory');
        const aksesoriSubcategory = document.getElementById('ina-aksesoriSubcategory');
        const makananSubcategory = document.getElementById('ina-makananSubcategory');

        const pakaianBtn = document.getElementById('ina-pakaianBtn');
        const aksesoriBtn = document.getElementById('ina-aksesoriBtn');
        const makananBtn = document.getElementById('ina-makananBtn');

        openMenuProduk.addEventListener('click', function() {
            produkPopup.style.display = 'flex';
        });

        closePopup.addEventListener('click', function() {
            produkPopup.style.display = 'none';
        });

        pakaianBtn.addEventListener('click', function() {
            toggleSubcategory(pakaianSubcategory);
        });

        aksesoriBtn.addEventListener('click', function() {
            toggleSubcategory(aksesoriSubcategory);
        });

        makananBtn.addEventListener('click', function() {
            toggleSubcategory(makananSubcategory);
        });

        function toggleSubcategory(subcategory) {
            if (subcategory.style.display === 'block') {
                subcategory.style.display = 'none';
            } else {
                pakaianSubcategory.style.display = 'none';
                aksesoriSubcategory.style.display = 'none';
                makananSubcategory.style.display = 'none';
                subcategory.style.display = 'block';
            }
        }


// Scroll Anim

const elements = document.querySelectorAll('.ina-anim');

function checkVisibility() {
    const windowHeight = window.innerHeight;

    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');

        } else {
            element.classList.remove('visible');

        }
    });
}


window.addEventListener('scroll', checkVisibility);


document.addEventListener('DOMContentLoaded', checkVisibility);


// loading
    window.onload = function() {
        const aglLoadScreen = document.querySelector('.angel-loading-progress');
        const percentText = document.querySelector('.agl-load-percent');
        const bodyContent = document.querySelector('body');
        
        if (!aglLoadScreen || !percentText) {
            return;
        }
        
        let percent = 0;
        
        const interval = setInterval(() => {
            percent += 1;
            percentText.textContent = percent + '%';

            if (percent >= 100) {
                clearInterval(interval);
                
                setTimeout(() => {
                    aglLoadScreen.style.display = 'none';
                }, 1000);
            }
        }, 50);
    };
