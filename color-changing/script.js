const red=document.getElementById("red");
const blue=document.getElementById("blue");
const auqa=document.getElementById("auqa");
const yellow=document.getElementById("yellow");
const green=document.getElementById("green");
const jali=document.getElementById("jali");

red.addEventListener("click", () => {
    document.body.style.backgroundColor = "red";
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundSize = "auto";
});

blue.addEventListener("click", () => {
    document.body.style.backgroundColor = "blue";
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundSize = "auto";
});

auqa.addEventListener("click", () => {
    document.body.style.backgroundColor = "aqua";
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundSize = "auto";
});

yellow.addEventListener("click", () => {
    document.body.style.backgroundColor = "yellow";
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundSize = "auto";
});

green.addEventListener("click", () => {
    document.body.style.backgroundColor = "green";
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundSize = "auto";
});

jali.addEventListener("click", () => {
    document.body.style.backgroundColor = "#f5f5f5";
    document.body.style.backgroundImage = `
        linear-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.7) 1px, transparent 1px)
    `;
    document.body.style.backgroundSize = "20px 20px";
});
