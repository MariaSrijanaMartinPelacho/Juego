document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("table-body");
  const size = 5;
  const totalNumbers = size * size;
  const numbers = Array.from({ length: totalNumbers }, (_, index) => index + 1);

  // Función para barajar los números
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Crear una matriz 5x5 de botones con números desordenados del 1 al 25
  function createTable() {
    const shuffledNumbers = shuffle(numbers.slice(0, 25));
    let count = 0;
    for (let i = 0; i < size; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < size; j++) {
        const cell = document.createElement("td");
        const button = document.createElement("button");
        button.textContent = shuffledNumbers[count];
        button.dataset.number = shuffledNumbers[count];
        button.classList.add("btn", "btn-primary", "number-btn");
        button.addEventListener("click", handleClick);
        cell.appendChild(button);
        row.appendChild(cell);
        count++;
      }
      tableBody.appendChild(row);
    }
  }

  let currentNumber = 1;

  // Función para manejar el clic en los botones
  function handleClick(event) {
    const clickedButton = event.target;
    const number = parseInt(clickedButton.dataset.number);

    if (number === currentNumber) {
      if (currentNumber < 50) {
        const nextAvailableNumber = findNextNumber();
        clickedButton.textContent = nextAvailableNumber;
        clickedButton.dataset.number = nextAvailableNumber;
        currentNumber++;
      } else {
        alert("¡Felicidades! Has encontrado todos los números en orden.");
      }
    }
  }

  // Función para encontrar el siguiente número disponible del 26 al 50
  function findNextNumber() {
    for (let i = 26; i <= 50; i++) {
      if (!document.querySelector(`[data-number="${i}"]`)) {
        return i;
      }
    }
    return -1; // En caso de que no haya más números disponibles
  }

  createTable();
});