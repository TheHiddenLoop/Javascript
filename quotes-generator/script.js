const button = document.querySelector("#btn");
const result = document.querySelector(".result");
const author = document.querySelector(".author");
const loader = document.querySelector("#loader");

button.addEventListener("click", () => {
    quotesGenerator();
});

function quotesGenerator() {
    
    loader.style.display = "block";
    result.innerHTML = "";
    author.innerHTML = "";

    fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: { 'X-Api-Key': 'API-KEY' }
    })
        .then(response => response.json())
        .then(data => {
            loader.style.display = "none"; 

            const getQuote = data[0].quote;
            result.innerHTML = `"${getQuote}"`;

            const getAuthor = data[0].author;
            author.innerHTML = `— ${getAuthor}`;
            console.log(data);
            
        })
        .catch(error => {
            loader.style.display = "none";
            result.innerHTML = "Failed to load quote.";
            author.innerHTML = "";
            console.error(error);
        });
}
