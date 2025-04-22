// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 导航栏菜单切换
  const menuToggle = document.querySelector('.navbar__toggle');
  const mainMenu = document.querySelector('#main-menu');
  
  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      mainMenu.classList.toggle('navbar__menu--open');
    });
  }
  
  // 滚动时导航栏效果
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  
  if (navbar) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // 添加背景色和阴影
      if (scrollTop > 50) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
      
      lastScrollTop = scrollTop;
    });
  }
  
  // 播放器控制
  const playerToggle = document.querySelector('.player__toggle');
  const player = document.querySelector('.player');
  const playButton = document.querySelector('.audio-controls__button--primary');
  
  if (playerToggle && player) {
    playerToggle.addEventListener('click', function() {
      player.classList.toggle('player--minimized');
      const isMinimized = player.classList.contains('player--minimized');
      
      // 更新切换按钮图标
      const toggleIcon = playerToggle.querySelector('i');
      if (toggleIcon) {
        toggleIcon.className = isMinimized ? 'bi bi-chevron-up' : 'bi bi-chevron-down';
      }
    });
  }
  
  if (playButton) {
    playButton.addEventListener('click', function() {
      const isPlaying = this.getAttribute('aria-label') === '暂停';
      
      // 更新播放按钮图标和标签
      const playIcon = this.querySelector('i');
      if (isPlaying) {
        this.setAttribute('aria-label', '播放');
        if (playIcon) playIcon.className = 'bi bi-play-fill';
      } else {
        this.setAttribute('aria-label', '暂停');
        if (playIcon) playIcon.className = 'bi bi-pause-fill';
      }
      
      // TODO: 实际的音频播放控制逻辑
    });
  }
  
  // 进度条交互
  const progressBar = document.querySelector('.player__progress');
  
  if (progressBar) {
    progressBar.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const progressFill = this.querySelector('.player__progress-bar');
      
      if (progressFill) {
        progressFill.style.width = `${percent * 100}%`;
      }
      
      // TODO: 更新音频播放位置
    });
  }
  
  // 回到顶部按钮
  const backToTopButton = document.querySelector('#back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // 图片懒加载
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  } else {
    // 降级方案
    lazyImages.forEach(function(img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
  
  // 暗色模式切换
  const darkModeToggle = document.querySelector('#dark-mode-toggle');
  
  if (darkModeToggle) {
    // 检查用户偏好
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
      document.documentElement.classList.add('dark-mode');
      darkModeToggle.setAttribute('aria-checked', 'true');
    }
    
    darkModeToggle.addEventListener('click', function() {
      const isDarkMode = document.documentElement.classList.toggle('dark-mode');
      this.setAttribute('aria-checked', isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
  }
  
  // 添加视差滚动效果
  window.addEventListener('scroll', function() {
    const scrollItems = document.querySelectorAll('.parallax-item');
    const scrollPosition = window.pageYOffset;
    
    scrollItems.forEach(function(item) {
      const speed = parseFloat(item.dataset.speed) || 0.5;
      item.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  });
  
  // 叙事式滚动动画
  if ('IntersectionObserver' in window) {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const animationObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          animationObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(function(element) {
      animationObserver.observe(element);
    });
  }
  
  // 为移动设备启用触摸手势
  if ('ontouchstart' in window) {
    document.documentElement.classList.add('touch-device');
    
    // 实现滑动手势
    const playerElement = document.querySelector('.player');
    
    if (playerElement) {
      let touchStartY = 0;
      let touchEndY = 0;
      
      playerElement.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });
      
      playerElement.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        
        // 检测滑动方向
        if (touchStartY - touchEndY > 50) {
          // 向上滑动，展开播放器
          player.classList.remove('player--minimized');
          playerToggle.querySelector('i').className = 'bi bi-chevron-down';
        } else if (touchEndY - touchStartY > 50) {
          // 向下滑动，收起播放器
          player.classList.add('player--minimized');
          playerToggle.querySelector('i').className = 'bi bi-chevron-up';
        }
      }, { passive: true });
    }
  }
  
  // 性能监控
  if ('performance' in window) {
    window.addEventListener('load', function() {
      // 测量关键指标
      setTimeout(function() {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        
        console.log('页面加载时间:', loadTime + 'ms');
        console.log('DOM就绪时间:', domReady + 'ms');
        
        // 检查性能是否符合要求
        if (loadTime > 2500) {
          console.warn('页面加载时间超过2.5秒，可能需要优化');
        }
      }, 0);
    });
  }
});