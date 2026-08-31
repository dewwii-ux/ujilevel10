const url = "https://fakestoreapi.com/products";

let allProducts = [];
const api =
  "https://jnrdbvjqlpjnadcwosle.supabase.co/rest/v1/products?select=*";

async function getProducts() {
  const response = await fetch(url);
  const data = await response.json();

  allProducts = data;

  renderProducts(allProducts.slice(0, 8));
}

function renderProducts(data) {
  const categories = [
    "all",
    ...new Set(allProducts.map((item) => item.category)),
  ];

  let hasil = `

  <!-- CATEGORY BAR -->
  <div class="flex flex-wrap gap-3 px-10 mt-10 mb-8">

    ${categories
      .map(
        (category) => `

      <button
        onclick="filterCategory(\`${category}\`)"
        class="px-5 py-2 rounded-2xl bg-gray-200 hover:bg-[#748DAE] hover:text-white transition capitalize">

        ${category}

      </button>

    `,
      )
      .join("")}

  </div>

  <!-- PRODUCT GRID -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-8 px-10 mt-10">

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
    </div>

</div>

`;
  });

  hasil += `</div>`;

  if (data.length === 0) {
    hasil = `
      <div class="flex flex-col items-center justify-center py-24 text-gray-400">
        <i data-feather="search" class="w-12 h-12 mb-4 opacity-40"></i>
        <p class="text-lg">Produk tidak ditemukan</p>
      </div>
    `;
  }
  const bannerProducts = data.slice(0, 3);

let banner = "";

bannerProducts.forEach((item) => {
  banner += `
  
  <div class="h-[250px] bg-white flex items-center justify-center">
    <img src="${item.image}" class="max-h-[200px] object-cointain hover:scale-105 transition duration-500">
  </div>

  `;
});

document.getElementById("furnitureBanner").innerHTML = banner;
  document.getElementById("bestSeller").innerHTML = hasil;

  feather.replace();
}

/* FILTER CATEGORY */
function filterCategory(category) {
  if (category === "all") {
    renderProducts(allProducts);
  } else {
    const filteredProducts = allProducts.filter(
      (item) => item.category === category,
    );

    renderProducts(filteredProducts);
  }
}

/* INIT */
getProducts();
updateCartBadge();
