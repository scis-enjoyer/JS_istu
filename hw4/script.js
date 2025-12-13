const k1 = 12;
const k2 = 9;
const k3 = 0.5;
const k4 = 1;
const k5 = 65;

const n = 1000;
const xStart = 0;
const xEnd = 10;
const step = (xEnd - xStart) / (n - 1);

const LIMIT = 1e100;

let a = [];
let product = 1;
let lastValidProduct = 1;

// Траверс массива
for (let i = 0; i < n; i++) {
    let x = xStart + i * step;

    let value =
        k1 * x +
        k2 * k2 * x +
        k3 * Math.sin(2 * Math.PI * k4 * x) +
        k5 * Math.cos(2 * Math.PI * k4 * x);

    a.push(value);

    // произведение элементов с нечётными индексами
    if (i % 2 !== 0) {
        product *= value;

        // если ещё в пределах — запоминаем
        if (Math.abs(product) <= LIMIT) {
            lastValidProduct = product;
        } else {
            // обрезка
            if (product > LIMIT) product = LIMIT;
            if (product < -LIMIT) product = -LIMIT;
        }
    }
}

document.getElementById("result").textContent =
    "Последнее возможное значение произведения: " + lastValidProduct;