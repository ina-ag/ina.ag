const elements = document.querySelectorAll('.ina-anim');

if (elements.length > 0) {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection, options);

  elements.forEach(element => {
    observer.observe(element);
  });
}

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

  const animateTextElements = document.querySelectorAll('.agl-1');

  function slideUpElements() {
    if (animateTextElements.length > 0) {
      animateTextElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('active');
        }, index * 1000);
      });
    }
  }

  window.addEventListener('load', slideUpElements);

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

let index = 0;

function moveSlide(direction) {
  const slides = document.querySelector('.agl-testimonials');
  const totalSlides = document.querySelectorAll('.agl-testimonial').length;

  if (!slides || totalSlides === 0) return;

  index += direction;

  if (index < 0) {
    index = totalSlides - 1;
  } else if (index >= totalSlides) {
    index = 0;
  }

  slides.style.transform = `translateX(-${index * 100}%)`;

  aglDot();
}

function currentSlide(slideIndex) {
  const slides = document.querySelector('.agl-testimonials');
  const totalSlides = document.querySelectorAll('.agl-testimonial').length;

  if (!slides || totalSlides === 0) return;

  index = slideIndex;
  slides.style.transform = `translateX(-${index * 100}%)`;

  aglDot();
}

function aglDot() {
  const dots = document.querySelectorAll('.agl-dot');
  if (dots.length === 0) return;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index]?.classList.add('active');
}

setInterval(() => {
  moveSlide(1);
}, 3000);

aglDot();

var agl = window.location.href;

if (agl.indexOf("?m=1") > -1) {
  agl = agl.split("?m=1")[0];

  var metaTag = document.createElement('meta');
  metaTag.name = "robots";
  metaTag.content = "noindex";
  document.getElementsByTagName('head')[0].appendChild(metaTag);

  window.history.replaceState({}, document.title, agl);
}

const slides = document.querySelectorAll('.agl___slide');
const indicators = document.querySelectorAll('.agl___indicator-item');
const carousel = document.querySelector('.agl___carousel');

function handleSlideVisibility(entries) {
  entries.forEach((entry) => {
    const slideIndex = entry.target.dataset.index;
    if (indicators[slideIndex]) {
      indicators[slideIndex].classList.toggle('agl___expand', entry.isIntersecting);
    }
  });
}

function detectSlideVisibility(slide) {
  const options = { threshold: 0.2 };
  const io = new IntersectionObserver(handleSlideVisibility, options);
  io.observe(slide);
}

const init = () => {
  if (slides.length > 0 && indicators.length > 0) {
    slides.forEach(detectSlideVisibility);
  }
};

function moveToSlide(index) {
  const slide = slides[index];
  carousel.scrollTo({
    top: slide.offsetTop,
    behavior: 'smooth',
  });
}

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    moveToSlide(index);
  });
});

window.addEventListener('load', init, false);

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

  // img
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          if (img && img.getAttribute('data-src')) {
            img.src = img.getAttribute('data-src');
          }

          const source = img.closest('picture') ? img.closest('picture').querySelector('source') : null;
          if (source && source.getAttribute('data-srcset')) {
            source.srcset = source.getAttribute('data-srcset');
          }

          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '100px 0px',
    });

    const images = document.querySelectorAll('img[data-src], source[data-srcset]');
    images.forEach(image => {
      observer.observe(image);
    });
