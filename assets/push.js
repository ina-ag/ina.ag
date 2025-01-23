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