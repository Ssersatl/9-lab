// Масив карт
const deck = ['6.png', '7.png', '8.png', '9.png', '10.png', 'валет.png', 'дама.png', 'король.png', 'туз.png'];

// Рахунки гравців
let playerScore = 0;
let computerScore = 0;

// Поточний раунд
let round = 0;

// Ім'я гравця
let playerName = '';

// Карти гравця та комп'ютера
let playerCards = [];
let computerCards = [];

// Функція для отримання випадкової карти
function getRandomCard() {
  return deck[Math.floor(Math.random() * deck.length)];
}

// Отримати значення карти
function getCardValue(card) {
  switch (card) {
    case 'валет.png':
      return 2;
    case 'дама.png':
      return 3;
    case 'король.png':
      return 4;
    case 'туз.png':
      return 11;
    default:
      return +card.slice(0, -4); // convert to number
  }
}

// Вивід результату
function showResult() {
  // Покажемо карти гравця та комп'ютера
  alert(`Очки гравця: ${playerScore}\nОчки комп'ютера: ${computerScore}`);

  // Визначимо переможця
  let winner;
  if (playerScore > computerScore) {
    winner = 'Гравець';
  } else if (computerScore > playerScore) {
    winner = 'Комп\'ютер';
  }  else {
    winner = 'Нічия';
  }

  // Покажемо переможця
  alert(`Переміг: ${winner}`);
}

// Старт гри
startGame();

function startGame() {
  // Очищаємо дані з минулої гри
  playerScore = 0;
  computerScore = 0;
  round = 0;
  playerCards = [];
  computerCards = [];

  // Оновлюємо стан кнопки (робимо її активною)
  document.getElementById('drawBtn').removeAttribute('disabled');

  // Вводимо ім'я гравця
  playerName = prompt('Введіть ваше ім\'я');
  document.getElementById('playerName').textContent = playerName;

  // Обробка кнопки
  document.getElementById('drawBtn').addEventListener('click', function () {
    // Якщо гра не почалася, ініціалізуємо гру
    if (round === 0) {
      round = 1;
      document.getElementById('roundCounter').textContent = round + ' з 3 раундів';
    }

    // Отримуємо випадкові карти
    const playerCard = getRandomCard();
    const computerCard = getRandomCard();

    // Додаємо карти до списків гравця та комп'ютера
    playerCards.push(playerCard);
    computerCards.push(computerCard);

    // Оновлюємо рахунки
    playerScore += getCardValue(playerCard);
    computerScore += getCardValue(computerCard);

    // Оновлюємо інтерфейс
    document.getElementById('playerCardImg').src = 'images/' + playerCard;
    document.getElementById('playerScore').textContent = playerScore.toString();

    document.getElementById('computerCardImg').src = 'images/' + computerCard;
    document.getElementById('computerScore').textContent = computerScore.toString();

    // Оновлюємо раунд
    document.getElementById('roundCounter').textContent = round + ' з 3 раундів';

    // Перевірка результату
    if (round === 3) {
      // Після третього раунду відразу показуємо карти та результат
      showResult();
      // Блокуємо кнопку "Тягнути далі"
      document.getElementById('drawBtn').setAttribute('disabled', 'true');
    } else {
      // Інкрементуємо раунд тільки, якщо гра вже почалася
      round++;
    }
  });
}