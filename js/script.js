
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500); // Delay to match fade-out effect
      });
    // Show the popup only once per user
window.onload = function () {
    // Check if the popup has already been shown
    if (!localStorage.getItem("popupShown")) {
      document.getElementById("welcomePopup").classList.add("active");
      // Set a flag in localStorage
      localStorage.setItem("popupShown", "true");
    }
  };
  
  // Redirect to products.html
  function exploreProducts() {
    window.location.href = "products.html";
  }
  
  // Close the popup
  function closePopup() {
    document.getElementById("welcomePopup").classList.remove("active");
  }
  