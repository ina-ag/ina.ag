window.addEventListener('load', function() {
  const gridContainer = document.querySelector('.blog-posts');

  if (gridContainer) {
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    gridContainer.style.gridAutoRows = 'auto';
    gridContainer.style.gap = '20px';

    if (window.innerWidth <= 1024) {
      gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
    if (window.innerWidth <= 768) {
      gridContainer.style.gridTemplateColumns = '1fr';
    }

    const gridItems = gridContainer.querySelectorAll('.post');
    gridItems.forEach(function(item) {
      item.style.margin = '0';
      item.style.padding = '10px';
      item.style.minHeight = '300px';
      item.style.boxSizing = 'border-box';
    });
  }

  window.addEventListener('resize', function() {
    const gridContainer = document.querySelector('.blog-posts');
    
    if (gridContainer) {
      if (window.innerWidth <= 768) {
        gridContainer.style.gridTemplateColumns = '1fr';
      } else if (window.innerWidth <= 1024) {
        gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
      } else {
        gridContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
      }
    }
  });
});
