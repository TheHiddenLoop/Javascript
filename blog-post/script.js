const postContainer = document.getElementById("post-container");
const loader = document.getElementById("loader");

let limit = 5;
let page = 1;

const fetchPost = async () => {
  const res = await fetch(
    `https://dummyjson.com/products?limit=5&skip=${(page - 1) * 5}`
  );
  const data = await res.json();
  return data.products;
};

function showBlogs(posts) {
  posts.forEach((post) => {
    const newPost = document.createElement("div");
    newPost.classList.add("posts");
    newPost.innerHTML = `
    <h1>${post.title}</h1>
    <img src="${post.images[0]}" alt="${post.title}">
    <p>${post.description}</p>
    `;
     postContainer.appendChild(newPost)
  });
 
}

async function loadPost() {
  loader.style.display = "block";
  const post=await fetchPost();
  showBlogs(post);
  console.log(await fetchPost());
  loader.style.display = "none";
}


window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    page++;
    loadPost();
  }
});

loadPost();
