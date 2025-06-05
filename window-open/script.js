const container = document.getElementById("container");
const modal = document.getElementById("articleModal");
const closeBtn = document.getElementById("closeModal");
function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}
function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
}
document.getElementById("btn").addEventListener("click",()=>openModal())
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
    }
});
closeBtn.addEventListener("click", closeModal);