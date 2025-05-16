const iconMoon = document.getElementById("icon-moon");
const iconSun = document.getElementById("icon-sun");
const body = document.body;
const maped=document.getElementById("map")

function theme(){

iconMoon.addEventListener("click", () => {
  body.classList.add("dark-mode");
  iconMoon.style.display = "none";
  iconSun.style.display = "inline-block";
  maped.innerHTML="This is Dark mode";
});

iconSun.addEventListener("click", () => {
  body.classList.remove("dark-mode");
  iconSun.style.display = "none";
  iconMoon.style.display = "inline-block";
  maped.innerHTML="This is Light mode"
});

}



window.onload = theme;
