let limit = 20;
let page = 1;
let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentSection = "home";

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setupEventListeners();
  generateProductCards();
});

function setupEventListeners() {
  document.getElementById("logoHome").addEventListener("click", (e) => {
    e.preventDefault();
    showSection("home");
  });

  document.getElementById("homeLink").addEventListener("click", (e) => {
    e.preventDefault();
    showSection("home");
  });

  document.getElementById("shopNowBtn").addEventListener("click", (e) => {
    e.preventDefault();
    showSection("products");
  });

  document.getElementById("productsLink").addEventListener("click", (e) => {
    e.preventDefault();
    showSection("products");
  });

  document.getElementById("cartIcon").addEventListener("click", () => {
    showSection("cart");
  });

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", debounce(handleSearch, 300));

  document.getElementById("prevPage").addEventListener("click", () => {
    if (page > 1) {
      page--;
      generateProductCards();
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    page++;
    generateProductCards();
  });

  document
    .getElementById("checkoutBtn")
    .addEventListener("click", handleCheckout);
}

function showSection(section) {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("products-section").classList.add("hidden");
  document.getElementById("cart-section").classList.add("hidden");

  switch (section) {
    case "home":
      document.getElementById("home").classList.remove("hidden");
      document.getElementById("searchInput").value = "";
      break;
    case "products":
      document.getElementById("products-section").classList.remove("hidden");
      if (allProducts.length === 0) {
        generateProductCards();
      }
      break;
    case "cart":
      document.getElementById("cart-section").classList.remove("hidden");
      renderCart();
      break;
  }
  currentSection = section;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function generateProductCards(productsArray = null) {
  const productsContainer = document.getElementById("products-container");
  const pageInfo = document.getElementById("pageInfo");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");

  productsContainer.innerHTML =
    '<div class="loading"><i class="fas fa-spinner fa-spin"></i><p>Loading products...</p></div>';

  try {
    if (productsArray) {
      renderCards(productsArray);
      return;
    }

    const res = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`
    );
    const data = await res.json();
    const products = data.products;

    allProducts = products;
    renderCards(products);

    // Update pagination
    pageInfo.textContent = `Page ${page}`;
    prevBtn.disabled = page === 1;
  } catch (err) {
    console.error("Failed to load products:", err);
    productsContainer.innerHTML = `
            <div class="loading">
              <i class="fas fa-exclamation-triangle"></i>
              <p>Error loading products. Please try again.</p>
            </div>
          `;
  }
}

function renderCards(products) {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = `
            <div class="loading">
              <i class="fas fa-search"></i>
              <p>No products found matching your search.</p>
            </div>
          `;
    return;
  }

  const categoryMap = {
    electronics: "Electronics",
    clothing: "Clothing",
    home: "Home & Kitchen",
    books: "Books",
    sports: "Sports & Outdoors",
    beauty: "Beauty",
    automotive: "Automotive",
    groceries: "Groceries",
  };

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card fade-in";

    const categoryDisplay = categoryMap[product.category] || product.category;
    const isInCart = cart.some((item) => item.id === product.id);

    card.innerHTML = `
            <img src="${product.thumbnail}" alt="${
      product.title
    }" class="product-image" loading="lazy">
            <div class="product-info">
              <span class="product-category">${categoryDisplay}</span>
              <h3 class="product-title">${product.title}</h3>
              <p class="product-price">$${product.price.toLocaleString(
                "en-US"
              )}</p>
              <button class="btn-add-to-cart" data-product-id="${product.id}" ${
      isInCart ? "disabled" : ""
    }>
                <i class="fas fa-${isInCart ? "check" : "shopping-cart"}"></i>
                ${isInCart ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          `;

    productsContainer.appendChild(card);

    const addToCartBtn = card.querySelector(".btn-add-to-cart");
    if (!isInCart) {
      addToCartBtn.addEventListener("click", () =>
        addToCart(product, addToCartBtn)
      );
    }
  });
}

function addToCart(product, button) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (!existingItem) {
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));

    button.disabled = true;
    button.innerHTML = '<i class="fas fa-check"></i> Added to Cart';

    updateCartCount();
    showToast("Product added to cart!", "success");
  } else {
    showToast("This item is already in your cart.", "error");
  }
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartActions = document.getElementById("cartActions");

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
              <i class="fas fa-shopping-cart"></i>
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
              <button class="btn-shop-now" onclick="showSection('products')">
                <i class="fas fa-shopping-bag"></i>
                Start Shopping
              </button>
            </div>
          `;
    cartActions.classList.add("hidden");
    return;
  }

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((product, index) => {
    total += product.price * (product.quantity || 1);

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item fade-in";

    cartItem.innerHTML = `
            <div class="cart-item-image">
              <img src="${product.thumbnail}" alt="${product.title}">
            </div>
            <div class="cart-item-details">
              <div class="cart-item-header">
                <h3 class="cart-item-title">${product.title}</h3>
                <span class="cart-item-brand">${
                  product.brand || "Generic"
                }</span>
              </div>
              <p class="cart-item-category">Category: ${product.category}</p>
              <p class="cart-item-description">${product.description}</p>
              <p class="cart-item-price">
                $${product.price.toFixed(2)} 
                ${
                  product.discountPercentage
                    ? `<span class="cart-item-discount">(${product.discountPercentage}% OFF)</span>`
                    : ""
                }
              </p>
              <p class="cart-item-rating">Rating: ${product.rating} ⭐</p>
              <p class="cart-item-stock">Availability: ${
                product.availabilityStatus || "In Stock"
              } (${product.stock} left)</p>
              <div style="margin-top: 16px; display: flex; gap: 12px;">
                <button class="btn-add-to-cart" onclick="removeFromCart(${index})">
                  <i class="fas fa-trash"></i>
                  Remove
                </button>
                <button class="btn-add-to-cart" style="background: var(--success-color);">
                  <i class="fas fa-credit-card"></i>
                  Buy Now - $${product.price.toFixed(2)}
                </button>
              </div>
            </div>
          `;

    cartItems.appendChild(cartItem);
  });

  const totalSection = document.createElement("div");
  totalSection.className = "cart-total";
  totalSection.innerHTML = `
          <div style="background: var(--card-background); padding: 24px; border-radius: 12px; box-shadow: var(--shadow-md); margin-top: 24px; text-align: center;">
            <h3 style="font-size: 24px; margin-bottom: 16px;">Cart Total: $${total.toFixed(
              2
            )}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 24px;">${
              cart.length
            } item(s) in cart</p>
          </div>
        `;
  cartItems.appendChild(totalSection);

  cartActions.classList.remove("hidden");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
  showToast("Item removed from cart", "success");

  if (currentSection === "products") {
    renderCards(allProducts);
  }
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  const count = cart.length;

  if (count > 0) {
    cartCount.textContent = count > 99 ? "99+" : count;
    cartCount.classList.remove("hidden");
  } else {
    cartCount.classList.add("hidden");
  }
}

function handleSearch() {
  const term = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  if (term === "") {
    generateProductCards();
    return;
  }

  const filtered = allProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
  );

  renderCards(filtered);
}

function handleCheckout() {
  if (cart.length === 0) {
    showToast("Your cart is empty!", "error");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  if (
    confirm(
      `Proceed to checkout?\nTotal: $${total.toFixed(2)}\nItems: ${cart.length}`
    )
  ) {
    showToast(
      "Order placed successfully! Thank you for shopping with us.",
      "success"
    );

    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();

    setTimeout(() => {
      showSection("home");
    }, 2000);
  }
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
          <i class="fas fa-${
            type === "success" ? "check-circle" : "exclamation-circle"
          }"></i>
          ${message}
        `;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.removeFromCart = removeFromCart;
window.showSection = showSection;
