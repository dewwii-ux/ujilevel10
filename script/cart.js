const cartContainer = document.getElementById("cartContainer");

const subtotalElement = document.getElementById("subtotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* RENDER CART buat load barang yang ada di cart*/
function renderCart() {
  cartContainer.innerHTML = "";

  let subtotal = 0;

  /* EMPTY CART misal gk ada barang yang ada di cart*/
  if (cart.length === 0) {
    cartContainer.innerHTML = `

      <div class="bg-white rounded-2xl p-10 text-center shadow">

        <h2 class="text-2xl font-bold text-heading">
          Cart Empty
        </h2>

      </div>

    `;

    subtotalElement.innerText = "Rp0";

    return;
  }

  /* LOOP ITEM */
  cart.forEach((item) => {
    if (item.selected) {
      subtotal += item.price * 16000 * item.quantity;
    }
    cartContainer.innerHTML += `

  <div class="bg-white p-5 rounded-2xl shadow flex gap-5 items-start">

    <!-- CHECKBOX -->
    <div class="flex items-center h-full pt-10">
    
      <input
        type="checkbox"
        onchange="toggleSelect(${item.id})"
        ${item.selected ? "checked" : ""}
        class="w-6 h-6 cursor-pointer accent-[#748DAE] border-2 border-[#748DAE] rounded bg-white relative z-50"
      >
    
    </div>

    <!-- IMAGE -->
    <img
      src="${item.image}"
      class="w-28 h-28 object-contain"
    >

    <div class="flex-1">

      <h2 class="font-bold text-gray-800">
        ${item.title}
      </h2>

      <p class="text-heading font-semibold mt-2">
        Rp ${(item.price * 16000).toLocaleString("id-ID")}
      </p>

      <p class="text-sm text-gray-500">
        Total: Rp ${((item.price * 16000) * item.quantity).toLocaleString("id-ID")}
      </p>

      <div class="flex items-center gap-3 mt-5">

        <!-- MINUS -->
        <button
          onclick="decreaseQty(${item.id})"
          class="w-8 h-8 rounded bg-gray-200"
        >
          -
        </button>

        <!-- QTY -->
        <span class="font-semibold">
          ${item.quantity}
        </span>

        <!-- PLUS -->
        <button
          onclick="increaseQty(${item.id})"
          class="w-8 h-8 rounded bg-gray-200"
        >
          +
        </button>

      </div>

    </div>

  </div>

  `;
  });

  subtotalElement.innerText = `Rp ${subtotal.toLocaleString("id-ID")}`;

  saveCart();
}

/* SAVE CART */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function deleteSelected() {
  cart = cart.filter((item) => !item.selected);

  saveCart();

  renderCart();
}

function checkoutSelected() {
  const selectedItems = cart.filter((item) => item.selected);

  /* BELUM PILIH */
  if (selectedItems.length === 0) {
    alert("Pilih produk terlebih dahulu");

    return;
  }

  /* SIMPAN CHECKOUT */
  localStorage.setItem("checkoutItems", JSON.stringify(selectedItems));

  window.location.href = "../view/payment.html";
}

function toggleSelect(id) {
  const item = cart.find((item) => item.id === id);

  item.selected = !item.selected;

  saveCart();

  renderCart();
}

/* CHECKOUT */
function checkout() {
  /* CEK APAKAH CART KOSONG */
  if (cart.length === 0) {
    alert("Cart masih kosong");

    return;
  }

  /* POPUP CONFIRM */
  const confirmCheckout = confirm("Apakah kamu yakin ingin checkout?");

  /* JIKA CANCEL */
  if (!confirmCheckout) {
    return;
  }

  /* HAPUS CART */
  cart = [];

  /* HAPUS LOCALSTORAGE */
  localStorage.removeItem("cart");

  /* RENDER ULANG */
  renderCart();

  /* ALERT SUKSES */
  alert("Pembayaran berhasil!");
}

/* TAMBAH QTY */
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

/* REMOVE ITEM */
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);

  renderCart();
}

renderCart();


function updateCartCount() {

  const total = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const badge = document.getElementById("cartCount");

  if (badge) {
    badge.textContent = total;
  }
}
renderCart();
updateCartCount();