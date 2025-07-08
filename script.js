// Main Application Controller
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    const calculator = new ElectroCalc();
    calculator.init();
});

class ElectroCalc {
    constructor() {
        this.currentMode = 'basic';
        this.currentInput = '0';
        this.calculation = '';
        this.waitingForOperand = false;
        this.operator = null;
        this.previousValue = null;
    }

    init() {
        // Theme Management
        this.initTheme();
        
        // Mode Selection
        this.initModeSelection();
        
        // Calculator Functionality
        this.initCalculator();
        
        // Load the default mode
        this.loadMode(this.currentMode);
    }

    initTheme() {
        this.themeToggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const icon = this.themeToggle.querySelector('i');
        icon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    initModeSelection() {
        this.modeToggle = document.getElementById('modeToggle');
        this.modeDropdown = document.getElementById('modeDropdown');
        
        this.modeToggle.addEventListener('click', () => {
            this.modeDropdown.classList.toggle('open');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.modeToggle.contains(e.target) {
                this.modeDropdown.classList.remove('open');
            }
        });
        
        // Mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.getAttribute('data-mode');
                this.loadMode(mode);
                this.modeDropdown.classList.remove('open');
            });
        });
    }

    loadMode(mode) {
        this.currentMode = mode;
        document.getElementById('currentMode').textContent = this.getModeName(mode);
        
        // Clear calculator state
        this.clearCalculator();
        
        // Load the appropriate interface
        this.loadInterface(mode);
    }

    getModeName(mode) {
        const modeNames = {
            'basic': 'Standard Calculator',
            'ohm': 'Ohm\'s Law Calculator',
            'power': 'Power Calculator',
            'resistor': 'Resistor Code Calculator',
            'series-parallel': 'Series/Parallel Calculator',
            'reactance': 'Reactance Calculator',
            'opamp': 'Op-Amp Calculator',
            '555': '555 Timer Calculator'
        };
        
        return modeNames[mode] || 'Calculator';
    }

    loadInterface(mode) {
        const interfaceContainer = document.getElementById('calculatorInterface');
        
        switch(mode) {
            case 'basic':
                interfaceContainer.innerHTML = ''; // Basic mode uses the universal numpad
                break;
                
            case 'ohm':
                interfaceContainer.innerHTML = this.getOhmsLawInterface();
                break;
                
            case 'power':
                interfaceContainer.innerHTML = this.getPowerInterface();
                break;
                
            case 'resistor':
                interfaceContainer.innerHTML = this.getResistorInterface();
                break;
                
            // Add other modes here
                
            default:
                interfaceContainer.innerHTML = '';
        }
    }

    getOhmsLawInterface() {
        return `
            <div class="electronics-form">
                <div class="input-group">
                    <label for="voltage">Voltage (V)</label>
                    <input type="number" id="voltage" placeholder="Volts" class="electronics-input">
                </div>
                <div class="input-group">
                    <label for="current">Current (I)</label>
                    <input type="number" id="current" placeholder="Amps" class="electronics-input">
                </div>
                <div class="input-group">
                    <label for="resistance">Resistance (R)</label>
                    <input type="number" id="resistance" placeholder="Ohms" class="electronics-input">
                </div>
                <div class="action-buttons">
                    <button class="action-btn" id="calcVoltage">Calculate V</button>
                    <button class="action-btn" id="calcCurrent">Calculate I</button>
                    <button class="action-btn" id="calcResistance">Calculate R</button>
                </div>
            </div>
        `;
    }

    getPowerInterface() {
        return `
            <div class="electronics-form">
                <div class="input-group">
                    <label for="power">Power (P)</label>
                    <input type="number" id="power" placeholder="Watts" class="electronics-input">
                </div>
                <div class="input-group">
                    <label for="voltageP">Voltage (V)</label>
                    <input type="number" id="voltageP" placeholder="Volts" class="electronics-input">
                </div>
                <div class="input-group">
                    <label for="currentP">Current (I)</label>
                    <input type="number" id="currentP" placeholder="Amps" class="electronics-input">
                </div>
                <div class="input-group">
                    <label for="resistanceP">Resistance (R)</label>
                    <input type="number" id="resistanceP" placeholder="Ohms" class="electronics-input">
                </div>
                <div class="action-buttons">
                    <button class="action-btn" id="calcPower">Calculate P</button>
                    <button class="action-btn" id="calcPowerV">Calculate V</button>
                    <button class="action-btn" id="calcPowerI">Calculate I</button>
                    <button class="action-btn" id="calcPowerR">Calculate R</button>
                </div>
            </div>
        `;
    }

    getResistorInterface() {
        return `
            <div class="electronics-form">
                <div class="band-selector">
                    <h4>Number of Bands:</h4>
                    <div class="band-options">
                        <button class="band-option active" data-bands="4">4-Band</button>
                        <button class="band-option" data-bands="5">5-Band</button>
                        <button class="band-option" data-bands="6">6-Band</button>
                    </div>
                </div>
                
                <div class="resistor-bands" id="resistorBands">
                    <!-- Bands will be generated by JavaScript -->
                </div>
                
                <div class="resistor-result">
                    <div class="resistor-value">Value: <span id="resistorValue">0</span> Ω</div>
                    <div class="resistor-tolerance">Tolerance: ±<span id="resistorTolerance">0</span>%</div>
                    <div class="resistor-temp-coeff" id="tempCoeffContainer">Temp. Coefficient: <span id="resistorTempCoeff">0</span> ppm/°C</div>
                </div>
            </div>
        `;
    }

    initCalculator() {
        // Numpad buttons
        document.querySelectorAll('.numpad-btn').forEach(button => {
            button.addEventListener('click', () => {
                const value = button.getAttribute('data-value');
                this.handleNumpadInput(value);
            });
        });
        
        // Operation buttons
        document.querySelectorAll('.op-btn').forEach(button => {
            button.addEventListener('click', () => {
                const op = button.getAttribute('data-op');
                this.handleOperation(op);
            });
        });
        
        // Export button
        document.getElementById('exportPDF').addEventListener('click', () => {
            this.exportToPDF();
        });
    }

    handleNumpadInput(value) {
        if (this.currentMode === 'basic') {
            this.handleBasicInput(value);
        } else {
            // Handle input for other modes
            const activeInput = document.activeElement;
            if (activeInput && activeInput.classList.contains('electronics-input')) {
                this.handleElectronicsInput(activeInput, value);
            }
        }
    }

    handleBasicInput(value) {
        if (value === '±') {
            this.currentInput = (parseFloat(this.currentInput) * -1).toString();
        } else if (value === '.') {
            if (!this.currentInput.includes('.')) {
                this.currentInput += '.';
            }
        } else {
            if (this.currentInput === '0' || this.waitingForOperand) {
                this.currentInput = value;
                this.waitingForOperand = false;
            } else {
                this.currentInput += value;
            }
        }
        
        this.updateDisplay();
    }

    handleElectronicsInput(input, value) {
        if (value === '±') {
            input.value = (parseFloat(input.value || '0') * -1).toString();
        } else if (value === '.') {
            if (!input.value.includes('.')) {
                input.value += '.';
            }
        } else {
            if (input.value === '0' || input.value === '') {
                input.value = value;
            } else {
                input.value += value;
            }
        }
    }

    handleOperation(op) {
        if (this.currentMode === 'basic') {
            this.handleBasicOperation(op);
        } else {
            // Handle operations for other modes
            if (op === 'clear') {
                this.clearElectronicsInputs();
            } else if (op === 'backspace') {
                this.handleElectronicsBackspace();
            }
        }
    }

    handleBasicOperation(op) {
        const inputValue = parseFloat(this.currentInput);
        
        if (op === 'clear') {
            this.clearCalculator();
            return;
        }
        
        if (op === 'backspace') {
            if (this.currentInput.length === 1) {
                this.currentInput = '0';
            } else {
                this.currentInput = this.currentInput.slice(0, -1);
            }
            this.updateDisplay();
            return;
        }
        
        if (this.operator && !this.waitingForOperand) {
            const result = this.calculate(this.previousValue, inputValue, this.operator);
            this.currentInput = String(result);
            this.previousValue = result;
            this.calculation = '';
        } else if (op !== '=') {
            this.previousValue = inputValue;
        }
        
        if (op === '=') {
            if (this.operator) {
                const result = this.calculate(this.previousValue, inputValue, this.operator);
                this.currentInput = String(result);
                this.calculation = '';
                this.operator = null;
                this.previousValue = null;
                this.waitingForOperand = true;
            }
        } else {
            this.operator = op;
            this.calculation = `${this.previousValue} ${this.operator} `;
            this.waitingForOperand = true;
        }
        
        this.updateDisplay();
    }

    calculate(value1, value2, operator) {
        switch(operator) {
            case '+': return value1 + value2;
            case '-': return value1 - value2;
            case '*': return value1 * value2;
            case '/': return value1 / value2;
            default: return value2;
        }
    }

    clearCalculator() {
        this.currentInput = '0';
        this.calculation = '';
        this.waitingForOperand = false;
        this.operator = null;
        this.previousValue = null;
        this.updateDisplay();
    }

    clearElectronicsInputs() {
        document.querySelectorAll('.electronics-input').forEach(input => {
            input.value = '';
        });
    }

    handleElectronicsBackspace() {
        const activeInput = document.activeElement;
        if (activeInput && activeInput.classList.contains('electronics-input')) {
            activeInput.value = activeInput.value.slice(0, -1);
        }
    }

    updateDisplay() {
        document.getElementById('resultDisplay').textContent = this.currentInput;
        document.getElementById('calculationDisplay').textContent = this.calculation;
    }

    exportToPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const currentMode = document.getElementById('currentMode').textContent;
        const result = document.getElementById('resultDisplay').textContent;
        const calculation = document.getElementById('calculationDisplay').textContent || 'No calculation history';
        
        // Add title
        doc.setFontSize(18);
        doc.text(`ElectroCalc Pro - ${currentMode}`, 10, 15);
        
        // Add divider line
        doc.setDrawColor(200, 200, 200);
        doc.line(10, 20, 200, 20);
        
        // Add calculation details
        doc.setFontSize(12);
        doc.text('Calculation:', 10, 30);
        doc.text(calculation, 10, 40);
        
        // Add result
        doc.setFontSize(14);
        doc.text('Result:', 10, 50);
        doc.setFontSize(16);
        doc.text(result, 10, 60);
        
        // Add timestamp
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Exported on ${new Date().toLocaleString()}`, 10, 280);
        
        // Save the PDF
        doc.save(`ElectroCalc_${currentMode.replace(' ', '_')}_${Date.now()}.pdf`);
    }
}
