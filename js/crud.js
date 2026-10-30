const API_URL = "https://6adea7274e88f1bba4a53c73.mockapi.io/product";

let products = [];

const productList = document.querySelector("#productList");

async function loadProducts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error(error);
    }
}

function renderProducts(list) {
    productList.innerHTML = "";

    list.forEach(product => {
        const li = document.createElement("li");
        li.textContent = `${product.name} / ${product.description} / ${product.price}`;
        productList.appendChild(li);
    });
}

loadProducts();


let productName = document.querySelector("#name");
let productDescription = document.querySelector("#description");
let productPrice = document.querySelector("#price");
let submitBtn = document.querySelector("#submitBtn");

async function addProduct() {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: productName.value.trim(),
                description: productDescription.value.trim(),
                price: productPrice.value.trim(),
                createdAt: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        productName.value = "";
        productDescription.value = "";
        productPrice.value = "";

        loadProducts();
    } catch (error) {
        console.error(error);
    }
}

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    addProduct();
});
