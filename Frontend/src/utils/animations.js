class AnimationController {
  constructor() {
    this.observers = new Map();
    this.parallaxElements = new Set();
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isInitialized = false;
    this.ticking = false;
  }

  init() {
    if (this.isInitialized) return;
    
    this.initScrollAnimations();
    this.initParallax();
    this.initScrollIndicator();
    this.isInitialized = true;
  }

  initScrollAnimations() {
    const options = {
      root: null,
      rootMargin: '-50px 0px -50px 0px',
      threshold: [0.1, 0.3, 0.6]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        
        if (entry.isIntersecting) {
          if (entry.intersectionRatio > 0.6) {
            element.classList.add('visible');
          } else if (entry.intersectionRatio > 0.3) {
            element.classList.add('visible');
            element.classList.add('partial-visible');
          } else if (entry.intersectionRatio > 0.1) {
            element.classList.add('visible');
          }
          
          observer.unobserve(element);
        }
      });
    }, options);

    document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
      observer.observe(el);
    });

    this.observers.set('scroll', observer);
  }

  initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (this.isReducedMotion || parallaxElements.length === 0) return;

    parallaxElements.forEach(element => {
      this.parallaxElements.add(element);
    });

    let lastScrollY = window.scrollY;
    const debouncedScroll = this.debounce(() => {
      const scrollY = window.scrollY;

      this.parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const yPos = -(scrollY * speed);
        
        requestAnimationFrame(() => {
          element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
      });

      lastScrollY = scrollY;
    }, 16);

    window.addEventListener('scroll', debouncedScroll, { passive: true });
  }

  initScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.style.width = '0%';
    document.body.appendChild(indicator);

    const updateIndicator = this.debounce(() => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      requestAnimationFrame(() => {
        indicator.style.transform = `scaleX(${scrolled / 100})`;
      });
    }, 16);

    window.addEventListener('scroll', updateIndicator, { passive: true });
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  staggerAnimations(parentSelector, childSelector, baseDelay = 100) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;

    const children = parent.querySelectorAll(childSelector);
    children.forEach((child, index) => {
      child.style.transitionDelay = `${baseDelay + (index * 100)}ms`;
    });
  }

  addHoverEffects() {
    document.querySelectorAll('button, .btn').forEach(button => {
      if (!button.classList.contains('btn-hover')) {
        button.classList.add('btn-hover');
      }
    });

    document.querySelectorAll('[class*="card"], [class*="Card"]').forEach(card => {
      if (!card.classList.contains('hover-card')) {
        card.classList.add('hover-card');
      }
    });

    document.querySelectorAll('img').forEach(img => {
      const wrapper = img.parentElement;
      if (!wrapper.classList.contains('hover-image')) {
        wrapper.classList.add('hover-image');
      }
    });
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.parallaxElements.clear();
    
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
      indicator.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const animationController = new AnimationController();
  
  setTimeout(() => {
    animationController.init();
    animationController.addHoverEffects();
    
    animationController.staggerAnimations('.menu-grid', '.menu-item');
    animationController.staggerAnimations('.gallery-grid', '.gallery-item');
    animationController.staggerAnimations('.feature-list', '.feature-item');
  }, 100);

  window.animationController = animationController;
});

window.addEventListener('beforeunload', () => {
  if (window.animationController) {
    window.animationController.destroy();
  }
});

export default AnimationController;