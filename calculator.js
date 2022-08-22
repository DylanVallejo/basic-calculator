class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement  = previousOperandTextElement;
        this.currentOperandTextElement  = currentOperandTextElement ;
        this.clear();
    }
    //delete all numbers from current operand
    clear() {
        this.currentOperand  = "";
        this.previousOperand  = "";
        this.operation  = undefined;
        
    };
    //delete one single number
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };
    //append number to current operand 
    //we neeed to pass the number selected 
    appendNumber(number) {
        //if there is already a dot you can not add more dots
        //turning data type to strings for a correct display and append
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
        
    };
    // we need to pass the operator selected
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    
    //calculate the result
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
            if (isNaN(integerDigits)) {
                integerDisplay = ''
            } else {
                integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
            }
            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`
            } else {
                return integerDisplay
            }
    }
    
    //update the display
    updateDisplay() {
        //setting the value of operand text to currentOperand
            //this show us the current value 
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
    
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator  = new Calculator(previousOperandTextElement, currentOperandTextElement);

//loop through buttons to add a listener and call the function
//appendNumber whit the value of the inner text 
//then call the updateDispaly function to update the showing values 
numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});


//lopping through operattion buttons so we can 
//choose the operator we need  
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

