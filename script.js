const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navPanel = document.querySelector('[data-nav-panel]');
const hotspotCard = document.querySelector('[data-hotspot-card]');
const hotspots = document.querySelectorAll('.hotspot');
const revealItems = document.querySelectorAll('.reveal');

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

navToggle?.addEventListener('click', () => {
  const isOpen = navPanel.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navPanel?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navPanel.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
  revealObserver.observe(item);
});

const positionHotspotCard = (spot, index) => {
  if (!hotspotCard) return;
  hotspotCard.querySelector('span').textContent = String(index + 1).padStart(2, '0');
  hotspotCard.querySelector('h3').textContent = spot.dataset.title;
  hotspotCard.querySelector('p').textContent = spot.dataset.copy;

  if (window.innerWidth > 640) {
    hotspotCard.style.right = 'auto';
    hotspotCard.style.bottom = 'auto';
    const xStr = spot.style.getPropertyValue('--x') || spot.style.left;
    const yStr = spot.style.getPropertyValue('--y') || spot.style.top;
    const xVal = parseFloat(xStr);
    const yVal = parseFloat(yStr);

    hotspotCard.style.left = `calc(${xVal}% - 170px)`;
    if (yVal < 50) {
      hotspotCard.style.top = 'auto';
      hotspotCard.style.bottom = `calc(${100 - yVal}% + 24px)`;
    } else {
      hotspotCard.style.bottom = 'auto';
      hotspotCard.style.top = `calc(${yVal}% + 24px)`;
    }
  } else {
    hotspotCard.style.right = '';
    hotspotCard.style.bottom = '';
    hotspotCard.style.left = '';
    hotspotCard.style.top = '';
  }
  hotspotCard.classList.add('show');
};

hotspots.forEach((spot, index) => {
  spot.addEventListener('click', (e) => {
    e.stopPropagation();
    const wasActive = spot.classList.contains('active');
    
    // Deactivate all hotspots
    hotspots.forEach((item) => item.classList.remove('active'));
    
    if (wasActive) {
      hotspotCard.classList.remove('show');
    } else {
      spot.classList.add('active');
      positionHotspotCard(spot, index);
    }
  });
});

// Click outside details card or hotspots to close details
document.addEventListener('click', (e) => {
  if (!hotspotCard) return;
  const isHotspot = e.target.classList.contains('hotspot');
  const isInsideCard = hotspotCard.contains(e.target);
  
  if (!isHotspot && !isInsideCard) {
    hotspots.forEach((item) => item.classList.remove('active'));
    hotspotCard.classList.remove('show');
  }
});

// Also prevent card clicks from closing itself
hotspotCard?.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Position the initial active hotspot card on load and resize
const initActiveSpot = () => {
  hotspots.forEach((spot, index) => {
    if (spot.classList.contains('active')) {
      positionHotspotCard(spot, index);
    }
  });
};
window.addEventListener('load', initActiveSpot);
window.addEventListener('resize', initActiveSpot);

document.querySelectorAll('.faq-item').forEach((item) => {
  item.querySelector('button').addEventListener('click', () => {
    const expanded = item.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-item').forEach((other) => other.setAttribute('aria-expanded', 'false'));
    item.setAttribute('aria-expanded', String(!expanded));
  });
});

const parallaxItems = document.querySelectorAll('[data-parallax]');
let ticking = false;
const updateParallax = () => {
  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax || 0);
    const rect = item.getBoundingClientRect();
    const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
    item.style.setProperty('--parallax-y', `${offset}px`);
    item.style.transform = `translateY(${offset}px)`;
  });
  ticking = false;
};
window.addEventListener('scroll', () => {
  if (!ticking && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });

