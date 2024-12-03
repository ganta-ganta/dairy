const products = [
    { id: 1, name: "Buffalo's milk - 1-liter", price: 89, offerPrice: 79, image: "img/milk.png" },
    { id: 2, name: "Cow's Milk 1-Liter", price: 99, offerPrice: 89, image: "img/milk.png" },
    { id: 3, name: "Ghee -1-liter", price: 700, offerPrice: 650, image: "img/ghee.png" },
    { id: 4, name: "Milk-shake 1-liter", price: 60, offerPrice: 55, image: "img/milkshake.png" },
    { id: 5, name: "Ice-cream", price: 259, offerPrice: 229, image: "img/icecream.png" },
    { id: 6, name: "Vegetable Juice", price: 49, offerPrice: 29, image: "img/juice.png" },
];

function loadProducts() {
    const productList = document.getElementById("product-list");
    const cartCount = document.getElementById("cart-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.innerText = getCartTotalQuantity(cart); // Update cart count
    productList.innerHTML = "";

    products.forEach((product) => {
        const cartItem = cart.find((item) => item.id === product.id); // Check if product is in the cart
        const quantity = cartItem ? cartItem.quantity : 0; // Get the quantity in the cart
        const isBulkOrder = quantity >= 5;
        
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Price: ₹${product.price}</p>
                        <div class="d-flex align-items-center">
                            ${
                                quantity === 0
                                    ? `<button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>`
                                    : ` 
                                        <button class="btn btn-danger btn-sm me-2 update-cart" data-id="${product.id}" data-action="decrease">-</button>
                                        <span>${quantity}</span>
                                        <button class="btn btn-success btn-sm ms-2 update-cart" data-id="${product.id}" data-action="increase" ${isBulkOrder ? 'disabled' : ''}>+</button>
                                    `
                            }
                            ${isBulkOrder ? `<button class="btn btn-warning ms-2" onclick="handleBulkOrder(${product.id})">Bulk Order</button>` : ''}
                        </div>
                    </div>
                </div>
            </div>`;
        productList.innerHTML += card;
    });

    document.querySelectorAll(".add-to-cart").forEach(button =>
        button.addEventListener("click", addToCart)
    );

    document.querySelectorAll(".update-cart").forEach(button =>
        button.addEventListener("click", updateCart)
    );
}

function addToCart(event) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find((p) => p.id === productId);

    // Check if product is already in the cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        // If product exists, increase its quantity
        existingItem.quantity += 1;
    } else {
        // If product doesn't exist, add it to the cart
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cart-count").innerText = getCartTotalQuantity(cart); // Update cart count
    loadProducts(); // Reload product list to update UI
}

function updateCart(event) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    const action = event.target.getAttribute("data-action");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemIndex = cart.findIndex((item) => item.id === productId);

    if (cartItemIndex >= 0) {
        if (action === "increase") {
            if (cart[cartItemIndex].quantity < 5) {
                cart[cartItemIndex].quantity += 1;
            } else {
                alert("You can only purchase up to 5 items. For bulk orders, please click on 'Bulk Order'.");
                return; // Don't update the cart if limit is exceeded
            }
        } else if (action === "decrease") {
            cart[cartItemIndex].quantity -= 1;
            if (cart[cartItemIndex].quantity === 0) {
                cart.splice(cartItemIndex, 1); // Remove item if quantity is 0
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        document.getElementById("cart-count").innerText = getCartTotalQuantity(cart); // Update cart count
        loadProducts(); // Reload product list to update UI
    }
}

function getCartTotalQuantity(cart) {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function handleBulkOrder(productId) {
    alert(`You are now being redirected to the bulk order page for product ID: ${productId}.`);
    // You can redirect to a separate bulk order form or page here
    // window.location.href = `/bulk-order?productId=${productId}`;
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});
