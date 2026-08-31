const url = "https://fakestoreapi.com/products";

let allProducts = [];

/* RENDER PRODUCT */
function renderProducts(data) {
  let hasil = `

  <!-- CATEGORY BAR -->
  <div id="categoryBar"
       class="flex flex-wrap gap-3 px-6 mt-10 mb-8">
  </div>

  <!-- PRODUCT GRID -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-2">

  `;

  data.forEach((element) => {
    hasil += `

<div class="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full">

    <!-- IMAGE -->
    <div class="bg-white h-64 flex items-center justify-center p-6">
        <img 
          src="${element.image}" 
          class="h-44 object-contain hover:scale-105 transition duration-300"
        >
    </div>

    <!-- CONTENT -->
    <div class="p-5 flex flex-col flex-1">

        <h2 class="text-lg font-semibold text-gray-800 leading-snug h-[56px] overflow-hidden">
            ${element.title.substring(0, 45)}...
        </h2>

        <p class="text-sm text-[#748DAE] mt-2 capitalize">
            ${element.category}
        </p>

        <p class="text-2xl font-bold text-gray-900 mt-4">
            Rp ${(element.price * 16000).toLocaleString("id-ID")}
        </p>

    <div class="flex justify-center items-center gap-3 mt-6">

    <a href="detail.html?id=${element.id}"
       class="flex-1 bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-2xl text-base whitespace-nowrap flex items-center justify-center text-center">
       Detail
    </a>

    <button
      onclick="addToCart(${element.id})"
      class="bg-[#748DAE] hover:bg-[#213C51] text-white px-6 py-3 rounded-2xl text-base whitespace-nowrap">
       
      <i 
        data-feather="shopping-cart"
        class="w-6 h-6">
      </i>

    </button>

</div>

    </div>

</div>

`;
  });

  hasil += `</div>`;

  // Kalau tidak ada hasil
  if (data.length === 0) {
    hasil = `
      <div class="flex flex-col items-center justify-center py-24 text-gray-400">
        <i data-feather="search" class="w-12 h-12 mb-4 opacity-40"></i>
        <p class="text-lg">Produk tidak ditemukan</p>
      </div>
    `;
  }

  document.getElementById("produk").innerHTML = hasil;

  feather.replace();

  renderCategoryBar();
}

/* CATEGORY BAR */
function renderCategoryBar() {
  const categoryBar = document.getElementById("categoryBar");

  if (!categoryBar) return;

  /* AMBIL CATEGORY UNIK */
  const categories = [...new Set(allProducts.map((item) => item.category))];

  let categoryHTML = `

  <button
    onclick="filterCategory('all')"
    class="bg-[#213C51] text-white px-5 py-2 rounded-full hover:scale-105 transition">
    All
  </button>

  `;

  categories.forEach((category) => {
    categoryHTML += `

    <button
      onclick="filterCategory(\`${category}\`)"
      class="bg-gray-200 hover:bg-[#748DAE] hover:text-white px-5 py-2 rounded-full capitalize transition">
      ${category}
    </button>

    `;
  });

  categoryBar.innerHTML = categoryHTML;
}

/* FILTER CATEGORY */
function filterCategory(category) {
  if (category === "all") {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter((item) => item.category === category);

    renderProducts(filtered);
  }
}

/* FETCH SEMUA PRODUK */
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    allProducts = data;

    renderProducts(allProducts);

    /* SEARCH */
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();

       const filtered = allProducts.filter((p) =>
  p.title.toLowerCase().includes(query) ||
  p.category.toLowerCase() === query ||
  (p.price * 16000).toString().includes(query)
);

        renderProducts(filtered);
      });
    }
  });

/* ADD TO CART */

function addToCart(id) {

  const product = allProducts.find(item => item.id === id);

  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === id);

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1,
      selected: true
    });

  }
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert("Produk berhasil ditambahkan");
}

/* UPDATE BADGE */
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const badge = document.getElementById("cartCount");

  if (!badge) return;

  badge.textContent = total;
}

/* REMOVE ITEM */
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);

  renderCart();
}

function increaseQty(id) {
  const item = cart.find((item) => item.id === id);

  item.quantity++;

  renderCart();
}

function decreaseQty(id) {
  const item = cart.find((item) => item.id === id);

  if (item.quantity > 1) {
    item.quantity--;
  }

  renderCart();
}

document
  .getElementById("searchForm")
  .addEventListener("submit", (e) => {

    e.preventDefault();

    const query = document
      .getElementById("searchInput")
      .value
      .toLowerCase()
      .trim();

    const filtered = allProducts.filter((p) =>
     p.title.toLowerCase().includes(query) ||
    p.category.toLowerCase() === query ||
    (p.price * 16000).toString().includes(query)
    );

    renderProducts(filtered);
  });

updateCartCount();