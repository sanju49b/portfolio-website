// Toggle hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  
  // Add animation to hamburger icon
  if (icon.classList.contains("open")) {
    icon.children[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
    icon.children[1].style.opacity = "0";
    icon.children[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
  } else {
    icon.children[0].style.transform = "none";
    icon.children[1].style.opacity = "1";
    icon.children[2].style.transform = "none";
  }
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Add offset for fixed header
        const headerHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  // Observe all sections for scroll animations
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
    section.classList.add('fade-in');
  });

  // Add active class to navigation link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 100) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Initialize active state
  updateActiveNavLink();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 1s ease, transform 1s ease;
  }
  
  .fade-in.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .nav-links a.active {
    color: #38b2ac;
  }
  
  .nav-links a.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);
