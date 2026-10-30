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
