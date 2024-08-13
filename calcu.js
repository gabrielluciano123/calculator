document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display');
    let firstOperand = '';
    let secondOperand = '';
    let currentOperator = null;
    let shouldResetDisplay = false;

    function clear() {
        display.textContent = '0';
        firstOperand = '';
        secondOperand = '';
        currentOperator = null;
        shouldResetDisplay = false;
    }

    function inputDigit(digit) {
        if (display.textContent === '0' || shouldResetDisplay) {
            resetDisplay();
        }
        display.textContent += digit;
    }

    function resetDisplay() {
        display.textContent = '';
        shouldResetDisplay = false;
    }

    function inputDecimal() {
        if (shouldResetDisplay) resetDisplay();
        if (!display.textContent.includes('.')) {
            display.textContent += '.';
        }
    }

    function handleOperator(operator) {
        if (currentOperator !== null) evaluate();
        firstOperand = display.textContent;
        currentOperator = operator;
        shouldResetDisplay = true;
    }

    function evaluate() {
        if (currentOperator === null || shouldResetDisplay) return;
        if (currentOperator === '/' && display.textContent === '0') {
            alert("No se puede dividir por 0!");
            clear();
            return;
        }
        secondOperand = display.textContent;
        display.textContent = roundResult(
            operate(currentOperator, firstOperand, secondOperand)
        );
        currentOperator = null;
    }

    function roundResult(number) {
        return Math.round(number * 1000) / 1000;
    }

    function operate(operator, a, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return null;
        }
    }

    function deleteLastDigit() {
        if (display.textContent.length > 1) {
            display.textContent = display.textContent.slice(0, -1);
        } else {
            display.textContent = '0';
        }
    }

    document.querySelector('.buttons').addEventListener('click', function(e) {
        const target = e.target;
        if (!target.matches('button')) return;

        if (target.classList.contains('operator')) {
            handleOperator(target.textContent);
        } else if (target.classList.contains('equals')) {
            evaluate();
        } else if (target.classList.contains('clear')) {
            clear();
        } else if (target.classList.contains('backspace')) {
            deleteLastDigit();
        } else if (target.textContent === '.') {
            inputDecimal();
        } else {
            inputDigit(target.textContent);
        }
    });

    clear();
});
