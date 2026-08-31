const paymentItems =
document.getElementById("paymentItems");

const subtotalElement =
document.getElementById("subtotal");

const totalElement =
document.getElementById("total");

/* AMBIL CART */
let cart =
JSON.parse(localStorage.getItem("checkoutItems")) || [];

renderPayment();

/* RENDER PAYMENT */
function renderPayment() {

  let subtotal = 0;

  paymentItems.innerHTML = "";

  cart.forEach((item) => {

    const itemPrice =
    (item.price * 16000) * item.quantity;

    subtotal += itemPrice;

    paymentItems.innerHTML += `

      <div class="bg-white p-5 rounded-2xl shadow flex gap-5">

        <img
          src="${item.image}"
          class="w-24 h-24 object-contain"
        >

        <div class="flex-1">

          <h2 class="font-bold text-gray-800">
            ${item.title}
          </h2>

          <p class="text-heading font-semibold mt-2">
            Rp ${(item.price * 16000).toLocaleString("id-ID")}
          </p>

          <p class="text-gray-500 mt-1">
            Qty : ${item.quantity}
          </p>

        </div>

      </div>

    `;
  });

  const shipping = 20000;

  const total =
  subtotal + shipping;

  subtotalElement.innerText =
  `Rp ${subtotal.toLocaleString("id-ID")}`;

  totalElement.innerText =
  `Rp ${total.toLocaleString("id-ID")}`;
}

/* PAY */
function payNow() {

  const paymentMethod =
  document.getElementById("paymentMethod").value;

  alert(
    `Payment Success With ${paymentMethod}`
  );

  /* AMBIL CART */
  let allCart =
  JSON.parse(localStorage.getItem("cart")) || [];

  /* AMBIL ITEM CHECKOUT */
  let checkoutItems =
  JSON.parse(localStorage.getItem("checkoutItems")) || [];

  /* HAPUS ITEM YANG SUDAH DIBAYAR */
  allCart =
  allCart.filter((item) => {

    return !checkoutItems.some(
      (checkout) => checkout.id === item.id
    );

  });

  localStorage.setItem(
    "cart",
    JSON.stringify(allCart)
  );

  localStorage.removeItem("checkoutItems");

  /* KE SUCCESS PAGE */
  window.location.href =
  "../view/success.html";
}