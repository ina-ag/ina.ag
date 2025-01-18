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
