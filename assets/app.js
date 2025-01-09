function applyGridStyles() {
  const blogPosts = document.querySelector('.update-blog-posts');
  if (!blogPosts) return;

  blogPosts.style.display = 'grid';
  blogPosts.style.gridTemplateColumns = 'repeat(3, 1fr)';
  blogPosts.style.gap = '15px';
  blogPosts.style.textAlign = 'center';

  const mediaQueries = [
    {
      media: '(max-width: 1024px)',
      styles: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    },
    {
      media: '(max-width: 768px)',
      styles: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
    },
    {
      media: '(max-width: 480px)',
      styles: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
    },
  ];

  function handleMediaQueries() {
    mediaQueries.forEach((query) => {
      if (window.matchMedia(query.media).matches) {
        for (const property in query.styles) {
          blogPosts.style[property] = query.styles[property];
        }
      }
    });
  }

  handleMediaQueries();
}

document.addEventListener('DOMContentLoaded', function() {
  applyGridStyles();
});
