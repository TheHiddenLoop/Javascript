const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "INR", name: "Indian Rupee" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "ZAR", name: "South African Rand" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "DKK", name: "Danish Krone" },
  { code: "KRW", name: "South Korean Won" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "AED", name: "UAE Dirham" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "EGP", name: "Egyptian Pound" },
  { code: "PKR", name: "Pakistani Rupee" },
  { code: "BDT", name: "Bangladeshi Taka" },
  { code: "LKR", name: "Sri Lankan Rupee" },
  { code: "THB", name: "Thai Baht" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "VND", name: "Vietnamese Dong" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "ILS", name: "Israeli Shekel" },
  { code: "KWD", name: "Kuwaiti Dinar" },
  { code: "QAR", name: "Qatari Riyal" },
  { code: "OMR", name: "Omani Rial" },
  { code: "NGN", name: "Nigerian Naira" },
  { code: "KES", name: "Kenyan Shilling" },
  { code: "GHS", name: "Ghanaian Cedi" },
  { code: "MAD", name: "Moroccan Dirham" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "RON", name: "Romanian Leu" },
  { code: "UAH", name: "Ukrainian Hryvnia" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "CLP", name: "Chilean Peso" },
  { code: "PEN", name: "Peruvian Sol" },
  { code: "COP", name: "Colombian Peso" },
  { code: "TWD", name: "Taiwan Dollar" },
];

const exchangeRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0096,
  JPY: 1.65,
  CNY: 0.087,
  AUD: 0.018,
  CAD: 0.016,
  CHF: 0.011,
  NZD: 0.019,
  SGD: 0.016,
  HKD: 0.095,
  ZAR: 0.23,
  SEK: 0.13,
  NOK: 0.13,
  DKK: 0.083,
  KRW: 16.0,
  MXN: 0.2,
  BRL: 0.063,
  RUB: 1.14,
  TRY: 0.38,
  AED: 0.045,
  SAR: 0.045,
  EGP: 0.57,
  PKR: 3.08,
  BDT: 1.32,
  LKR: 3.91,
  THB: 0.45,
  IDR: 188.0,
  MYR: 0.056,
  VND: 296.0,
  PLN: 0.046,
  ILS: 0.045,
  KWD: 0.0037,
  QAR: 0.044,
  OMR: 0.0046,
  NGN: 14.0,
  KES: 1.61,
  GHS: 0.17,
  MAD: 0.12,
  CZK: 0.27,
  HUF: 4.37,
  RON: 0.056,
  UAH: 0.5,
  ARS: 11.0,
  CLP: 10.0,
  PEN: 0.045,
  COP: 49.0,
  TWD: 0.39,
};

function populateCurrencySelect(className) {
  const select = document.querySelector(`.${className}`);
  currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency.code;
    option.textContent = `${currency.name} (${currency.code})`;
    select.appendChild(option);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  populateCurrencySelect("first");
  populateCurrencySelect("second");
  document.querySelector(".first").value = "USD";
  document.querySelector(".second").value = "EUR";
});

const btn = document.getElementById("convert");

btn.addEventListener("click", () => {
  const from = document.querySelector(".first").value;
  const to = document.querySelector(".second").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const result = document.getElementById("result");
  
  if (isNaN(amount)) {
    result.textContent = "Please enter a valid amount.";
    return;
  }

  if (!exchangeRates[from] || !exchangeRates[to]) {
    result.textContent = "Conversion rate not available.";
    return;
  }

  const amountFrom = amount / exchangeRates[from];
  const converted = amountFrom * exchangeRates[to];
  
  result.textContent = `${amount.toLocaleString()} ${from} = ${converted.toFixed(4).toLocaleString()} ${to}`;
});


const resultElement = document.getElementById("result");
function animateResult() {
  resultElement.style.opacity = "0";
  setTimeout(() => {
    resultElement.style.opacity = "1";
  }, 100);
}

btn.addEventListener("click", animateResult);