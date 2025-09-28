/**
 * AI Engineer Homepage Interactive Features
 * Provides modern animations and user interactions for the homepage
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all homepage features
  initScrollAnimations();
  initTypingEffect();
  initParallaxEffects();
  initSkillAnimations();
  initFloatingElements();
  initSmoothScrolling();
  initPerformanceOptimizations();
});

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(`
    .spec-card, 
    .project-card, 
    .blog-card, 
    .timeline-item,
    .course-card
  `);

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered animation delay
        setTimeout(() => {
          entry.target.classList.add('fade-in', 'animate');
        }, index * 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

/**
 * Dynamic typing effect for hero subtitle
 */
function initTypingEffect() {
  const typeElement = document.querySelector('.role-title');
  if (!typeElement) return;

  const roles = [
    'AI Engineer',
    'Machine Learning Researcher',
    'Mathematical Modeler',
    'Deep Learning Specialist',
    'Computer Vision Expert',
    'Teaching Assistant'
  ];

  let currentRole = 0;
  let currentChar = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const current = roles[currentRole];
    
    if (isDeleting) {
      typeElement.textContent = current.substring(0, currentChar - 1);
      currentChar--;
      typeSpeed = 50;
    } else {
      typeElement.textContent = current.substring(0, currentChar + 1);
      currentChar++;
      typeSpeed = 100;
    }

    // Add cursor effect
    typeElement.style.borderRight = '2px solid var(--ai-primary)';
    
    if (!isDeleting && currentChar === current.length) {
      // Pause at end of word
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
      isDeleting = false;
      currentRole = (currentRole + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Start typing effect
  setTimeout(typeEffect, 1000);
}

/**
 * Parallax scrolling effects
 */
function initParallaxEffects() {
  const parallaxElements = {
    '.hero-section': 0.5,
    '.floating-elements': 0.3,
    '.profile-ring': 0.2
  };

  let ticking = false;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    
    Object.entries(parallaxElements).forEach(([selector, speed]) => {
      const element = document.querySelector(selector);
      if (element) {
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      }
    });
    
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  // Only apply parallax on desktop to avoid performance issues
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', requestTick, { passive: true });
  }
}

/**
 * Enhanced floating elements with mouse interaction
 */
function initFloatingElements() {
  const floatingContainer = document.querySelector('.floating-elements');
  const floatingItems = document.querySelectorAll('.floating-item');
  
  if (!floatingContainer || floatingItems.length === 0) return;

  // Mouse movement interaction
  document.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const moveX = (clientX - centerX) * 0.01;
    const moveY = (clientY - centerY) * 0.01;

    floatingItems.forEach((item, index) => {
      const multiplier = (index + 1) * 0.5;
      const x = moveX * multiplier;
      const y = moveY * multiplier;
      
      item.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Random floating animation
  floatingItems.forEach((item, index) => {
    const animateFloat = () => {
      const randomX = (Math.random() - 0.5) * 20;
      const randomY = (Math.random() - 0.5) * 20;
      const duration = 3000 + Math.random() * 2000;
      
      item.style.transition = `transform ${duration}ms ease-in-out`;
      item.style.transform = `translate(${randomX}px, ${randomY}px)`;
      
      setTimeout(animateFloat, duration);
    };
    
    // Stagger the initial animation
    setTimeout(animateFloat, index * 500);
  });
}

/**
 * Skill level animations
 */
function initSkillAnimations() {
  const skillCards = document.querySelectorAll('.spec-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        
        // Add pulse animation to skill level indicators
        const levelIndicator = card.querySelector('.spec-level');
        if (levelIndicator) {
          levelIndicator.style.animation = 'ai-pulse 2s ease-in-out';
        }
        
        // Animate tool tags with stagger
        const toolTags = card.querySelectorAll('.tool-tag');
        toolTags.forEach((tag, index) => {
          setTimeout(() => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            tag.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            setTimeout(() => {
              tag.style.opacity = '1';
              tag.style.transform = 'translateY(0)';
            }, 50);
          }, index * 100);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillCards.forEach(card => observer.observe(card));
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Performance optimizations
 */
function initPerformanceOptimizations() {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Preload critical resources
  const criticalResources = [
    '/assets/images/profile.jpg',
    '/assets/css/ai-homepage.css'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.includes('.css') ? 'style' : 'image';
    document.head.appendChild(link);
  });
}

/**
 * Advanced interaction effects
 */

// Card hover effects with 3D transforms
document.querySelectorAll('.spec-card, .project-card, .blog-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'transform 0.3s ease';
  });
  
  card.addEventListener('mousemove', function(e) {
    if (window.innerWidth <= 768) return;
    
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// Glitch effect for AI-themed elements
function createGlitchEffect(element) {
  const originalText = element.textContent;
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  let iterations = 0;
  const maxIterations = 10;
  
  const glitchInterval = setInterval(() => {
    element.textContent = originalText
      .split('')
      .map((char, index) => {
        if (index < iterations) {
          return originalText[index];
        }
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      })
      .join('');
    
    iterations += 1/3;
    
    if (iterations >= maxIterations) {
      element.textContent = originalText;
      clearInterval(glitchInterval);
    }
  }, 30);
}

// Apply glitch effect to AI-themed titles on hover
document.querySelectorAll('.hero-title, .section-title').forEach(title => {
  title.addEventListener('mouseenter', () => createGlitchEffect(title));
});

// Neural network animation for background
function createNeuralNetworkBackground() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.1';
  
  document.body.appendChild(canvas);
  
  let animationId;
  const nodes = [];
  const connections = [];
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function createNodes() {
    nodes.length = 0;
    const nodeCount = Math.floor((canvas.width * canvas.height) / 15000);
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update nodes
    nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;
      
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      
      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#2563eb';
      ctx.fill();
    });
    
    // Draw connections
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Initialize
  resizeCanvas();
  createNodes();
  animate();
  
  // Handle resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    createNodes();
  });
  
  // Cleanup function
  return () => {
    cancelAnimationFrame(animationId);
    document.body.removeChild(canvas);
  };
}

// Initialize neural network background on desktop only
if (window.innerWidth > 1024) {
  createNeuralNetworkBackground();
}

// Enhanced button interactions
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    // Ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple CSS
const rippleCSS = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

/**
 * Error handling and fallbacks
 */
window.addEventListener('error', function(e) {
  console.warn('Homepage script error:', e.error);
});

// Reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable animations for users who prefer reduced motion
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(style);
}
