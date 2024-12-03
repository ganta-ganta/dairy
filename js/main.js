(function ($) {
    "use strict";


    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


   
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
    
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
    
        const whatsappMessage = `Hello! My name is ${name}. My email is ${email}. Here is my message: ${message}`;
        const whatsappURL = `https://wa.me/7993564948?text=${encodeURIComponent(whatsappMessage)}`;
    
        window.open(whatsappURL, '_blank');
    });
     // Sample Product Data
     const products = [
      { id: 1, name: "Buffalo's milk - 1-liter", price: 89, offerPrice: 79, image: "img/milk.png" },
      { id: 2, name: "Cow's Milk 1-Liter", price: 99, offerPrice: 89, image: "img/milk.png" },
      { id: 3, name: "Ghee -1-liter", price: 700, offerPrice: 650, image: "img/ghee.png" },
      { id: 4, name: "Milk-shake 1-liter", price: 60, offerPrice: 55, image: "img/milkshake.png" },
      { id: 5, name: "Ice-cream", price: 259, offerPrice: 229, image: "img/icecream.png" },
      { id: 6, name: "vegitable-juice", price: 49, offerPrice: 29, image: "img/juice.png" },
  ];
  
      // Load Products
      function loadProducts() {
        const productList = document.getElementById("product-list");
        productList.innerHTML = "";
        products.forEach((product) => {
          const card = `
            <div class="col-md-4 mb-4">
              <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">Price: ₹${product.price}</p>
                  <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
              </div>
            </div>`;
          productList.innerHTML += card;
        });
  
        // Add event listeners for "Add to Cart" buttons
        document.querySelectorAll(".add-to-cart").forEach(button =>
          button.addEventListener("click", addToCart)
        );
      }
  
      // Load Cart
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Update Cart Count
      function updateCartCount() {
        const cartCount = document.getElementById("cart-count");
        cartCount.innerText = cart.length;
      }
  
      // Add to Cart Functionality
      function addToCart(event) {
        const productId = parseInt(event.target.getAttribute("data-id"));
        const product = products.find((p) => p.id === productId);
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
        updateCartCount();
      }
  
      // Load Cart Items and Total Price
      function loadCart() {
        const cartItems = document.getElementById("cart-items");
        const totalPrice = document.getElementById("total-price");
        cartItems.innerHTML = "";
        let total = 0;
  
        if (cart.length === 0) {
          cartItems.innerHTML = "<p>Your cart is empty</p>";
        } else {
          cart.forEach((item, index) => {
            cartItems.innerHTML += `
              <div class="d-flex justify-content-between mb-2">
                <div>${item.name}</div>
                <div>₹${item.price}</div>
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
              </div>`;
            total += item.price;
          });
        }
        totalPrice.innerText = total;
  
        // Add event listeners for "Remove" buttons
        document.querySelectorAll(".remove-item").forEach(button =>
          button.addEventListener("click", removeFromCart)
        );
      }
  
      // Remove Item from Cart
      function removeFromCart(event) {
        const index = parseInt(event.target.getAttribute("data-index"));
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
        updateCartCount();
      }
  
      // Checkout Functionality
      function checkout() {
        if (cart.length === 0) {
          alert("Your cart is empty!");
          return;
        }
  
        const orderDetails = cart.map((item) => `${item.name} - ₹${item.price}`).join("\n");
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        const message = encodeURIComponent(`Hello, I'd like to order:\n${orderDetails}\nTotal: ₹${total}`);
  
        // Save order to local storage
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.push({ orderDetails, total, date: new Date().toLocaleString() });
        localStorage.setItem("orders", JSON.stringify(orders));
  
        // Clear Cart after Checkout
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
        updateCartCount();
  
        // Open WhatsApp with order message
        window.open(`https://wa.me/7993564948?text=${message}`);
        loadOrderHistory();
      }
  
      // Load Order History
      function loadOrderHistory() {
        const orderHistory = document.getElementById("order-history");
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
  
        if (orders.length === 0) {
          orderHistory.innerHTML = "<p>No past orders found.</p>";
        } else {
          orderHistory.innerHTML = orders.map(order => `
            <div class="mb-3">
              <p><strong>Order Date:</strong> ${order.date}</p>
              <p>${order.orderDetails.replace(/\n/g, "<br>")}</p>
              <p><strong>Total:</strong> ₹${order.total}</p>
              <hr>
            </div>`).join("");
        }
      }
 
     
    


 
  


  
      // Initialize Page
      document.getElementById("checkout-btn").addEventListener("click", checkout);
      loadProducts();
      loadCart();
      updateCartCount();
      loadOrderHistory();
    

    
})(jQuery);

window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  preloader.classList.add('hidden');
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500); // Delay to match fade-out effect
});

