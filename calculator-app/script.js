document.addEventListener('DOMContentLoaded', () => {
    // Calculator state
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let shouldResetScreen = false;
    let calculationHistory = [];
    
    // DOM elements
    const resultDisplay = document.querySelector('.result');
    const previousOperationDisplay = document.querySelector('.previous-operation');
    const buttons = document.querySelectorAll('button');
    const historyPanel = document.querySelector('.history-panel');
    const historyList = document.querySelector('.history-list');
    const clearHistoryBtn = document.getElementById('clear-history');
    
    // Initialize calculator
    updateDisplay();
    loadHistory();
    
    // Event listeners
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Add button press animation
            button.classList.add('button-press');
            setTimeout(() => button.classList.remove('button-press'), 200);
            
            if (button.classList.contains('number')) {
                inputNumber(button.dataset.value);
            } else if (button.classList.contains('operator')) {
                handleOperator(button.dataset.action);
            } else if (button.classList.contains('equals')) {
                calculate();
            } else if (button.classList.contains('special')) {
                handleSpecial(button.dataset.action);
            }
        });
    });
    
    // Double-click on result to toggle history panel
    resultDisplay.addEventListener('dblclick', toggleHistoryPanel);
    
    // Clear history button
    clearHistoryBtn.addEventListener('click', () => {
        calculationHistory = [];
        saveHistory();
        updateHistoryPanel();
    });
    
    // Keyboard support
    document.addEventListener('keydown', handleKeyboard);
    
    // Functions
    function updateDisplay() {
        resultDisplay.textContent = currentInput;
        
        if (operation) {
            previousOperationDisplay.textContent = `${previousInput} ${getOperatorSymbol(operation)}`;
        } else {
            previousOperationDisplay.textContent = '';
        }
    }
    
    function inputNumber(number) {
        if (shouldResetScreen) {
            currentInput = '0';
            shouldResetScreen = false;
        }
        
        // Handle decimal point
        if (number === '.') {
            if (currentInput.includes('.')) return;
            if (currentInput === '0') {
                currentInput = '0.';
                updateDisplay();
                return;
            }
        }
        
        // Replace initial 0 unless it's a decimal
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        
        updateDisplay();
    }
    
    function handleOperator(op) {
        // If there's already an operation in progress, calculate it first
        if (operation && !shouldResetScreen) {
            calculate();
        }
        
        previousInput = currentInput;
        operation = op;
        shouldResetScreen = true;
        updateDisplay();
    }
    
    function calculate() {
        if (!operation || shouldResetScreen) return;
        
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;
        
        // Perform calculation based on operation
        switch (operation) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    result = 'Error';
                } else {
                    result = prev / current;
                }
                break;
            case 'percent':
                result = prev * (current / 100);
                break;
            default:
                return;
        }
        
        // Format the expression for history
        const expression = `${previousInput} ${getOperatorSymbol(operation)} ${currentInput}`;
        
        // Handle error case
        if (result === 'Error') {
            currentInput = 'Error';
        } else {
            // Format the result to avoid extremely long decimals
            result = parseFloat(result.toFixed(10));
            // Convert to string and remove trailing zeros
            currentInput = result.toString();
        }
        
        // Add to history if not an error
        if (currentInput !== 'Error') {
            addToHistory(expression, currentInput);
        }
        
        operation = null;
        previousInput = '';
        shouldResetScreen = true;
        updateDisplay();
    }
    
    function handleSpecial(action) {
        switch (action) {
            case 'clear':
                currentInput = '0';
                previousInput = '';
                operation = null;
                shouldResetScreen = false;
                break;
            case 'backspace':
                if (currentInput.length === 1 || currentInput === 'Error') {
                    currentInput = '0';
                } else {
                    currentInput = currentInput.slice(0, -1);
                }
                break;
            case 'percent':
                if (currentInput === 'Error') return;
                if (operation) {
                    handleOperator('percent');
                } else {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                }
                break;
        }
        updateDisplay();
    }
    
    function getOperatorSymbol(op) {
        switch (op) {
            case 'add': return '+';
            case 'subtract': return '−';
            case 'multiply': return '×';
            case 'divide': return '÷';
            case 'percent': return '%';
            default: return '';
        }
    }
    
    function handleKeyboard(e) {
        // Prevent default behavior for calculator keys
        if (/[0-9+\-*/.%=]|Enter|Backspace|Escape/.test(e.key)) {
            e.preventDefault();
        }
        
        // Map keyboard keys to calculator buttons
        if (/[0-9]/.test(e.key)) {
            inputNumber(e.key);
        } else if (e.key === '.') {
            inputNumber('.');
        } else if (e.key === '+') {
            handleOperator('add');
        } else if (e.key === '-') {
            handleOperator('subtract');
        } else if (e.key === '*') {
            handleOperator('multiply');
        } else if (e.key === '/') {
            handleOperator('divide');
        } else if (e.key === '%') {
            handleOperator('percent');
        } else if (e.key === '=' || e.key === 'Enter') {
            calculate();
        } else if (e.key === 'Backspace') {
            handleSpecial('backspace');
        } else if (e.key === 'Escape') {
            handleSpecial('clear');
        } else if (e.key === 'h') {
            toggleHistoryPanel();
        }
    }
    
    // History functions
    function addToHistory(expression, result) {
        calculationHistory.unshift({ expression, result });
        // Limit history to 10 items
        if (calculationHistory.length > 10) {
            calculationHistory.pop();
        }
        saveHistory();
        updateHistoryPanel();
    }
    
    function updateHistoryPanel() {
        historyList.innerHTML = '';
        calculationHistory.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.classList.add('history-item');
            historyItem.innerHTML = `
                <div class="history-expression">${item.expression} =</div>
                <div class="history-result">${item.result}</div>
            `;
            historyItem.addEventListener('click', () => {
                currentInput = item.result;
                updateDisplay();
                toggleHistoryPanel();
            });
            historyList.appendChild(historyItem);
        });
    }
    
    function toggleHistoryPanel() {
        historyPanel.classList.toggle('active');
        updateHistoryPanel();
    }
    
    // Local storage functions
    function saveHistory() {
        localStorage.setItem('calculatorHistory', JSON.stringify(calculationHistory));
    }
    
    function loadHistory() {
        const savedHistory = localStorage.getItem('calculatorHistory');
        if (savedHistory) {
            calculationHistory = JSON.parse(savedHistory);
            updateHistoryPanel();
        }
    }
});