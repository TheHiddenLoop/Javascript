function calculateTip() {
  const bill = parseFloat(document.getElementById('billAmount').value);
  const tipPercent = parseFloat(document.getElementById('tipPercent').value);

  if (isNaN(bill) || isNaN(tipPercent)) {
    alert("Please enter valid numbers!");
    return;
  }

  const tip = (bill * tipPercent) / 100;
  const total = bill + tip;

  document.getElementById('tipAmount').textContent = tip.toFixed(2);
  document.getElementById('totalAmount').textContent = total.toFixed(2);
}
