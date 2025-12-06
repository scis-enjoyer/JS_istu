    // Элементы DOM
const voltageInput = document.getElementById('voltage');
const currentInput = document.getElementById('current');
const cosphiInput = document.getElementById('cosphi');
const calculateBtn = document.getElementById('calculate-btn');
const powerResult = document.getElementById('power-result');
const powerUnit = document.getElementById('power-unit');
        
     // Элементы ошибок
const voltageError = document.getElementById('voltage-error');
const currentError = document.getElementById('current-error');
const cosphiError = document.getElementById('cosphi-error');
        
    // Константы
const SQRT3 = Math.sqrt(3);
        

    // Функция форматирования числа
/*
function formatNumber(num) {
    if (num >= 1000) {
    // Используем экспоненциальную запись для больших чисел
    return num.toExponential(2);
    } 
    else if (num >= 1) {return num.toFixed(2);} 
    else {
                return num.toFixed(4);
        }
}
*/       
    // Функция проверки ввода
function validateInput(value, min = 0, max = Infinity, fieldName = '') {
    const num = parseFloat(value);
            
    if (isNaN(num)) { return { isValid: false, message: 'Введите число' };}
            
    if (num < min) {
        return { 
            isValid: false, 
            message: `Значение должно быть не меньше ${min}` 
            };
        }
            
    if (num > max) {
        return { 
            isValid: false, 
            message: `Значение должно быть не больше ${max}` 
            };
        }
            return { isValid: true, value: num };
        }
        
    // Функция расчета мощности
function calculatePower() {
    let isValid = true;
            
    // Валидация напряжения
    const voltageValidation = validateInput(voltageInput.value, 0, 1000000, 'напряжение');
    if (!voltageValidation.isValid) {
        voltageError.textContent = voltageValidation.message;
        voltageError.style.display = 'block';
        voltageInput.style.borderColor = '#e74c3c';
        isValid = false;
        } 
    else {
            voltageError.style.display = 'none';
            voltageInput.style.borderColor = '#e1e5e9';
        }
            
    // Валидация тока
    const currentValidation = validateInput(currentInput.value, 0, 10000, 'ток');
    if (!currentValidation.isValid) {
        currentError.textContent = currentValidation.message;
        currentError.style.display = 'block';
        currentInput.style.borderColor = '#e74c3c';
        isValid = false;
    } 
    else {
        currentError.style.display = 'none';
        currentInput.style.borderColor = '#e1e5e9';
        }
            
    // Валидация cos φ
    const cosphiValidation = validateInput(cosphiInput.value, 0, 1, 'cos φ');
    if (!cosphiValidation.isValid) {
        cosphiError.textContent = cosphiValidation.message;
        cosphiError.style.display = 'block';
        cosphiInput.style.borderColor = '#e74c3c';
        isValid = false;
        }
    else {
        cosphiError.style.display = 'none';
        cosphiInput.style.borderColor = '#e1e5e9';
        }
            
    // Если все данные валидны, производим расчет
    if (isValid) {
        const U = voltageValidation.value;
        const I = currentValidation.value;
        const cosphi = cosphiValidation.value;
                
    // Расчет мощности
        const power = SQRT3 * U * I * cosphi;
                
    // Определение единицы измерения
        let unit = 'Вт';
        let displayValue = power;
                
        if (power >= 1000) {
            displayValue = power / 1000;
            unit = 'кВт';
                    
            if (displayValue >= 1000) {
                displayValue = displayValue / 1000;
                unit = 'МВт';
                }
        }
                
                // Отображение результата
        powerResult.textContent =  displayValue.toFixed(3);
        powerUnit.textContent = unit;
                
                // Анимация результата

    }
}
        
    // Обработчики событий
calculateBtn.addEventListener('click', calculatePower);
        
    // Расчет при нажатии Enter
[voltageInput, currentInput, cosphiInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculatePower();
            }
    });
            
    // Сброс ошибки при вводе
    input.addEventListener('input', () => {
    const errorElement = document.getElementById(`${input.id}-error`);
        errorElement.style.display = 'none';
        input.style.borderColor = '#e1e5e9';
        });
    });
        
    // Автоматический расчет при изменении значений (опционально)
[voltageInput, currentInput, cosphiInput].forEach(input => {
input.addEventListener('input', () => {
    // Проверяем, все ли поля заполнены
    if (voltageInput.value && currentInput.value && cosphiInput.value) {
        calculatePower();
        }
    });
});
        
    // Инициализация
function init() {
    // Установка начальных значений
    voltageInput.value = '220';
    currentInput.value = '10';
    cosphiInput.value = '1.0';
            
    // Первоначальный расчет
    calculatePower();
}
        

        