document.addEventListener("DOMContentLoaded", () => {
   
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || {};
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
  
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = "0"; 
    }

   
    const orderId = "ORD" + Date.now().toString().slice(-8);
    

    document.getElementById("order-id").textContent = orderId;
    document.getElementById("order-date").textContent = new Date().toLocaleDateString();
    document.getElementById("delivery-address").textContent = orderDetails.address || "Not provided";
    document.getElementById("phone-number").textContent = orderDetails.phone || "Not provided";

   
    const orderItemsList = document.getElementById("order-items-list");
    if (orderItemsList) {
        cart.forEach(item => {
            const orderItem = document.createElement("div");
            orderItem.classList.add("order-item");
            orderItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="order-item-img">
                <div class="order-item-details">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p>₹${item.price} x ${item.quantity}</p>
                </div>
            `;
            orderItemsList.appendChild(orderItem);
        });
    }

  
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 50; 
    const total = subtotal + shipping;

   
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("shipping").textContent = shipping.toFixed(2);
    document.getElementById("total-amount").textContent = total.toFixed(2);

   
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    orderHistory.push({
        orderId,
        date: new Date().toISOString(),
        items: cart,
        subtotal,
        shipping,
        total,
        address: orderDetails.address,
        phone: orderDetails.phone
    });
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

    
    localStorage.removeItem("cart");
    localStorage.removeItem("orderDetails");
}); 