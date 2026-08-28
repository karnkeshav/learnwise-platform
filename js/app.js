document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      // Close mobile nav if open
      const nav = document.querySelector('.nav');
      const navToggle = document.querySelector('.nav-toggle');
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        navToggle.classList.remove('active');
      }

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header height
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  navToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent actual form submission

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }

      // Simulate form submission
      console.log('Form Submitted:', { name, email, message });
      alert('Thank you for your message, ' + name + '! We will get back to you shortly.');

      // Clear the form
      contactForm.reset();
    });
  }

  // Intersection Observer for entrance animations
  const animateElements = document.querySelectorAll('.animate');
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Stop observing once element is visible to prevent re-triggering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => {
    // Check if element is already visible (e.g., in the initial viewport)
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('is-visible');
    } else {
      observer.observe(el);
    }
  });

  // Note on localStorage:
  // For this prototype, there are no dynamic lists or user-generated data
  // that require persistence. If this were a full application with features
  // like user profiles, course registrations, or custom learning paths,
  // localStorage would be used to store and retrieve that data, e.g.:
  // localStorage.setItem('userCourses', JSON.stringify(userCoursesArray));
  // const storedCourses = JSON.parse(localStorage.getItem('userCourses')) || [];
});