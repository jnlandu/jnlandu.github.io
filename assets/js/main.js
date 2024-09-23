document.addEventListener('DOMContentLoaded', function() {
  renderMathInElement(document.body, {
    delimiters: [
      {left: "$", right: "$", display: true},  // Block math
      {left: "\[", right: "\]", display: true},  // Block math
      {left: "$$", right: "$$", display: false},    // Inline math
      // {left: "\(", right: "\)", display: false}  // Inline math
    ]
  });

  const link = document.getElementById('style');
  const lightTheme = link.getAttribute('data-light-theme');
  const darkTheme = link.getAttribute('data-dark-theme');
  const themeToggleBtn = document.querySelector('.theme-toggle-btn');
  const themeToggleBtnIcon = themeToggleBtn.querySelector('i'); // Target the <i> inside the button

  const sunClass = ['fas', 'fa-sun', 'sun-icon'];
  const moonClass = ['fas', 'fa-moon', 'moon-icon'];

  // Default theme: dark
  link.setAttribute('href', darkTheme);
  document.body.classList.toggle('dark-mode');
  // themeToggleBtnIcon.classList.remo(...moonClass);
  themeToggleBtnIcon.classList.toggle(...sunClass);

  // Toggle theme when button is clicked
  themeToggleBtn.addEventListener('click', function() {
    const currentTheme = link.getAttribute('href');
    if (currentTheme === darkTheme) {
      // Switch to light theme
      link.setAttribute('href', lightTheme);
      document.body.classList.remove('dark-mode');
      // themeToggleBtnIcon.classList.remove(...sunClass);
      themeToggleBtnIcon.classList.toggle(...moonClass);
    } else {
      // Switch to dark theme
      link.setAttribute('href', darkTheme);
      document.body.classList.toggle('dark-mode');
      // themeToggleBtnIcon.classList.remove(...moonClass);
      themeToggleBtnIcon.classList.toggle(...sunClass);
    }
  });

  // Back to top button functionality
  const mybutton = document.getElementById("btn-back-to-top");

  // Show the button when user scrolls down 20px from the top
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";  // Show the button
    } else {
      mybutton.style.display = "none";  // Hide the button
    }
  }

  // Scroll to the top of the page when button is clicked
  mybutton.addEventListener("click", backToTop);

  function backToTop() {
    document.body.scrollTop = 0;  // For Safari
    document.documentElement.scrollTop = 0;  // For Chrome, Firefox, IE, and Opera
  }
});



document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('.site-header');
  const content = document.querySelector('.about-wrapper');

  window.addEventListener('scroll', function() {
      const navHeight = nav.offsetHeight; // Get the height of the nav
      const scrollPosition = window.scrollY; // Current scroll position

      // Adjust content opacity based on scroll position
      if (scrollPosition < navHeight) {
          // As you scroll up, show content
          content.style.opacity = 1 - (scrollPosition / navHeight);
      } else {
          // Hide content completely after nav is reached
          content.style.opacity = 0;
      }
  });
});
