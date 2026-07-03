/**
 * Scapes User Landing Page
 * main.js - Core interactivity and API integration
 */

$(document).ready(function() {

  // 1. Theme Toggle Management
  const themeToggleBtn = $('#themeToggle');
  const htmlElement = $('html');
  const THEME_KEY = 'scapes-landing-theme';

  function setTheme(isDark) {
    if (isDark) {
      htmlElement.addClass('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      htmlElement.removeClass('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }

  // Check initial theme (localStorage or system preference)
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setTheme(true);
  } else {
    setTheme(false);
  }

  themeToggleBtn.on('click', function() {
    const isCurrentlyDark = htmlElement.hasClass('dark');
    setTheme(!isCurrentlyDark);
  });

  // 2. Scroll Reveal Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $(entry.target).removeClass('opacity-0 translate-y-10 translate-x-[-30px] translate-x-[30px]');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  $('.reveal-element').each(function() {
    revealObserver.observe(this);
  });

  // 3. Navbar scroll effect
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 50) {
      $('#navbar').addClass('bg-white/80 dark:bg-black/80 shadow-lg');
      $('#navbar').removeClass('mt-0 md:mt-2');
    } else {
      $('#navbar').removeClass('bg-white/80 dark:bg-black/80 shadow-lg');
      $('#navbar').addClass('mt-0 md:mt-2');
    }

    const backToTop = $('#backToTop');
    if ($(window).scrollTop() > 400) {
      backToTop.removeClass('opacity-0 pointer-events-none translate-y-4');
    } else {
      backToTop.addClass('opacity-0 pointer-events-none translate-y-4');
    }
  });

  // 4. Back to top
  $('#backToTop').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  // 5. Mobile menu toggle
  const mobileMenu = $('#mobileMenu');
  const mobileMenuToggle = $('#mobileMenuToggle');

  mobileMenuToggle.on('click', function() {
    const isOpen = mobileMenu.hasClass('open');
    mobileMenu.toggleClass('open', !isOpen);
    $('#menuIconOpen').toggleClass('hidden', !isOpen);
    $('#menuIconClose').toggleClass('hidden', isOpen);
    mobileMenuToggle.attr('aria-expanded', String(!isOpen));
  });

  mobileMenu.find('a').on('click', function() {
    mobileMenu.removeClass('open');
    $('#menuIconOpen').removeClass('hidden');
    $('#menuIconClose').addClass('hidden');
    mobileMenuToggle.attr('aria-expanded', 'false');
  });

  // 6. FAQ accordion
  $('.faq-toggle').on('click', function() {
    const item = $(this).closest('.faq-item');
    const answer = item.find('.faq-answer');
    const isOpen = item.attr('data-open') === 'true';

    if (isOpen) {
      answer.css('max-height', 0);
    } else {
      answer.css('max-height', answer.prop('scrollHeight') + 'px');
    }
    item.attr('data-open', String(!isOpen));
  });

  // 7. Background Wallpaper Carousel from API
  // Live on scapes.my.id only — cross-origin requests from any other host
  // (including this file opened locally) are blocked by the API's CORS policy,
  // so the animated gradient-mesh defined in CSS is used as the fallback.
  const API_URL = 'https://scapes.my.id/wallpapers?per_page=10&sort_by=published_at&order=desc';
  const carouselContainer = $('#hero-bg-carousel');

  async function fetchWallpapers() {
    if (carouselContainer.length === 0) return;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('API request failed');
      const result = await response.json();

      if (result.success && result.data && result.data.length > 0) {
        initCarousel(result.data);
      }
    } catch (error) {
      console.warn('Wallpaper carousel unavailable (likely CORS on this origin), using fallback background.', error);
    }
  }

  function initCarousel(wallpapers) {
    if (wallpapers.length === 0) return;

    carouselContainer.removeClass('gradient-mesh');
    let currentIndex = 0;

    // Create image elements for carousel
    const images = wallpapers.map((wp, index) => {
      const img = $('<img>', {
        src: wp.file_path, // use file_path to get the high res image
        alt: wp.title || 'Scapes Wallpaper',
        class: `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 animate-pan-image ${index === 0 ? 'opacity-50' : 'opacity-0'}`
      });
      // Insert before the gradient overlay
      carouselContainer.prepend(img);
      return img;
    });

    if (images.length > 1) {
      setInterval(() => {
        const currentImg = images[currentIndex];
        currentIndex = (currentIndex + 1) % images.length;
        const nextImg = images[currentIndex];

        currentImg.removeClass('opacity-50').addClass('opacity-0');
        nextImg.removeClass('opacity-0').addClass('opacity-50');
      }, 7000); // Change image every 7 seconds
    }
  }

  // Start fetching wallpapers
  fetchWallpapers();

});
