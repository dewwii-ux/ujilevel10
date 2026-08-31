const goRegister = document.getElementById("goRegister");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

goRegister.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

/// PINDAH FORM LOGIN
const goLogin = document.getElementById("goLogin");

goLogin.addEventListener("click", () => {
  registerForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});


/* PINDAH FORM REGISTER */
goRegister.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
});

/* LOGIN */
const loginSubmit = document.getElementById("loginSubmit");

/* INPUT LOGIN */
const loginEmail = document.getElementById("loginEmail");

const loginPassword = document.getElementById("loginPassword");

loginSubmit.addEventListener("click", () => {
  /* VALIDASI */
  if (loginEmail.value.trim() === "" || loginPassword.value.trim() === "") {
    alert("Semua form login wajib diisi!");
    return;
  }

  /* SUKSES */
  alert("Login berhasil!");

  window.location.href = "home.html";
});

/* REGISTER */
const registerSubmit = document.getElementById("registerSubmit");

const registerUsername = document.getElementById("registerUsername");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const confirmPassword = document.getElementById("confirmPassword");

registerSubmit.addEventListener("click", () => {
  if (
    registerUsername.value.trim() === "" ||
    registerEmail.value.trim() === "" ||
    registerPassword.value.trim() === "" ||
    confirmPassword.value.trim() === ""
  ) {
    alert("Semua form register wajib diisi!");
    return;
  }

  if (registerPassword.value !== confirmPassword.value) {
    alert("Password tidak cocok!");
    return;
  }

  alert("Register berhasil!");
    window.location.href = "home.html";

});