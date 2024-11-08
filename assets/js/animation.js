// Select all course content containers
const courseItems = document.querySelectorAll('.course-content-container');

courseItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    // Add 'no-animation' to all items when one is hovered
    courseItems.forEach(sibling => sibling.classList.add('no-animation'));
  });
  item.addEventListener('mouseleave', () => {
    // Remove 'no-animation' from all items when hover is removed
    courseItems.forEach(sibling => sibling.classList.remove('no-animation'));
  });
});
