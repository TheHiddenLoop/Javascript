let btn = document.getElementById("btn");
let result = document.getElementById("result");
let data = [];

btn.addEventListener("click", () => {
    let name = document.getElementById("name").value;
    let cat = document.getElementById("cat").value;
    let amount = document.getElementById("am").value;

    if (!name || !cat || isNaN(amount) || Number(amount) <= 0) return;

    let userData = {
        id: Date.now(),
        name: name,
        category: cat,
        amount: amount,
        completed: false,
    };

    data.push(userData);

    document.getElementById("name").value = "";
    document.getElementById("cat").value = "";
    document.getElementById("am").value = "";

    renderItems();
});

function renderItems() {
    result.innerHTML = "";

    data.forEach((e) => {
        let div = document.createElement("div");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = e.completed;

        let delBtn = document.createElement("button");
        delBtn.innerHTML = "❌";

        checkbox.addEventListener("click", () => {
            e.completed = checkbox.checked;
            div.style.textDecoration = e.completed ? "line-through" : "none";
        });

        div.appendChild(checkbox);

        let span = document.createElement("span");
        span.innerText = ` ${e.name} | ${e.category} | ${e.amount}`;
        div.appendChild(span);
        div.appendChild(delBtn);

        delBtn.addEventListener("click", () => {
            data = data.filter((item) => item.id !== e.id);
            renderItems();
        });

        if (e.completed) {
            div.style.textDecoration = "line-through";
        }

        result.appendChild(div);
    });

    let total = data.filter((e) => !e.completed).reduce((sum, e) => sum + Number(e.amount), 0);
    document.getElementById("total").innerText = "Total Amount is: " + total;
}
