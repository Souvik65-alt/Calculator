// Main Application Controller
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Theme Management
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile Navigation
    const menuToggle = document.getElementById('menuToggle');
    const closeDrawer = document.getElementById('closeDrawer');
    const modeDrawer = document.getElementById('modeDrawer');
    
    menuToggle.addEventListener('click', () => {
        modeDrawer.classList.add('open');
    });
    
    closeDrawer.addEventListener('click', () => {
        modeDrawer.classList.remove('open');
    });
    
    // Initialize the default calculator mode
    showMode('basic');
    setupBasicCalculator();
    
    // Set up event listeners for common buttons
    document.getElementById('clearBtn').addEventListener('click', clearCalculator);
    document.getElementById('backspaceBtn').addEventListener('click', backspace);
    document.getElementById('exportBtn').addEventListener('click', exportToPDF);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme button icon
    document.getElementById('themeToggle').textContent = 
        newTheme === 'light' ? '🌓' : '☀️';
}

// Mode Management
function showMode(modeId) {
    // Hide all mode sections
    document.querySelectorAll('.mode-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the selected mode
    const activeSection = document.getElementById(modeId);
    if (activeSection) {
        activeSection.style.display = 'block';
        
        // Update the current mode indicator
        document.getElementById('currentMode').textContent = 
            getModeName(modeId);
        
        // Close the mobile drawer if open
        document.getElementById('modeDrawer').classList.remove('open');
        
        // Set up the specific calculator mode
        setupCalculatorMode(modeId);
        
        // Update the mobile keypad
        updateMobileKeypad(modeId);
    }
}

function getModeName(modeId) {
    const modeNames = {
        'basic': 'Standard Calculator',
        'ohm': 'Ohm\'s Law Calculator',
        'power': 'Power Calculator',
        'resistor': 'Resistor Code Calculator',
        // Add other mode names here
    };
    
    return modeNames[modeId] || 'Calculator';
}

function setupCalculatorMode(modeId) {
    // Clear any previous state
    clearCalculator();
    
    // Set up the specific calculator mode
    switch(modeId) {
        case 'basic':
            setupBasicCalculator();
            break;
        case 'ohm':
            setupOhmsLawCalculator();
            break;
        case 'power':
            setupPowerCalculator();
            break;
        case 'resistor':
            setupResistorCalculator();
            break;
        // Add cases for other calculator modes
        default:
            setupBasicCalculator();
    }
}

// Basic Calculator Implementation
function setupBasicCalculator() {
    const basicSection = document.getElementById('basic');
    basicSection.innerHTML = `
        <div class="calculator-grid">
            <!-- This would be populated with buttons for the basic calculator -->
            <!-- Implemented in JavaScript for better control -->
        </div>
    `;
    
    // In a real implementation, we would create button elements here
    // and attach event listeners for the basic calculator operations
}

// Ohm's Law Calculator Implementation
function setupOhmsLawCalculator() {
    const ohmSection = document.getElementById('ohm');
    ohmSection.innerHTML = `
        <div class="electronics-calculator">
            <div class="input-group">
                <label for="voltage">Voltage (V)</label>
                <input type="number" id="voltage" placeholder="Enter voltage in volts">
            </div>
            <div class="input-group">
                <label for="current">Current (I)</label>
                <input type="number" id="current" placeholder="Enter current in amps">
            </div>
            <div class="input-group">
                <label for="resistance">Resistance (R)</label>
                <input type="number" id="resistance" placeholder="Enter resistance in ohms">
            </div>
            <div class="calc-actions">
                <button class="calc-btn" onclick="calculateOhmsLaw('voltage')">Calculate V</button>
                <button class="calc-btn" onclick="calculateOhmsLaw('current')">Calculate I</button>
                <button class="calc-btn" onclick="calculateOhmsLaw('resistance')">Calculate R</button>
            </div>
        </div>
    `;
}

function calculateOhmsLaw(calculateFor) {
    // Implementation of Ohm's Law calculations
    // V = IR, I = V/R, R = V/I
}

// Similar implementations would exist for other calculator modes...

// Mobile Keypad Management
function updateMobileKeypad(modeId) {
    const keypad = document.querySelector('.mobile-keypad');
    
    switch(modeId) {
        case 'basic':
            keypad.innerHTML = `
                <button class="keypad-btn" onclick="appendToDisplay('7')">7</button>
                <button class="keypad-btn" onclick="appendToDisplay('8')">8</button>
                <button class="keypad-btn" onclick="appendToDisplay('9')">9</button>
                <button class="keypad-btn secondary" onclick="appendToDisplay('/')">÷</button>
                
                <button class="keypad-btn" onclick="appendToDisplay('4')">4</button>
                <button class="keypad-btn" onclick="appendToDisplay('5')">5</button>
                <button class="keypad-btn" onclick="appendToDisplay('6')">6</button>
                <button class="keypad-btn secondary" onclick="appendToDisplay('*')">×</button>
                
                <button class="keypad-btn" onclick="appendToDisplay('1')">1</button>
                <button class="keypad-btn" onclick="appendToDisplay('2')">2</button>
                <button class="keypad-btn" onclick="appendToDisplay('3')">3</button>
                <button class="keypad-btn secondary" onclick="appendToDisplay('-')">−</button>
                
                <button class="keypad-btn" onclick="appendToDisplay('0')">0</button>
                <button class="keypad-btn" onclick="appendToDisplay('.')">.</button>
                <button class="keypad-btn" onclick="calculate()">=</button>
                <button class="keypad-btn secondary" onclick="appendToDisplay('+')">+</button>
            `;
            break;
            
        case 'ohm':
            keypad.innerHTML = `
                <button class="keypad-btn" onclick="setOhmValue('voltage', '7')">7</button>
                <button class="keypad-btn" onclick="setOhmValue('voltage', '8')">8</button>
                <button class="keypad-btn" onclick="setOhmValue('voltage', '9')">9</button>
                <button class="keypad-btn primary" onclick="calculateOhmsLaw('voltage')">V</button>
                
                <button class="keypad-btn" onclick="setOhmValue('voltage', '4')">4</button>
                <button class="keypad-btn" onclick="setOhmValue('voltage', '5')">5</button>
                <button class="keypad-btn" onclick="setOhmValue('voltage', '6')">6</button>
                <button class="keypad-btn primary" onclick="calculateOhmsLaw('current')">I</button>
                
                <button class="keypad-btn" onclick="setOhmValue('voltage', '1')">1</button>
                <button class="keypad-btn" onclick="setOhmValue('voltage', '2')">2</button>
                <button class="keypad-btn" onclick="setOhmValue('voltage', '3')">3</button>
                <button class="keypad-btn primary" onclick="calculateOhmsLaw('resistance')">R</button>
                
                <button class="keypad-btn" onclick="setOhmValue('voltage', '0')">0</button>
                <button class="keypad-btn" onclick="setOhmValue('voltage', '.')">.</button>
                <button class="keypad-btn" onclick="clearOhmInputs()">C</button>
                <button class="keypad-btn error" onclick="clearOhmInputs()">⌫</button>
            `;
            break;
            
        // Add other keypad configurations for different modes
    }
}

// PDF Export Functionality
function exportToPDF() {
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

// Common Calculator Functions
function clearCalculator() {
    document.getElementById('resultDisplay').textContent = '0';
    document.getElementById('calculationDisplay').textContent = '';
}

function backspace() {
    const display = document.getElementById('resultDisplay');
    if (display.textContent.length === 1) {
        display.textContent = '0';
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
}

// Additional helper functions would be implemented here...