const input = document.querySelector("input");
const eye = document.querySelector("#eye-icon");

eye.addEventListener("click", () => {
    if (input.type === "password") {
      input.type = "text";
      eye.classList.remove("fa-eye");
      eye.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      eye.classList.add("fa-eye");
      eye.classList.remove("fa-eye-slash");
    }

  // REFACTOR
  //input.type === "password" ? (input.type = "text") : (input.type = "password");
});


//<i class="fa-regular fa-eye-slash"></i>