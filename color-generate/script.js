const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", getColor);

function getColor() {
    const randomNum = Math.floor(Math.random() * 16777215);
    const hexCode = "#" + randomNum.toString(16).padStart(6, "0"); 
    document.body.style.backgroundColor = hexCode;
    color.textContent = hexCode;
}

getColor();
