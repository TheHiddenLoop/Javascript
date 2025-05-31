function convertToWords() {
    const numberStr = document.getElementById('numberInput').value.replace(/,/g, '');
    const resultDiv = document.getElementById('result');

    if (numberStr === "") {
        resultDiv.textContent = "Please enter a number.";
        return;
    }

    let isNegative = false;
    let numStrToProcess = numberStr;

    if (numberStr.startsWith('-')) {
        isNegative = true;
        numStrToProcess = numberStr.substring(1);
    }

    if (!/^\d+$/.test(numStrToProcess)) {
        resultDiv.textContent = "Please enter a valid whole number.";
        return;
    }

    if (numStrToProcess.length > 15) {
        resultDiv.textContent = "Number is too large. Max 15 digits supported for this conversion.";
        return;
    }

    const num = BigInt(numStrToProcess);

    if (num === 0n && numStrToProcess.length > 0) {
        resultDiv.textContent = "Zero";
        return;
    }

    let words = numToWords(numStrToProcess);
    if (isNegative) {
        words = "Minus " + words;
    }

    resultDiv.textContent = words;
}

function numToWords(nStr) {
    const a = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    let num = BigInt(nStr);

    if (num === 0n) return 'Zero';

    function twoDigitWords(nVal) {
        if (nVal === 0) return "";
        if (nVal < 20) return a[nVal];
        let word = b[Math.floor(nVal / 10)];
        if (nVal % 10 !== 0) {
            word += " " + a[nVal % 10];
        }
        return word;
    }

    function threeDigitWords(nVal) {
        if (nVal === 0) return "";
        let str = "";
        if (nVal >= 100) {
            str += a[Math.floor(nVal / 100)] + " Hundred";
            nVal %= 100;
            if (nVal > 0) str += " ";
        }
        if (nVal > 0) {
            str += twoDigitWords(nVal);
        }
        return str.trim();
    }

    let words = "";

    if (num >= 10000000000000n) {
        const val = Number(num / 10000000000000n);
        words += twoDigitWords(val) + " Neel ";
        num %= 10000000000000n;
    }

    if (num >= 100000000000n) {
        const val = Number(num / 100000000000n);
        if (val > 0) {
            words += twoDigitWords(val) + " Kharab ";
        }
        num %= 100000000000n;
    }

    if (num >= 1000000000n) {
        const val = Number(num / 1000000000n);
        if (val > 0) {
            words += twoDigitWords(val) + " Arab ";
        }
        num %= 1000000000n;
    }

    if (num >= 10000000n) {
        const val = Number(num / 10000000n);
        if (val > 0) {
            words += twoDigitWords(val) + " Crore ";
        }
        num %= 10000000n;
    }

    if (num >= 100000n) {
        const val = Number(num / 100000n);
        if (val > 0) {
            words += twoDigitWords(val) + " Lakh ";
        }
        num %= 100000n;
    }

    if (num >= 1000n) {
        const val = Number(num / 1000n);
        if (val > 0) {
            words += twoDigitWords(val) + " Thousand ";
        }
        num %= 1000n;
    }

    if (num > 0n) {
        const remainingPart = threeDigitWords(Number(num));
        if (remainingPart) {
            words += remainingPart;
        }
    }

    if (words.trim() === "" && nStr.match(/^0+$/)) {
        return "Zero";
    }

    return words.trim().replace(/\s+/g, ' ');
}

document.getElementById('numberInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        convertToWords();
    }
});