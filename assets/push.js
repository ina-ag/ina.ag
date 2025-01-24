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

        const kodeElement = document.querySelector('#kode_html code');

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
