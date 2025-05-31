const API_KEY = "API_KEY";
const URL = "https://newsapi.org/v2/everything?q=";

const container = document.getElementById("container");
const modal = document.getElementById("articleModal");
const closeBtn = document.getElementById("closeModal");

let currentQuery = "news";
let currentPage = 1;
const pageSize = 20;
let isLoading = false;

window.onload = async () => {
    const data = await newApi(currentQuery, currentPage);
    card(data);
};

async function newApi(query, page = 1) {
    try {
        const res = await fetch(`${URL}${query}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`);
        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Fetch error:", err.message);
        return { articles: [] }; 
    }
}


function card(data, append = false) {
    if (!append) container.innerHTML = "";

    data.articles.forEach(e => {
        const artical = document.createElement("div");
        artical.className = "cards";
        artical.innerHTML = `
            <img src="${e.urlToImage || 'placeholder.svg'}" alt="news" />
            <h5>${e.title}</h5>
        `;
        
        artical.addEventListener("click", () => openModal(e));
        container.appendChild(artical);
    });
}

function openModal(article) {
    document.getElementById("modalTitle").textContent = article.title;
    document.getElementById("modalImage").src = article.urlToImage || 'news.jpg';
    document.getElementById("modalDescription").textContent = article.description || "No description available.";
    document.getElementById("modalAuthor").textContent = article.author || "Unknown Author";
    document.getElementById("modalDate").textContent = new Date(article.publishedAt).toLocaleDateString();
    document.getElementById("modalLink").href = article.url;
    
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
        closeModal();
    }
});

document.getElementById("btn").addEventListener("click", async () => {
    const query = document.getElementById("query").value;
    if (!query) {
        alert("Enter a keyword");
        return;
    }
    currentQuery = query;
    currentPage = 1;
    const data = await newApi(currentQuery, currentPage);
    card(data);
});

document.getElementById("query").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("btn").click();
    }
});

const categories = {
    sport: "sport",
    tech: "technology",
    biss: "business",
    fin: "finance",
    trend: "politics"
};

Object.keys(categories).forEach(id => {
    document.getElementById(id).addEventListener("click", async () => {
        currentQuery = categories[id];
        currentPage = 1;
        const data = await newApi(currentQuery, currentPage);
        card(data);
    });
});

window.addEventListener("scroll", async () => {
    if (isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
        isLoading = true;
        currentPage++;
        const data = await newApi(currentQuery, currentPage);
        card(data, true); 
        isLoading = false;
    }
});

