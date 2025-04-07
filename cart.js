document.addEventListener("DOMContentLoaded", () => {
   
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");
    
    // Only run cart page specific code if we're on the cart page
    if (cartItemsContainer) {
        function updateCartDisplay() {
            cartItemsContainer.innerHTML = "";
            let total = 0;
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty! Start adding books.</p>';
                if (checkoutButton) checkoutButton.disabled = true;
                if (totalPriceElement) totalPriceElement.textContent = "0";
                return;
            }
            
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div>
                        <h4>${item.name}</h4>
                        <p>₹${item.price} x ${item.quantity}</p>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            
            if (totalPriceElement) totalPriceElement.textContent = total;
            if (checkoutButton) checkoutButton.disabled = false;
        }
        
      
        cartItemsContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("remove-item")) {
                const index = parseInt(event.target.getAttribute("data-index"));
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
                
                if (cartCount) {
                    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
                }
            }
        });
        
       
        if (checkoutButton) {
            checkoutButton.addEventListener("click", () => {
                window.location.href = "payment.html";
            });
        }
        
        updateCartDisplay();
    }
    
   
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const itemElement = event.target.closest(".item");
                const itemName = itemElement.getAttribute("data-name");
                const itemPrice = parseFloat(itemElement.getAttribute("data-price"));
                const itemImage = itemElement.querySelector("img").src;
                
                const existingItem = cart.find(item => item.name === itemName);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({ name: itemName, price: itemPrice, quantity: 1, image: itemImage });
                }
                
                localStorage.setItem("cart", JSON.stringify(cart));
                
                if (cartCount) {
                    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
                }
                
           
                const originalText = button.textContent;
                button.textContent = "Added!";
                button.style.backgroundColor = "#4CAF50";
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = "";
                }, 1000);
            });
        });
    }
});
