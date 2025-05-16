const btn = document.getElementById("btn");
const result = document.querySelector(".generate");
const details = document.getElementById("details");
const apiKey = "680b03a959514896b91229b6ae8cb73d"; 

btn.addEventListener("click", async () => {
    const input = document.getElementById("input").value;
    details.innerHTML = "";

    if (!input) {
        result.innerHTML = "Please enter a food name.";
        return;
    }

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${input}&number=6&apiKey=${apiKey}`);
        const data = await response.json();
        console.log(data);
        
        if (data.results.length === 0) {
            result.innerHTML = "No recipes found.";
            return;
        }

        result.innerHTML = data.results.map(recipe => `
            <div style="margin:10px; border:1px solid #ccc; padding:10px;">
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}" width="200" />
                <br />
                <button onclick="getRecipeDetails(${recipe.id})">View Details</button>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error:", error);
        result.innerHTML = "Something went wrong.";
    }
});

async function getRecipeDetails(recipeId) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
        const data = await response.json();

        const ingredients = data.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join("");
        const instructions = data.instructions || "No instructions available.";

        details.innerHTML = `
            <h2>${data.title}</h2>
            <img src="${data.image}" width="300" />
            <h3>Ingredients:</h3>
            <ul>${ingredients}</ul>
            <h3>Instructions:</h3>
            <p>${instructions}</p>
        `;

        // Scroll to details
        details.scrollIntoView({ behavior: "smooth" });

    } catch (error) {
        console.error("Error fetching details:", error);
        details.innerHTML = "Error loading recipe details.";
    }
}
