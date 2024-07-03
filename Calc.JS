let display = document.getElementById('display');
let currentInput = '';
let calculatePending = false;

function appendToDisplay(value) {
    if (calculatePending) {
        display.value = '';
        calculatePending = false;
    }
    currentInput += value;
    display.value += value;
}

function clearDisplay() {
    display.value = '';
    currentInput = '';
    calculatePending = false;
}

function calculate() {
    if (currentInput) {
        try {
            // Replace '×' with '*' and '÷' with '/' for evaluation
            let processedInput = currentInput.replace(/×/g, '*').replace(/÷/g, '/').replace(/(\d+(\.\d+)?)%/g, function(match, p1) {
                return `(${p1}/100)`;
            });
            let result = eval(processedInput);
            display.value = result;
            currentInput = result.toString();
            calculatePending = true;
        } catch (error) {
            display.value = 'Error';
            currentInput = '';
        }
    }
}

function handleKeyboardInput(event) {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.' || key === '%' || key === '(' || key === ')') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        display.value = display.value.slice(0, -1);
    }
}

document.addEventListener('keydown', handleKeyboardInput);
