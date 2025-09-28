

document.addEventListener('DOMContentLoaded', function() {
  // Check for saved user preference in localStorage
  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Function to toggle between dark and light mode
  function toggleTheme() {
    document.body.classList.toggle('dark-mode');

    // Save the user's preference in localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }

  // Add event listener to the toggle button
  document.querySelector('.theme-toggle-btn').addEventListener('click', toggleTheme);
});





toggleText = (element) => {
  const moreText = element.parentElement.querySelector('.more');
  if (moreText.classList.contains('d-none')) {
    moreText.classList.remove('d-none');
    element.textContent = 'Read less';
  } else {
    moreText.classList.add('d-none');
    element.textContent = 'Read more';
  }
  return false;
}