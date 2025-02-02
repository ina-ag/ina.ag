document.addEventListener('DOMContentLoaded', function() {
  var agl = window.location.href;

  if (agl.indexOf("?m=1") > -1) {
    agl = agl.split("?m=1")[0];

    if (agl.indexOf("?max-results=") > -1) {
      agl = agl.split("?max-results=")[0];
    }

    var metaTag = document.createElement('meta');
    metaTag.name = "robots";
    metaTag.content = "noindex";
    document.getElementsByTagName('head')[0].appendChild(metaTag);

    window.history.replaceState({}, document.title, agl);
  }
});

const color = document.querySelector('.theme-color');

  if (color) {
    const applyChange = () => {

        const isLight = color.getAttribute('aria-pressed') === 'true' ? false : true;
      color.setAttribute('aria-pressed', isLight.toString());

      document.documentElement.className = isLight ? 'mode-light' : 'mode-dark';
    };

    const flip = () => {
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          applyChange();
        });
      } else {
        applyChange();
      }
    };

    color.addEventListener('click', flip);
  }

let lastScrollTop = 0;

function isElementInView(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
}

function handleScroll() {
    const aglDomViewport = document.querySelectorAll('.follow-in-up');
    
    if (aglDomViewport.length === 0) return;

    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    aglDomViewport.forEach((aglPushItem, index) => {
        if (!aglPushItem) return;

        const rect = aglPushItem.getBoundingClientRect();

        if (index === 0) {
            if (rect.bottom <= 200) {
                aglPushItem.classList.add('first-invisible');
                aglPushItem.classList.remove('first-visible');
            } else {
                aglPushItem.classList.add('first-visible');
                aglPushItem.classList.remove('first-invisible');
            }
        } else {
            if (isElementInView(aglPushItem)) {
                if (!aglPushItem.classList.contains('visible')) {
                    aglPushItem.classList.add('visible');
                    aglPushItem.classList.remove('hidden');
                }
            } else {
                aglPushItem.classList.add('hidden');
                aglPushItem.classList.remove('visible');
            }
        }
    });

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}

function handleInitialLoad() {
    const aglDomViewport = document.querySelectorAll('.follow-in-up');
    
    if (aglDomViewport.length === 0) return;

    const firstElement = aglDomViewport[0];
    if (firstElement) {
        firstElement.classList.add('first-visible');
        firstElement.classList.remove('hidden');
    }

    aglDomViewport.forEach((aglPushItem, index) => {
        if (index !== 0 && aglPushItem) {
            if (isElementInView(aglPushItem)) {
                aglPushItem.classList.add('visible');
                aglPushItem.classList.remove('hidden');
            } else {
                aglPushItem.classList.add('hidden');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    handleInitialLoad();
    handleScroll();
});

window.addEventListener('scroll', handleScroll);

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

function checkSlideUp() {
  const elements = document.querySelectorAll('.slide_view');
  
  if (elements.length === 0) return;

  elements.forEach(el => {
    if (isElementInViewport(el)) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', checkSlideUp);
document.addEventListener('DOMContentLoaded', checkSlideUp);

const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    };

    backToTopButton.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

const cursor = document.querySelector(".cursor");
var timeout;

if (cursor) {
    document.addEventListener("mousemove", (e) => {
        let x = e.pageX;
        let y = e.pageY;
        cursor.style.top = y + "px";
        cursor.style.left = x + "px";
        cursor.style.display = "block";

        function mouseStopped() {
            cursor.style.display = "none";
        }

        clearTimeout(timeout);
        timeout = setTimeout(mouseStopped, 5000);
    });

    document.addEventListener("mouseout", () => {
        cursor.style.display = "none";
    });
}

const buttons = document.querySelectorAll(".button_shake");

if (buttons.length > 0) {
  function triggerShakeAnimation(button) {
    button.classList.add("shake");

    setTimeout(() => {
      button.classList.remove("shake");
    }, 500);
  }

  setInterval(() => {
    buttons.forEach(button => {
      triggerShakeAnimation(button);
    });
  }, 5000);
}

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
  indexCartIcon();
}

function indexCartIcon() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

function indexDevice() {
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');

  if (cartItemsContainer && totalElement) {
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
      decreaseButton.onclick = function() { 
        updateQuantity(item.name, item.quantity - 1);
        indexDevice();
      };
      
      const quantitySpan = document.createElement('span');
      quantitySpan.classList.add('quantity');
      quantitySpan.textContent = item.quantity;

      const increaseButton = document.createElement('button');
      increaseButton.textContent = '+';
      increaseButton.onclick = function() { 
        updateQuantity(item.name, item.quantity + 1);
        indexDevice();
      };

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.onclick = function() { 
        removeProduct(item.name);
        indexDevice();
      };

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
  indexCartIcon();
  checkCheckoutButton();
}

function removeProduct(productName) {
  const productIndex = cart.findIndex(item => item.name === productName);
  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  renderCart();
  indexCartIcon();
  checkCheckoutButton();
}

function checkCheckoutButton() {
  const checkoutButton = document.querySelector('.checkout-btn');
  if (checkoutButton) {
    if (cart.length > 0) {
      checkoutButton.classList.add('visible');
    } else {
      checkoutButton.classList.remove('visible');
    }
  }
}

function checkout() {
  if (cart.length > 0) {
    window.location.href = "/p/shop.html";
  } else {
    alert('Keranjang kosong. Memilih layanan terlebih dahulu.');
  }
}

function toggleCartModal() {
  const modal = document.getElementById('cart-modal');
  if (modal) {
    modal.style.display = 'flex';
    renderModalCart();
  }
}

function closeCartModal() {
  const modal = document.getElementById('cart-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function renderModalCart() {
  const modalCartItems = document.getElementById('modal-cart-items');
  if (modalCartItems) {
    modalCartItems.innerHTML = '';

    if (cart.length === 0) {
      modalCartItems.innerHTML = '<p>kosong</p>';
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
}

window.onload = function() {
  renderCart();
  checkCheckoutButton();
  indexCartIcon();
};

// loading
document.addEventListener('DOMContentLoaded', function() {
    const loadScreen = document.querySelector('.devina-unique-loading-progress');
    const percentText = document.querySelector('.devina-unique-agl-load-percent');

    if (!loadScreen || !percentText) {
        return;
    }

    let percent = 0;

    const interval = setInterval(function() {
        percent += 1;
        percentText.textContent = percent + '%';

        if (percent >= 100) {
            clearInterval(interval);
            setTimeout(function() {
                loadScreen.style.display = 'none';
            }, 1000);
        }
    }, 50);
});

    var indexOne = document.querySelectorAll('.agl___01');
    if (indexOne.length > 0) {
        indexOne.forEach(function(element) {
            element.addEventListener('click', function() {
                if ("vibrate" in navigator) {
                    navigator.vibrate(50);

                }
            });
        });
    }

    var indexTwo = document.querySelectorAll('#agl___02');
    if (indexTwo.length > 0) {
        indexTwo.forEach(function(element) {
            element.addEventListener('click', function() {
                if ("vibrate" in navigator) {
                    navigator.vibrate([50, 50, 50]);

                }
            });
        });
    }
    
    document.addEventListener('DOMContentLoaded', function() {
  try {
    const images = document.querySelectorAll('img');
    
    if (images.length > 0) {
      images.forEach(img => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
      });
    }
  } catch (error) {
  }
});

        const kodeElement = document.querySelector('#kode-html code');

        if (kodeElement) {
            let kodeText = kodeElement.innerHTML;

            kodeText = kodeText
					.replace(/=/g, '<span class="color-blue">=</span>')
                        .replace(/&lt;/g, '<span class="color-red">&lt;</span>')
                        .replace(/&gt;/g, '<span class="color-red">&gt;</span>');

            kodeText = kodeText
                .replace(/(function|const|console\.log|forEach)/g, '<span class="color-blue">$1</span>')
                .replace(/('.*')/g, '<span class="color-green">$1</span>')
                .replace(/\d+/g, '<span class="color-red">$&</span>')
                .replace(/(\/\/.*)/g, '<span class="color-purple">$1</span>');

            kodeElement.innerHTML = kodeText;
        }

const fluffyBoxes = document.querySelectorAll('.fluffy-box');

  if (fluffyBoxes.length > 0) {
    fluffyBoxes.forEach(fluffyBox => {
      fluffyBox.addEventListener('mousemove', function(e) {
        const rect = fluffyBox.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const offsetX = (e.clientX - centerX) / (rect.width / 2);
        const offsetY = (e.clientY - centerY) / (rect.height / 2);

        const tiltX = offsetY * 10;
        const tiltY = offsetX * 10;

        fluffyBox.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });

      fluffyBox.addEventListener('mouseleave', function() {
        fluffyBox.style.transform = 'rotateX(0deg) rotateY(0deg)';
      });
    });
  }
