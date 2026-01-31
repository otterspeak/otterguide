// OtterGuide - Main JavaScript
// Theme Toggle, Navigation, and Interactive Features

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();
  
  // Theme Management
  initTheme();
  
  // Navigation
  initMobileNav();
  initSmoothScroll();
  initActiveSection();
  
  // Interactive Elements
  initFAQ();
  initRSVPDemo();
});

// ============================================
// Theme Management
// ============================================

function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or default to 'dark'
  const savedTheme = localStorage.getItem('otterguide-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  
  // Toggle theme on click
  themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('otterguide-theme', newTheme);
    
    // Re-render icons after theme change
    lucide.createIcons();
  });
}

// ============================================
// Mobile Navigation
// ============================================

function initMobileNav() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  function openMobileNav() {
    mobileNav?.classList.add('open');
    mobileNavOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMobileNav() {
    mobileNav?.classList.remove('open');
    mobileNavOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  mobileMenuBtn?.addEventListener('click', openMobileNav);
  mobileCloseBtn?.addEventListener('click', closeMobileNav);
  mobileNavOverlay?.addEventListener('click', closeMobileNav);
  
  // Close nav when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav?.classList.contains('open')) {
      closeMobileNav();
    }
  });
}

// ============================================
// Smooth Scroll
// ============================================

function initSmoothScroll() {
  // Handle all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        const headerHeight = 64; // var(--header-height)
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 32;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without scrolling
        history.pushState(null, '', href);
      }
    });
  });
}

// ============================================
// Active Section Tracking
// ============================================

function initActiveSection() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section], .toc-link[data-section]');
  
  if (sections.length === 0) return;
  
  // Create intersection observer
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        
        // Update all nav links
        navLinks.forEach(link => {
          const linkSection = link.getAttribute('data-section');
          if (linkSection === sectionId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);
  
  // Observe all sections
  sections.forEach(section => observer.observe(section));
}

// ============================================
// FAQ Accordion
// ============================================

function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    
    summary?.addEventListener('click', (e) => {
      // Allow default toggle behavior
      // Optionally close other items for accordion effect:
      // faqItems.forEach(otherItem => {
      //   if (otherItem !== item && otherItem.hasAttribute('open')) {
      //     otherItem.removeAttribute('open');
      //   }
      // });
    });
  });
}

// ============================================
// Utility Functions
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
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

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ============================================
// Search Functionality (Future Enhancement)
// ============================================

function initSearch() {
  // Placeholder for future search functionality
  // Could implement fuzzy search across documentation content
}

// ============================================
// Copy Code Blocks (Future Enhancement)
// ============================================

function initCodeCopy() {
  // Placeholder for code block copy functionality
  // Would add copy buttons to any code examples
}

// ============================================
// Analytics (Optional)
// ============================================

function trackEvent(category, action, label) {
  // Placeholder for analytics tracking
  // e.g., Google Analytics, Plausible, etc.
  if (typeof gtag === 'function') {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
}

// Track section views
function trackSectionView(sectionId) {
  trackEvent('Documentation', 'view_section', sectionId);
}

// ============================================
// Keyboard Navigation
// ============================================

document.addEventListener('keydown', (e) => {
  // Press '/' to focus search (future)
  if (e.key === '/' && !isInputFocused()) {
    e.preventDefault();
    const searchInput = document.querySelector('.search-input');
    searchInput?.focus();
  }
  
  // Press 't' to toggle theme
  if (e.key === 't' && !isInputFocused()) {
    const themeToggle = document.getElementById('themeToggle');
    themeToggle?.click();
  }
});

function isInputFocused() {
  const activeElement = document.activeElement;
  return activeElement?.tagName === 'INPUT' || 
         activeElement?.tagName === 'TEXTAREA' ||
         activeElement?.isContentEditable;
}

// ============================================
// Print Optimization
// ============================================

window.addEventListener('beforeprint', () => {
  // Expand all FAQ items before printing
  document.querySelectorAll('.faq-item').forEach(item => {
    item.setAttribute('open', '');
  });
});

window.addEventListener('afterprint', () => {
  // Restore FAQ state after printing
  document.querySelectorAll('.faq-item').forEach(item => {
    item.removeAttribute('open');
  });
});
// ============================================
// Interactive RSVP Demo
// ============================================

async function initRSVPDemo() {
  // Load word data from JSON files
  let allWords = [];
  
  try {
    const [easyResponse, mediumResponse] = await Promise.all([
      fetch('/data/demo-easy.json'),
      fetch('/data/demo-medium.json')
    ]);
    
    const easyData = await easyResponse.json();
    const mediumData = await mediumResponse.json();
    
    // Extract all words from easy paragraphs first, then medium
    easyData.paragraphs.forEach(paragraph => {
      paragraph.words.forEach(wordObj => {
        allWords.push({
          original: wordObj.original,
          focalIndex: wordObj.focal_index,
          focalChar: wordObj.focal_char
        });
      });
    });
    
    mediumData.paragraphs.forEach(paragraph => {
      paragraph.words.forEach(wordObj => {
        allWords.push({
          original: wordObj.original,
          focalIndex: wordObj.focal_index,
          focalChar: wordObj.focal_char
        });
      });
    });
    
    console.log(`Loaded ${allWords.length} words for RSVP demo`);
  } catch (error) {
    console.warn('Could not load word data, using fallback:', error);
    // Fallback word list
    const fallbackWords = ["The", "sun", "rises", "in", "the", "east", "and", "sets", "in", "the", "west"];
    allWords = fallbackWords.map(w => ({
      original: w,
      focalIndex: Math.floor(w.length * 0.3),
      focalChar: w[Math.floor(w.length * 0.3)]
    }));
  }

  // DOM Elements
  const wpmSlider = document.getElementById('wpmSlider');
  const wpmValue = document.getElementById('wpmValue');
  const colorblindSelect = document.getElementById('colorblindSelect');
  const focusToggle = document.getElementById('focusToggle');
  const rsvpWord = document.getElementById('rsvpWord');
  const progressBar = document.getElementById('progressBar');
  const currentWpmDisplay = document.getElementById('currentWpm');
  const timerDisplay = document.getElementById('timerDisplay');
  const playBtn = document.getElementById('playBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const resetBtn = document.getElementById('resetBtn');
  const expandBtn = document.getElementById('expandBtn');
  const exitBtn = document.getElementById('exitBtn');
  const rsvpContainer = document.getElementById('rsvpContainer');
  const wpmPresets = document.querySelectorAll('.wpm-preset');

  // If elements don't exist, exit early
  if (!wpmSlider || !playBtn) return;

  // State
  let startingWpm = 150;
  let currentWpm = 150;
  let currentWordIndex = 0;
  let isPlaying = false;
  let isPaused = false;
  let focusMode = true; // Default ON
  let intervalId = null;
  let timerIntervalId = null;
  let sessionDuration = 30; // 30 seconds
  let timeRemaining = 30;
  let isExpanded = false;

  // Colorblind filter values
  const colorblindFilters = {
    normal: 'none',
    protanopia: 'url(#protanopia)',
    deuteranopia: 'url(#deuteranopia)',
    tritanopia: 'url(#tritanopia)',
    achromatopsia: 'grayscale(100%)'
  };

  // Calculate delay from WPM
  function getDelayFromWpm(wpm) {
    return Math.round(60000 / wpm);
  }

  // Format time as M:SS
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Update display
  function updateDisplay() {
    currentWpmDisplay.innerHTML = `<i data-lucide="gauge" class="icon"></i> ${currentWpm} WPM`;
    timerDisplay.textContent = formatTime(timeRemaining);
    
    const progress = ((sessionDuration - timeRemaining) / sessionDuration) * 100;
    progressBar.style.width = `${progress}%`;
    
    lucide.createIcons();
  }

  // Display word with focal character highlighting from JSON data
  function displayWord(wordData) {
    if (focusMode && wordData.focalIndex !== undefined) {
      const word = wordData.original;
      const focalIndex = wordData.focalIndex;
      const before = word.substring(0, focalIndex);
      const focal = word[focalIndex] || '';
      const after = word.substring(focalIndex + 1);
      
      rsvpWord.innerHTML = `${before}<span class="focal-char">${focal}</span>${after}`;
      rsvpWord.classList.add('focus-mode');
    } else {
      rsvpWord.textContent = wordData.original;
      rsvpWord.classList.remove('focus-mode');
    }
  }

  // Play next word with increasing WPM
  function playNextWord() {
    if (timeRemaining <= 0) {
      complete();
      return;
    }

    // Get next word (will never run out with combined easy+medium)
    if (currentWordIndex >= allWords.length) {
      currentWordIndex = 0; // Loop back if somehow we exhaust all words
    }
    
    const wordData = allWords[currentWordIndex];
    displayWord(wordData);
    currentWordIndex++;
    updateDisplay();
  }

  // Increase WPM over time
  function increaseWpm() {
    // Increase WPM by ~5 every 5 seconds
    const elapsed = sessionDuration - timeRemaining;
    const wpmIncrease = Math.floor(elapsed / 5) * 5;
    currentWpm = Math.min(startingWpm + wpmIncrease, 500);
    
    // Restart interval with new speed if playing
    if (isPlaying && !isPaused) {
      clearInterval(intervalId);
      const delay = getDelayFromWpm(currentWpm);
      intervalId = setInterval(playNextWord, delay);
    }
    
    updateDisplay();
  }

  // Timer tick
  function timerTick() {
    if (timeRemaining > 0) {
      timeRemaining--;
      increaseWpm();
      updateDisplay();
    }
    
    if (timeRemaining <= 0) {
      complete();
    }
  }

  // Complete session - show "How many could you read?" with fade
  function complete() {
    stop();
    progressBar.style.width = "100%";
    
    // Add fade-out class
    rsvpWord.classList.add('fade-out');
    rsvpWord.classList.remove('focus-mode');
    
    setTimeout(() => {
      rsvpWord.textContent = "How many could you read?";
      rsvpWord.classList.remove('fade-out');
      rsvpWord.classList.add('fade-in', 'completion-message');
      
      // Remove fade-in class after animation
      setTimeout(() => {
        rsvpWord.classList.remove('fade-in');
      }, 500);
    }, 300);
  }

  // Start playback
  function play() {
    if (isPlaying && !isPaused) return;
    
    if (timeRemaining <= 0) {
      reset();
    }
    
    isPlaying = true;
    isPaused = false;
    
    playBtn.disabled = true;
    pauseBtn.disabled = false;
    
    // Play first word immediately
    playNextWord();
    
    // Set interval for words
    const delay = getDelayFromWpm(currentWpm);
    intervalId = setInterval(playNextWord, delay);
    
    // Start timer
    timerIntervalId = setInterval(timerTick, 1000);
  }

  // Pause playback
  function pause() {
    if (!isPlaying || isPaused) return;
    
    isPaused = true;
    clearInterval(intervalId);
    clearInterval(timerIntervalId);
    
    playBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  // Stop
  function stop() {
    isPlaying = false;
    isPaused = false;
    clearInterval(intervalId);
    clearInterval(timerIntervalId);
    
    playBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  // Reset to beginning
  function reset() {
    stop();
    currentWordIndex = 0;
    timeRemaining = sessionDuration;
    currentWpm = startingWpm;
    rsvpWord.textContent = "Ready";
    rsvpWord.classList.remove('focus-mode', 'fade-in', 'fade-out', 'completion-message');
    if (focusMode) {
      rsvpWord.classList.add('focus-mode');
    }
    progressBar.style.width = "0%";
    updateDisplay();
  }

  // Toggle expanded view
  function toggleExpand() {
    isExpanded = !isExpanded;
    rsvpContainer.classList.toggle('rsvp-mini', !isExpanded);
    rsvpContainer.classList.toggle('rsvp-expanded', isExpanded);
    
    expandBtn.classList.toggle('hidden', isExpanded);
    exitBtn.classList.toggle('hidden', !isExpanded);
    
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
      // Request landscape on mobile
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {});
      }
    } else {
      document.body.style.overflow = '';
      // Unlock orientation
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    }
    
    lucide.createIcons();
  }

  // Apply colorblind filter
  function applyColorblindFilter(mode) {
    const filter = colorblindFilters[mode] || 'none';
    rsvpContainer.style.filter = filter;
  }

  // Event Listeners
  wpmSlider.addEventListener('input', (e) => {
    startingWpm = parseInt(e.target.value);
    if (!isPlaying) {
      currentWpm = startingWpm;
    }
    wpmValue.textContent = startingWpm;
    
    wpmPresets.forEach(preset => {
      const presetWpm = parseInt(preset.dataset.wpm);
      preset.classList.toggle('active', presetWpm === startingWpm);
    });
    
    if (!isPlaying) {
      updateDisplay();
    }
    
    lucide.createIcons();
  });

  wpmPresets.forEach(preset => {
    preset.addEventListener('click', () => {
      const wpm = parseInt(preset.dataset.wpm);
      wpmSlider.value = wpm;
      wpmSlider.dispatchEvent(new Event('input'));
    });
  });

  colorblindSelect?.addEventListener('change', (e) => {
    applyColorblindFilter(e.target.value);
  });

  focusToggle.addEventListener('click', () => {
    focusMode = !focusMode;
    focusToggle.classList.toggle('active', focusMode);
    focusToggle.querySelector('.toggle-status').textContent = focusMode ? 'ON' : 'OFF';
    
    // Update current word display if playing
    if (isPlaying && currentWordIndex > 0) {
      const wordData = allWords[(currentWordIndex - 1) % allWords.length];
      displayWord(wordData);
    }
  });

  playBtn.addEventListener('click', play);
  pauseBtn.addEventListener('click', pause);
  resetBtn.addEventListener('click', reset);
  expandBtn?.addEventListener('click', toggleExpand);
  exitBtn?.addEventListener('click', toggleExpand);

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    const rsvpSection = document.getElementById('rsvp');
    if (!rsvpSection) return;
    
    // Allow controls when expanded or when RSVP is in view
    if (!isExpanded && !isInViewport(rsvpSection)) return;
    
    if (e.key === ' ' && !isInputFocused()) {
      e.preventDefault();
      if (isPlaying && !isPaused) {
        pause();
      } else {
        play();
      }
    }
    
    if (e.key === 'Escape' && isExpanded) {
      toggleExpand();
    }
    
    if (e.key === 'r' && !isInputFocused()) {
      reset();
    }
    
    if (e.key === 'f' && !isInputFocused()) {
      toggleExpand();
    }
  });

  // Initialize
  updateDisplay();
}