const form = document.getElementById("generate-image-form");
const input = document.getElementById("input-value");
const result = document.getElementById("result");
const ACCESS_KEY = "API-KEY";
const loader = document.getElementById("loader");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) return showToast("Input can't be empty!");

  try {
    loader.style.display = "block";
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        query
      )}&client_id=${ACCESS_KEY}`
    );
    const data = await res.json();
    result.innerHTML = data?.urls?.regular
      ? `<img src="${data.urls.regular}" alt="${query}" style="max-width:100%"/>`
      : `${showToast("No image found.")}`;
    loader.style.display = "none";
  } catch {
    result.innerText = "Error fetching image.";
  }
});

function showToast(message) {
  toast.textContent = message;
  toast.style.opacity = 1;
  toast.style.top = "50px";
  setTimeout(() => {
    toast.style.opacity = 0;
    toast.style.top = "30px";
  }, 3000);
}
