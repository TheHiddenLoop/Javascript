let optios = ["cm", "inch", "feet", "meter", "yard", "mile", "kilometer"];

const conversionFactors = {
    "cm": 0.01,         
    "inch": 0.0254,     
    "feet": 0.3048,     
    "meter": 1,         
    "yard": 0.9144,     
    "mile": 1609.34,    
    "kilometer": 1000   
};

function populateUnitDropdowns() {
    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");

    optios.forEach((e) => {
        const fromOtp = document.createElement("option");
        fromOtp.value = e;
        fromOtp.innerHTML = e;
        fromUnitSelect.appendChild(fromOtp);

        const toOtp = document.createElement("option");
        toOtp.value = e;
        toOtp.innerHTML = e;
        toUnitSelect.appendChild(toOtp);
    });

    fromUnitSelect.value = "meter";
    toUnitSelect.value = "cm";
}

function convert() {
    let inputValue = parseFloat(document.getElementById("inputValue").value); 
    let fromUnit = document.getElementById("fromUnit").value;
    let toUnit = document.getElementById("toUnit").value;
    let result;

    if (isNaN(inputValue)) {
        document.getElementById("result").innerHTML = "Please enter a valid number.";
        return;
    }

    let valueInMeters = inputValue * conversionFactors[fromUnit];

    result = valueInMeters / conversionFactors[toUnit];
    document.getElementById("result").innerHTML = result.toFixed(4);
}

document.addEventListener("DOMContentLoaded", populateUnitDropdowns);