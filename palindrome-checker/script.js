const btn = document.getElementById("btn");

const reset = document.getElementById("reset");

const out = document.getElementById("checkNum");
const input = document.getElementById("input");

btn.addEventListener("click", () => {
  const value = input.value.trim();

  if (!/^-?\d+$/.test(value)) {
    out.innerHTML = "Please enter a valid integer";
    return;
  }

  const number = parseInt(value);

  if (number >= 0 && number === revnum(number)) {
    out.innerHTML = `${number} is a Palindrome`;
  } else {
    out.innerHTML = `${number} is not a Palindrome`;
  }

  console.log(number);
});

function revnum(num) {
  return parseInt(num.toString().split("").reverse().join(""));
}

reset.addEventListener("click", () => {
  input.value = '';
  out.innerHTML='';
});
