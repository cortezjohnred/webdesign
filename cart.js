document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});

function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");
            cartItemDiv.innerHTML = `
                <h2>${item.name}</h2>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)"></p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
    }
}

function updateQuantity(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart.find(p => p.id === productId);
    if (product) {
        product.quantity = parseInt(quantity, 10);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(p => p.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function showSummary() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const contact = document.getElementById("contact").value;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!name || !address || !contact) {
        alert("Please fill out all the details.");
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    const orderSummary = document.getElementById("order-summary");
    orderSummary.innerHTML = `
        <h1>Order Details</h1>
		
        <p>Name: ${name}</p>
        <p>Address: ${address}</p>
        <p>Contact Number: ${contact}</p>
        <p>Total Price: ${total.toFixed(2)}</p>
		<h3> THANK YOU FOR CHOOSING</h3>
		<h2> RED'S BIKES</h2>
    `;

    // Clear cart 
    localStorage.removeItem("cart");
    displayCart();
}
