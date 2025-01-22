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
}

window.onload = function() {
  renderCart();
  checkCheckoutButton();
  updateCartIcon();
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


