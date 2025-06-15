const productContainer = document.querySelector(".product-list");
const isProductDetailPage = document.querySelector(".product-detail");
const isCartPage = document.querySelector(".cart");


if (productContainer) {
    displayProducts();
} else if (isProductDetailPage) {
    displayProductDetail();
} else if (isCartPage) {
    displayCart();
}


function displayProducts() {
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
        <div class="img-box">
            <img src = "${product.colors[0].mainImage}">
        </div>
        <h2 class="title">${product.title}</h2>
        <span class="price">${product.price}</span>
       `;
        productContainer.appendChild(productCard);

        const imgBox = productCard.querySelector(".img-box");
        imgBox.addEventListener("click", () => {
            sessionStorage.setItem("selectedProduct", JSON.stringify(product));
            window.location.href = "product-detail.html";
        });
    });
}

function displayProductDetail() {
    const productData = JSON.parse(sessionStorage.getItem("selectedProduct"));

    const titleEL = document.querySelector(".title");
    const priceEL = document.querySelector(".price");
    const descriptionEL = document.querySelector(".description");
    const mainImageContainer = document.querySelector(".main-img");
    const thumbnailContainer = document.querySelector(".thumbnail-list");
    const colorContainer = document.querySelector(".color-options");
    const sizeContainer = document.querySelector(".size-options");
    const addToCartBtn = document.querySelector("#add-cart-btn");

    let selectedColor = productData.colors[0];
    let selectedSize = selectedColor.sizes[0];

    function updateProductDisplay(colorData) {
        if (!colorData.sizes.includes(selectedSize)) {
            selectedSize = colorData.sizes[0];
        }

        mainImageContainer.innerHTML = `<img src="${colorData.mainImage}">`;

        thumbnailContainer.innerHTML = "";
        const allThumbnails = [colorData.mainImage].concat(colorData.thumbnails.slice(0, 3));
        allThumbnails.forEach(thumb => {
            const img = document.createElement("img");
            img.src = thumb;
            thumbnailContainer.appendChild(img);
            img.addEventListener("click", () => {
                mainImageContainer.innerHTML = `<img src="${thumb}">`;
            });
        });

        colorContainer.innerHTML = "";
        productData.colors.forEach(color => {
            const img = document.createElement("img");
            img.src = color.mainImage;
            if (color.name === colorData.name) img.classList.add("selected");
            colorContainer.appendChild(img);
            img.addEventListener("click", () => {
                selectedColor = color;
                updateProductDisplay(color);
            });
        });

        sizeContainer.innerHTML = "";
        colorData.sizes.forEach(size => {
            const btn = document.createElement("button");
            btn.textContent = size;
            if (size === selectedSize) btn.classList.add("selected");
            sizeContainer.appendChild(btn);
            btn.addEventListener("click", () => {
                document.querySelectorAll(".size-options button").forEach(el => el.classList.remove("selected"));
                btn.classList.add("selected");
                selectedSize = size;
            });
        });
    }

    titleEL.textContent = productData.title;
    priceEL.textContent = productData.price;
    descriptionEL.textContent = productData.description;

    updateProductDisplay(selectedColor);

    
    addToCartBtn.addEventListener("click", () => {
        addToCart(productData, selectedColor, selectedSize);
    });
}

function addToCart(product, color, size){
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item.id === product.id && item.color === color.name && item.size === size);

    if (existingItem){
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            color: color.name,
            size: size,
            image: color.mainImage,
            quantity: 1
        });
    }
    
    sessionStorage.setItem("cart", JSON.stringify(cart));

    updateCartBadge();
}

function displayCart() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    const cartTableBody = document.querySelector(".cart-table tbody");
    const subtotalEL = document.querySelector(".subtotal");
    const grandTotalEL = document.querySelector(".grand-total");

    cartTableBody.innerHTML = "";

    if (cart.length === 0) {
        cartTableBody.innerHTML = "<tr><td colspan='5'><p>Your cart is empty</p></td></tr>";
        subtotalEL.textContent = "$0";
        grandTotalEL.textContent = "$0";
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = parseFloat(item.price.replace("$", "")) * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement("tr");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <td class="product">
                <img src="${item.image}" alt="${item.title}">
                <div class="item-detail">
                    <p>${item.title}</p>
                    <div class="size-color-box">
                        <span class="size">${item.size}</span>
                        <span class="color">${item.color}</span>
                    </div>
                </div>
            </td>
            <td class="price">${item.price}</td>
            <td class="quantity"><input type="number" value="${item.quantity}" min="1" data-index="${index}"></td>
            <td class="total-price">$${itemTotal.toFixed(2)}</td>
            <td><button class="remove" data-index="${index}"><i class="ri-close-line"></i></button></td>
        `;

        cartTableBody.appendChild(cartItem);

        // Add event listener to remove button
        const removeBtn = cartItem.querySelector(".remove");
        removeBtn.addEventListener("click", () => {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            sessionStorage.setItem("cart", JSON.stringify(cart));
            displayCart(); // Refresh the cart display
            updateCartBadge();
        });

        // Add event listener to quantity input
        const quantityInput = cartItem.querySelector(".quantity input");
        quantityInput.addEventListener("change", (e) => {
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                cart[index].quantity = newQuantity;
                sessionStorage.setItem("cart", JSON.stringify(cart));
                displayCart(); // Refresh the cart display
                updateCartBadge();
            }
        });
    });

    subtotalEL.textContent = `$${subtotal.toFixed(2)}`;
    grandTotalEL.textContent = `$${subtotal.toFixed(2)}`;
}

function updateCartBadge() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.querySelector(".cart-item-count");
    
    if (badge) {
        if (cartCount > 0) {
            badge.textContent = cartCount;
            badge.style.display = "block";
        } else {
            badge.style.display = "none";
        }
    }
}

updateCartBadge();