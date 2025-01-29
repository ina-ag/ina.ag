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


let lastScrollTop = 0;

function isElementInView(el) {
    const rect = el.getBoundingClientRect();

    return rect.top < window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
}

function handleScroll() {
    const aglDomViewport = document.querySelectorAll('.follow-in-up');
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    aglDomViewport.forEach(aglPushItem => {
        if (isElementInView(aglPushItem)) {
            if (!aglPushItem.classList.contains('visible')) {
                aglPushItem.classList.add('visible');
                aglPushItem.classList.remove('hidden');
            }
        } else {
            aglPushItem.classList.add('hidden');
            aglPushItem.classList.remove('visible');
        }
    });

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}

function handleInitialLoad() {
    const aglDomViewport = document.querySelectorAll('.follow-in-up');
    
    aglDomViewport.forEach(aglPushItem => {
        if (isElementInView(aglPushItem)) {
            aglPushItem.classList.add('visible');
            aglPushItem.classList.remove('hidden');
        } else {
            aglPushItem.classList.add('hidden');
        }
    });
}

window.addEventListener('scroll', handleScroll);
document.addEventListener('DOMContentLoaded', () => {
    handleInitialLoad();
    handleScroll();
});
