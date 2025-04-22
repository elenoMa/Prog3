let slideIndex = 0;

function moveSlide(direction) {
  const slides = document.querySelectorAll('.carousel-slide');
  slideIndex += direction;

  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  } else if (slideIndex >= slides.length) {
    slideIndex = 0;
  }

  const newTransformValue = -slideIndex * 100;
  document.querySelector('.carousel-container').style.transform = `translateX(${newTransformValue}%)`;
}

// Optionally, auto-slide functionality:
setInterval(() => moveSlide(1), 5000); // Change slide every 5 seconds
