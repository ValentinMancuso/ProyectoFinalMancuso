const abrir = document.getElementById("inicioSesion");
const form = document.getElementById("form");
const formContainer = document.getElementById("contenedorModal");

abrir.addEventListener("click", () => {
  formContainer.style.opacity = "1";
  formContainer.style.visibility = "visible";
  form.classList.remove("form-close");
});

window.addEventListener("click", (e) => {
  if (e.target === formContainer) {
    form.classList.add("form-close");
    setTimeout(() => {
      formContainer.style.opacity = "0";
      formContainer.style.visibility = "hidden";
    }, 200);
  }
});
