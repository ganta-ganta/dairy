
// Function to load order history
function loadOrderHistory() {
    const orderHistoryContainer = document.getElementById("order-history");

    orderHistoryData.forEach(order => {
        let orderTotal = 0;
        let orderItemsHtml = '';

        // Loop through each item in the order
        order.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            orderTotal += itemTotal;
            orderItemsHtml += `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${item.image}" class="card-img-top" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">Price: ₹${item.price}</p>
                            <p class="card-text">Quantity: ${item.quantity}</p>
                            <p class="card-text">Total: ₹${itemTotal}</p>
                        </div>
                    </div>
                </div>
            `;
        });

        const orderHtml = `
            <div class="order-card mb-5">
                <h4>Order ID: ${order.orderId}</h4>
                <p><strong>Date:</strong> ${order.date}</p>
                <div class="row">
                    ${orderItemsHtml}
                </div>
                <h5>Total: ₹${orderTotal}</h5>
            </div>
        `;

        orderHistoryContainer.innerHTML += orderHtml;
    });
}

// Call the function to load order history on page load
document.addEventListener("DOMContentLoaded", loadOrderHistory);
