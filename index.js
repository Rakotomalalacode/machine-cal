let display = document.getElementById('display');
let operationDisplay = document.getElementById('operation-display');
let currentInput = '';
let operator = null;
let firstOperand = null;

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function updateOperationDisplay() {
    if (firstOperand !== null && operator) {
        operationDisplay.textContent = `${firstOperand} ${operator} ${currentInput}`;
    } else if (firstOperand !== null) {
        operationDisplay.textContent = `${firstOperand} ${operator || ''}`;
    } else {
        operationDisplay.textContent = '';
    }
}

function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
    updateOperationDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
        updateOperationDisplay();
    }
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    updateDisplay();
    updateOperationDisplay();
}

function changeSign() {
    if (currentInput !== '0' && currentInput !== '') {
        if (currentInput.startsWith('-')) {
            currentInput = currentInput.slice(1);
        } else {
            currentInput = '-' + currentInput;
        }
        updateDisplay();
        updateOperationDisplay();
    }
}

function calculatePercentage() {
    if (currentInput !== '0' && currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
        updateOperationDisplay();
    }
}

function operate(op) {
    if (operator && firstOperand !== null && currentInput !== '') {
        calculate();
    }
    firstOperand = parseFloat(currentInput);
    operator = op;
    currentInput = '';
    updateOperationDisplay();
    updateDisplay(); 
}

function calculate() {
    if (operator && firstOperand !== null) {
        let secondOperand = parseFloat(currentInput);
        let result;
        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                if (secondOperand === 0) {
                    result = 'Erreur';
                } else {
                    result = firstOperand / secondOperand;
                }
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        firstOperand = null;
        updateDisplay();
        updateOperationDisplay();
    }
}

updateDisplay();
updateOperationDisplay();