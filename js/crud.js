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

        let updateBtn = document.createElement("button");
        updateBtn.innerText = "수정";
        updateBtn.addEventListener("click", () => editProduct(product));
        li.appendChild(updateBtn);

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

    if (!validateProduct()) return;

    if (editingId !== null) {
        updateProduct();
        return;
    }

    addProduct();
});

function validateProduct() {
    if (productName.value.trim() === "") {
        alert("상품명을 입력하세요.");
        productName.focus();
        return false;
    }
    if (productName.value.trim().length > 30) {
        alert("상품명은 30자 이하로 입력하세요.");
        productName.focus();
        return false;
    }
    if (productDescription.value.trim() === "") {
        alert("설명을 입력하세요.");
        productDescription.focus();
        return false;
    }
    if (productPrice.value.trim() === "") {
        alert("가격을 입력하세요.");
        productPrice.focus();
        return false;
    }
    if (isNaN(productPrice.value) || Number(productPrice.value) <= 0) {
        alert("가격은 0보다 큰 숫자로 입력하세요.");
        productPrice.focus();
        return false;
    }

    return true;
}

let editingId = null;

function editProduct(product) {
    productName.value = product.name;
    productDescription.value = product.description;
    productPrice.value = product.price;

    editingId = product.id;
    submitBtn.innerText = "수정";
}

async function updateProduct() {
    try {
        const response = await fetch(`${API_URL}/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: productName.value.trim(),
                description: productDescription.value.trim(),
                price: productPrice.value.trim()
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        productName.value = "";
        productDescription.value = "";
        productPrice.value = "";

        editingId = null;
        submitBtn.innerText = "등록";

        loadProducts();
    } catch (error) {
        console.error(error);
    }
}
