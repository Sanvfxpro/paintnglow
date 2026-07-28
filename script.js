const products = [
  {
    id: 1,
    name: "Rainbow Star Painting Kit",
    category: "mould",
    categoryLabel: "Paintable mould",
    age: "Ages 3–5",
    price: 349,
    originalPrice: 399,
    rating: 4.9,
    reviews: 126,
    emoji: "⭐",
    badge: "Bestseller",
    gradient: "linear-gradient(145deg,#fff2a8,#ffd95c)",
    description: "A cheerful star mould with paints, brush and a guided colour card.",
    highlights: ["Child-safe colours", "1 pre-cast star mould", "Brush and colour guide included"]
  },
  {
    id: 2,
    name: "Little Safari Friends",
    category: "bundle",
    categoryLabel: "Gift bundle",
    age: "Ages 3–5",
    price: 799,
    originalPrice: 899,
    rating: 4.8,
    reviews: 94,
    emoji: "🦁",
    badge: "Great value",
    gradient: "linear-gradient(145deg,#e8f6c5,#c7e984)",
    description: "Three animal moulds, six colours and a keepsake activity card.",
    highlights: ["3 safari moulds", "6 washable colours", "Gift-ready packaging"]
  },
  {
    id: 3,
    name: "My First Tracing Book",
    category: "book",
    categoryLabel: "Drawing book",
    age: "Ages 2–4",
    price: 249,
    originalPrice: null,
    rating: 4.7,
    reviews: 78,
    emoji: "✏️",
    badge: "Early learner",
    gradient: "linear-gradient(145deg,#dceeff,#a9d5ff)",
    description: "Simple lines, curves and shapes created for short daily practice.",
    highlights: ["Thick child-friendly pages", "Large traceable shapes", "Progressive difficulty"]
  },
  {
    id: 4,
    name: "Dino Buddy Painting Kit",
    category: "mould",
    categoryLabel: "Paintable mould",
    age: "Ages 3–5",
    price: 399,
    originalPrice: 449,
    rating: 4.9,
    reviews: 112,
    emoji: "🦕",
    badge: "New",
    gradient: "linear-gradient(145deg,#e4dafc,#c1a5f6)",
    description: "A friendly dinosaur mould with bright colours and an easy-grip brush.",
    highlights: ["Rounded child-safe mould", "5 non-toxic colours", "Easy-grip brush"]
  },
  {
    id: 5,
    name: "Colour, Count & Match",
    category: "book",
    categoryLabel: "Activity book",
    age: "Ages 3–5",
    price: 299,
    originalPrice: 349,
    rating: 4.6,
    reviews: 61,
    emoji: "🔢",
    badge: "Skill builder",
    gradient: "linear-gradient(145deg,#ffe1ed,#ffb8d2)",
    description: "A gentle introduction to numbers, colour matching and simple patterns.",
    highlights: ["25 guided activities", "Big visual prompts", "Parent tips included"]
  },
  {
    id: 6,
    name: "Ocean Adventure Set",
    category: "bundle",
    categoryLabel: "Creative bundle",
    age: "Ages 3–5",
    price: 699,
    originalPrice: 799,
    rating: 4.8,
    reviews: 83,
    emoji: "🐳",
    badge: "Family favourite",
    gradient: "linear-gradient(145deg,#d8f6ff,#8edbf0)",
    description: "Two sea-creature moulds plus an ocean-themed colouring booklet.",
    highlights: ["2 pre-cast moulds", "Mini colouring book", "6 washable colours"]
  },
  {
    id: 7,
    name: "Happy Cloud Painting Kit",
    category: "mould",
    categoryLabel: "Paintable mould",
    age: "Ages 2–5",
    price: 329,
    originalPrice: null,
    rating: 4.7,
    reviews: 55,
    emoji: "☁️",
    badge: "Easy start",
    gradient: "linear-gradient(145deg,#eef4ff,#d8dcff)",
    description: "A simple rounded mould ideal for first-time brush practice.",
    highlights: ["Beginner-friendly shape", "4 soft-tone colours", "Quick 20-minute activity"]
  },
  {
    id: 8,
    name: "Big Shapes Drawing Book",
    category: "book",
    categoryLabel: "Drawing book",
    age: "Ages 2–4",
    price: 229,
    originalPrice: 269,
    rating: 4.5,
    reviews: 47,
    emoji: "🔺",
    badge: "Simple & clear",
    gradient: "linear-gradient(145deg,#fff1c3,#ffd98a)",
    description: "Large shapes and playful objects with plenty of room to colour.",
    highlights: ["Extra-large outlines", "30 activity pages", "Crayon-friendly paper"]
  }
];

const state = {
  cart: JSON.parse(localStorage.getItem("paintGlowCart") || "[]"),
  filter: "all",
  search: "",
  sort: "featured",
  checkoutStep: 1,
  customer: {}
};

const els = {
  productGrid: document.querySelector("#productGrid"),
  cartCount: document.querySelector("#cartCount"),
  cartDrawer: document.querySelector("#cartDrawer"),
  cartItems: document.querySelector("#cartItems"),
  cartEmpty: document.querySelector("#cartEmpty"),
  cartSummary: document.querySelector("#cartSummary"),
  cartSubtotal: document.querySelector("#cartSubtotal"),
  deliveryCost: document.querySelector("#deliveryCost"),
  productModal: document.querySelector("#productModal"),
  productModalContent: document.querySelector("#productModalContent"),
  demoModal: document.querySelector("#demoModal"),
  checkout: document.querySelector("#checkout"),
  checkoutItems: document.querySelector("#checkoutItems"),
  checkoutSubtotal: document.querySelector("#checkoutSubtotal"),
  checkoutDelivery: document.querySelector("#checkoutDelivery"),
  checkoutTotal: document.querySelector("#checkoutTotal"),
  checkoutStepContent: document.querySelector("#checkoutStepContent"),
  checkoutProgress: document.querySelectorAll(".checkout-progress span"),
  toast: document.querySelector("#toast")
};

function money(value) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

function saveCart() {
  localStorage.setItem("paintGlowCart", JSON.stringify(state.cart));
}

function filteredProducts() {
  let list = [...products];
  if (state.filter !== "all") list = list.filter(product => product.category === state.filter);
  if (state.search) {
    const term = state.search.toLowerCase();
    list = list.filter(product => `${product.name} ${product.categoryLabel} ${product.description}`.toLowerCase().includes(term));
  }
  if (state.sort === "price-low") list.sort((a, b) => a.price - b.price);
  if (state.sort === "price-high") list.sort((a, b) => b.price - a.price);
  if (state.sort === "rating") list.sort((a, b) => b.rating - a.rating);
  return list;
}

function renderProducts() {
  const list = filteredProducts();
  if (!list.length) {
    els.productGrid.innerHTML = `<div class="no-results"><span style="font-size:2.4rem">🔎</span><h3>No products found</h3><p>Try another search or category.</p></div>`;
    return;
  }

  els.productGrid.innerHTML = list.map(product => {
    const inCart = state.cart.some(item => item.id === product.id);
    return `
      <article class="product-card">
        <div class="product-art" style="background:${product.gradient}">
          <span class="product-badge">${product.badge}</span>
          <button class="product-wishlist" type="button" aria-label="Save ${product.name}" data-wishlist="${product.id}">♡</button>
          <button class="product-emoji" style="border:0;background:transparent;cursor:pointer" type="button" data-view-product="${product.id}" aria-label="View ${product.name}">${product.emoji}</button>
        </div>
        <div class="product-body">
          <div class="product-meta"><span>${product.categoryLabel}</span><span class="product-rating">★ ${product.rating} (${product.reviews})</span></div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-footer">
            <div class="product-price"><strong>${money(product.price)}</strong>${product.originalPrice ? `<s>${money(product.originalPrice)}</s>` : ""}</div>
            <button class="add-button ${inCart ? "added" : ""}" type="button" data-add-product="${product.id}">${inCart ? "Added ✓" : "Add to cart"}</button>
          </div>
        </div>
      </article>`;
  }).join("");
}

function cartDetails() {
  return state.cart.map(item => ({ ...products.find(product => product.id === item.id), quantity: item.quantity }));
}

function subtotal() {
  return cartDetails().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function delivery() {
  const total = subtotal();
  return total === 0 || total >= 799 ? 0 : 79;
}

function cartQuantity() {
  return state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(id, quantity = 1) {
  const existing = state.cart.find(item => item.id === id);
  if (existing) existing.quantity += quantity;
  else state.cart.push({ id, quantity });
  saveCart();
  renderProducts();
  renderCart();
  showToast(`${products.find(product => product.id === id).name} added to cart`);
}

function updateQuantity(id, change) {
  const item = state.cart.find(entry => entry.id === id);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) state.cart = state.cart.filter(entry => entry.id !== id);
  saveCart();
  renderProducts();
  renderCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);
  saveCart();
  renderProducts();
  renderCart();
  showToast("Item removed from cart");
}

function renderCart() {
  const details = cartDetails();
  els.cartCount.textContent = cartQuantity();
  els.cartItems.innerHTML = details.map(item => `
    <article class="cart-item">
      <div class="cart-item-art" style="background:${item.gradient}">${item.emoji}</div>
      <div class="cart-item-copy"><strong>${item.name}</strong><small>${money(item.price)}</small><div class="quantity-control"><button type="button" data-qty="-1" data-id="${item.id}" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button type="button" data-qty="1" data-id="${item.id}" aria-label="Increase quantity">+</button></div></div>
      <button class="remove-item" type="button" data-remove="${item.id}" aria-label="Remove ${item.name}">Remove</button>
    </article>`).join("");

  const isEmpty = details.length === 0;
  els.cartItems.style.display = isEmpty ? "none" : "grid";
  els.cartEmpty.style.display = isEmpty ? "grid" : "none";
  els.cartSummary.style.display = isEmpty ? "none" : "block";
  els.cartSubtotal.textContent = money(subtotal());
  els.deliveryCost.textContent = delivery() ? money(delivery()) : "Free";
  renderCheckoutSummary();
}

function openCart() {
  els.cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
}
function closeCart() {
  els.cartDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
}

function openModal(modal) {
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
}
function closeModal(modal) {
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
}

function openProduct(id) {
  const product = products.find(item => item.id === id);
  els.productModalContent.innerHTML = `
    <div class="product-modal-grid">
      <div class="product-modal-art" style="background:${product.gradient}">${product.emoji}</div>
      <div class="product-modal-copy">
        <span class="eyebrow">${product.categoryLabel} · ${product.age}</span>
        <h2 id="productModalTitle">${product.name}</h2>
        <p>${product.description}</p>
        <div class="product-modal-highlights">${product.highlights.map(item => `<span>✓ ${item}</span>`).join("")}</div>
        <div class="product-modal-actions"><strong>${money(product.price)}</strong><button class="button button-primary" type="button" data-modal-add="${product.id}">Add to cart</button></div>
      </div>
    </div>`;
  openModal(els.productModal);
}

function renderCheckoutSummary() {
  const details = cartDetails();
  els.checkoutItems.innerHTML = details.map(item => `
    <div class="checkout-item"><div class="checkout-item-art" style="background:${item.gradient}">${item.emoji}</div><div><strong>${item.name}</strong><br><small>Qty ${item.quantity}</small></div><strong>${money(item.price * item.quantity)}</strong></div>`).join("");
  els.checkoutSubtotal.textContent = money(subtotal());
  els.checkoutDelivery.textContent = delivery() ? money(delivery()) : "Free";
  els.checkoutTotal.textContent = money(subtotal() + delivery());
}

function renderCheckoutStep() {
  els.checkoutProgress.forEach((item, index) => item.classList.toggle("active", index < state.checkoutStep));
  if (state.checkoutStep === 1) {
    els.checkoutStepContent.innerHTML = document.querySelector("#detailsStepTemplate").innerHTML;
    const form = document.querySelector("#detailsForm");
    Object.entries(state.customer).forEach(([key, value]) => {
      if (form.elements[key]) form.elements[key].value = value;
    });
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      state.customer = Object.fromEntries(new FormData(form));
      state.checkoutStep = 2;
      renderCheckoutStep();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (state.checkoutStep === 2) {
    els.checkoutStepContent.innerHTML = document.querySelector("#paymentStepTemplate").innerHTML;
    document.querySelectorAll(".payment-card input").forEach(input => input.addEventListener("change", () => {
      document.querySelectorAll(".payment-card").forEach(card => card.classList.remove("active"));
      input.closest(".payment-card").classList.add("active");
      const cardFields = document.querySelectorAll("#paymentForm input");
      const cardMethod = input.value === "card";
      cardFields.forEach(field => {
        field.disabled = !cardMethod;
        field.closest("label").style.display = cardMethod ? "grid" : "none";
      });
    }));
    document.querySelector("#paymentForm").addEventListener("submit", event => {
      event.preventDefault();
      state.checkoutStep = 3;
      renderCheckoutStep();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.querySelector("#backToDetails").addEventListener("click", () => {
      state.checkoutStep = 1;
      renderCheckoutStep();
    });
  }

  if (state.checkoutStep === 3) {
    els.checkoutStepContent.innerHTML = document.querySelector("#successStepTemplate").innerHTML;
    document.querySelector("#orderNumber").textContent = `PG${Math.floor(100000 + Math.random() * 900000)}`;
    document.querySelector("#finishCheckout").addEventListener("click", () => {
      state.cart = [];
      saveCart();
      renderProducts();
      renderCart();
      state.checkoutStep = 1;
      els.checkout.setAttribute("aria-hidden", "true");
      document.body.classList.remove("locked");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function openCheckout() {
  if (!state.cart.length) return;
  closeCart();
  state.checkoutStep = 1;
  renderCheckoutSummary();
  renderCheckoutStep();
  els.checkout.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
  window.scrollTo(0, 0);
}

function closeCheckout() {
  els.checkout.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
}

let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2200);
}

function setFilter(filter) {
  state.filter = filter;
  document.querySelectorAll(".category-card").forEach(card => card.classList.toggle("active", card.dataset.filter === filter));
  renderProducts();
}

document.addEventListener("click", event => {
  const add = event.target.closest("[data-add-product]");
  const modalAdd = event.target.closest("[data-modal-add]");
  const view = event.target.closest("[data-view-product]");
  const wishlist = event.target.closest("[data-wishlist]");
  const qty = event.target.closest("[data-qty]");
  const remove = event.target.closest("[data-remove]");

  if (add) addToCart(Number(add.dataset.addProduct));
  if (modalAdd) { addToCart(Number(modalAdd.dataset.modalAdd)); closeModal(els.productModal); openCart(); }
  if (view) openProduct(Number(view.dataset.viewProduct));
  if (wishlist) {
    wishlist.classList.toggle("active");
    wishlist.textContent = wishlist.classList.contains("active") ? "♥" : "♡";
    showToast(wishlist.classList.contains("active") ? "Saved to favourites" : "Removed from favourites");
  }
  if (qty) updateQuantity(Number(qty.dataset.id), Number(qty.dataset.qty));
  if (remove) removeFromCart(Number(remove.dataset.remove));
});

document.querySelector("#openCart").addEventListener("click", openCart);
document.querySelectorAll("[data-close-cart]").forEach(el => el.addEventListener("click", closeCart));
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", () => closeModal(els.productModal)));
document.querySelector("#playDemo").addEventListener("click", () => openModal(els.demoModal));
document.querySelectorAll("[data-close-demo]").forEach(el => el.addEventListener("click", () => closeModal(els.demoModal)));
document.querySelector("#checkoutButton").addEventListener("click", openCheckout);
document.querySelector("#closeCheckout").addEventListener("click", closeCheckout);

document.querySelectorAll(".category-card").forEach(card => card.addEventListener("click", () => setFilter(card.dataset.filter)));
document.querySelectorAll("[data-footer-filter]").forEach(link => link.addEventListener("click", () => setFilter(link.dataset.footerFilter)));

document.querySelector("#productSearch").addEventListener("input", event => {
  state.search = event.target.value.trim();
  renderProducts();
});
document.querySelector("#sortProducts").addEventListener("change", event => {
  state.sort = event.target.value;
  renderProducts();
});

document.querySelector("#newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  event.target.reset();
  showToast("Welcome to the Paint & Glow club ✨");
});

const menuToggle = document.querySelector("#menuToggle");
const primaryNav = document.querySelector("#primaryNav");
menuToggle.addEventListener("click", () => {
  const open = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
primaryNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  primaryNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  if (els.cartDrawer.getAttribute("aria-hidden") === "false") closeCart();
  if (els.productModal.getAttribute("aria-hidden") === "false") closeModal(els.productModal);
  if (els.demoModal.getAttribute("aria-hidden") === "false") closeModal(els.demoModal);
  if (els.checkout.getAttribute("aria-hidden") === "false") closeCheckout();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: .15 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();
renderCart();

// Initialize Lenis for smooth scrolling
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
