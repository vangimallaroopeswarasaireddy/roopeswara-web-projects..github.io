document.addEventListener("DOMContentLoaded", () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    

    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    
    const orderItemsContainer = document.getElementById("order-items");
    const totalPriceElement = document.getElementById("total-price");
    
    if (orderItemsContainer && totalPriceElement) {
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const orderItem = document.createElement("div");
            orderItem.classList.add("order-item");
            orderItem.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${itemTotal}</span>
            `;
            orderItemsContainer.appendChild(orderItem);
        });
        
        totalPriceElement.textContent = total;
    }

 
    const cardNumberInput = document.getElementById("card-number");
    if (cardNumberInput) {
        cardNumberInput.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\D/g, "");
            value = value.replace(/(\d{4})/g, "$1 ").trim();
            e.target.value = value;
        });
    }


    const expiryInput = document.getElementById("expiry");
    if (expiryInput) {
        expiryInput.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\D/g, "");
            if (value.length >= 2) {
                value = value.slice(0, 2) + "/" + value.slice(2);
            }
            e.target.value = value;
        });
    }

    
    const cvvInput = document.getElementById("cvv");
    if (cvvInput) {
        cvvInput.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/\D/g, "");
        });
    }

    
    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
        phoneInput.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/\D/g, "");
        });
    }


    const paymentForm = document.getElementById("payment-form");
    if (paymentForm) {
        paymentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
           
            const cardName = document.getElementById("card-name").value;
            const cardNumber = document.getElementById("card-number").value.replace(/\s/g, "");
            const expiry = document.getElementById("expiry").value;
            const cvv = document.getElementById("cvv").value;
            const address = document.getElementById("address").value;
            const phone = document.getElementById("phone").value;

            if (cardNumber.length !== 16) {
                alert("Please enter a valid 16-digit card number");
                return;
            }

            if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry)) {
                alert("Please enter a valid expiry date (MM/YY)");
                return;
            }

            if (cvv.length < 3 || cvv.length > 4) {
                alert("Please enter a valid CVV");
                return;
            }

            if (phone.length !== 10) {
                alert("Please enter a valid 10-digit phone number");
                return;
            }

        
            localStorage.setItem("orderDetails", JSON.stringify({
                address,
                phone
            }));

            
            const payButton = paymentForm.querySelector(".pay-button");
            payButton.disabled = true;
            payButton.textContent = "Processing...";

            setTimeout(() => {
                
                window.location.href = "confirmation.html";
            }, 2000);
        });
    }
}); 