document.addEventListener("DOMContentLoaded", function() {
    var lastScrollTop = 0;
    var navbar = document.querySelector(".header");
    
    window.addEventListener("scroll", function() {
      var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScroll > lastScrollTop) {
        // Scroll ke bawah
        navbar.style.transform = "translateY(-100%)";
      } else {
        // Scroll ke atas
        navbar.style.transform = "translateY(0)";
      }
      
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
  });
  