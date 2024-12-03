function loadCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Remove items with zero quantity
    cart = cart.filter(item => item.quantity > 0);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElement.innerText = "0";
    } else {
        // Populate the cart items
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-3" data-id="${item.id}">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <span class="ms-3">${item.name} (x${item.quantity})</span>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-danger me-2 update-cart" data-action="decrease">
                        <i class="bi bi-dash-circle"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="btn btn-sm btn-success ms-2 update-cart" data-action="increase">
                        <i class="bi bi-plus-circle"></i>
                    </button>
                    <span class="ms-3">₹${item.quantity * item.price}</span>
                </div>
            </div>
        `).join("");

        // Calculate total price
        const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
        totalPriceElement.innerText = total;
    }
}

// Event delegation for handling button clicks (increase/decrease)
document.getElementById("cart-items")?.addEventListener("click", function(event) {
    if (event.target.closest(".update-cart")) {
        const button = event.target.closest(".update-cart");
        const cartItemDiv = button.closest("[data-id]");
        const productId = parseInt(cartItemDiv.getAttribute("data-id"));
        const action = button.getAttribute("data-action");

        updateCart(productId, action);
    }
});

function updateCart(productId, action) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemIndex = cart.findIndex(item => item.id === productId);

    if (cartItemIndex >= 0) {
        if (action === "increase") {
            cart[cartItemIndex].quantity += 1;
        } else if (action === "decrease" && cart[cartItemIndex].quantity > 1) {
            cart[cartItemIndex].quantity -= 1;
        } else if (action === "decrease" && cart[cartItemIndex].quantity === 1) {
            cart.splice(cartItemIndex, 1); // Remove item if quantity is 1 and decrease is clicked
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart(); // Reload the cart after update
}

// Confirm order button - redirect to WhatsApp in a new tab
document.getElementById("confirm-order")?.addEventListener("click", function() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Prepare order details and redirect to WhatsApp
    const orderDetails = cart.map(item => `${item.name} (x${item.quantity}) - ₹${item.quantity * item.price}`).join("\n");
    const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const message = encodeURIComponent(`Hello, I'd like to order:\n${orderDetails}\nTotal: ₹${total}`);

    // Clear the cart after order
    localStorage.setItem("cart", JSON.stringify([])); // Clear the cart

    alert("Order Confirmed! We'll contact you soon.");

    // Open WhatsApp in a new tab
    window.open(`https://wa.me/1234567890?text=${message}`, "_blank");
});

document.addEventListener("DOMContentLoaded", loadCart);
