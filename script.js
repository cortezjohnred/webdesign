const products = [
    { id: 1, name: "SBACH 27.5 / 1x10", price: 11990, image: "1.jpg"  },
    { id: 2, name: "SHANP 26er / 3x8", price: 4890, image: "2.jfif" },
    { id: 3, name: "GINAVT 26er / 3x7", price: 4490, image: "3.png" },
    { id: 4, name: "GINAVT 27.5 / 3x7", price: 4990, image: "4.png" },
    { id: 5, name: "MONGOOSE 26er / 3x8", price: 5490, image: "5.jpg" },
    { id: 6, name: "KAMARTE Folding FullSus 26er 3x8", price: 8990, image: "6.jfif" },
    { id: 7, name: "TRINX K036 29er / 3x8", price: 7490.00, image: "7.png" },
    { id: 8, name: "TRINX N104 27.5 / 3x7", price: 6490.00, image: "8.png" },
    { id: 9, name: "TRINX X9X203 29er / 1x11", price: 14490.00, image: "9.png" },
    { id: 10, name: "HYPEP Full Suspension 29er 3x9", price: 12900.00, image: "10.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h2>${product.name}</h2>
                <p>Price: ${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productList.appendChild(productDiv);
    });
});

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(p => p.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
}
