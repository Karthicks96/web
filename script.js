
document.addEventListener('DOMContentLoaded', function() {
  // Check if profile images are loading correctly
  const profileImages = document.querySelectorAll('img[alt="Karthick S"]');
  profileImages.forEach(img => {
    img.onerror = function() {
      console.error('Profile image failed to load:', this.src);
      this.src = 'https://via.placeholder.com/150?text=Profile+Photo';
      alert('Profile image failed to load. Using placeholder instead.');
    };
    img.onload = function() {
      console.log('Profile image loaded successfully:', this.src);
    };
  });
  
  // Typewriter effect
  const typewriterText = document.getElementById('typewriter-text');
  const titles = ["IT Support Engineer", "Hardware Specialist", "System Administrator", "Network Technician"];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 200;
  let deletingDelay = 100;
  let newTitleDelay = 2000;

  function typeWriter() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      typewriterText.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = deletingDelay;
    } else {
      typewriterText.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 200;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      typingDelay = newTitleDelay;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
    }

    setTimeout(typeWriter, typingDelay);
  }

  typeWriter();

  // Sticky Header
  const header = document.querySelector('header');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
      backToTop.classList.add('active');
    } else {
      header.classList.remove('scrolled');
      backToTop.classList.remove('active');
    }
    
    // Update active menu based on scroll position
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Back to top button
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  const mobileLinks = document.querySelectorAll('.nav-links a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Animate skill bars on scroll
  const skillSection = document.querySelector('.skills');
  const progressBars = document.querySelectorAll('.progress');
  
  const animateSkills = function() {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    
    if (sectionPos < screenPos) {
      progressBars.forEach(progress => {
        const value = progress.getAttribute('data-percent');
        progress.style.width = value + '%';
      });
      window.removeEventListener('scroll', animateSkills);
    }
  };
  
  window.addEventListener('scroll', animateSkills);
  
  // Gallery Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(filterBtn => {
        filterBtn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // QR Code animation
  const qrCode = document.querySelector('.qr-code');
  if (qrCode) {
    qrCode.addEventListener('mouseover', function() {
      this.style.boxShadow = '0 15px 30px rgba(0, 102, 255, 0.4)';
    });
    
    qrCode.addEventListener('mouseout', function() {
      this.style.boxShadow = '';
    });
  }
  
  // Resume download function
  const downloadResumeBtn = document.querySelector('.download-btn');
  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', function(e) {
      // This will open the resume page in a new tab
      // The resume page has auto-print functionality
      window.open('resume.html', '_blank');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Animation on scroll
  function revealOnScroll() {
    const elements = document.querySelectorAll('.skill-category, .timeline-item, .gallery-item, .contact-card');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Add initial style for animation
  const animatedElements = document.querySelectorAll('.skill-category, .timeline-item, .gallery-item, .contact-card');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  window.addEventListener('scroll', revealOnScroll);
  
  // Run once on load
  revealOnScroll();
});
