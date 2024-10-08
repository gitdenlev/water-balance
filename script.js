const circle = document.querySelector(".progress-ring__circle")
const radius = circle.r.baseVal.value
const circumference = 2 * Math.PI * radius

circle.style.strokeDasharray = circumference
circle.style.strokeDashoffset = circumference

const waterInput = document.getElementById("waterInput")
const updateButton = document.getElementById("updateButton")
const circleText = document.getElementById("circleText")
const resetButton = document.getElementById("resetButton")

// Начальные значения
let targetWater = 3 // 3 литра - начальная цель
let totalWaterDrank = 0 // Текущее количество выпитой воды

// Устанавливаем прогресс круга
function setProgress(percentage) {
  const offset = circumference - (percentage / 100) * circumference
  circle.style.strokeDashoffset = offset
}

// Обновляем текст с процентом прогресса
function updateProgressText() {
  const percentage = Math.min((totalWaterDrank / targetWater) * 100, 100)
  circleText.textContent = `${Math.round(percentage)}%`
  setProgress(percentage)
}

Notiflix.Notify.init({
  fontSize: "18px", // Збільшення розміру тексту
  fontWeight: "bold", // Жирний текст
  width: "300px", // Опціонально, ширина сповіщення
  cssAnimationStyle: "zoom", // Анімація появи (можна змінити на 'fade' або 'slide')
  position: "right-bottom", // Розташування (можна налаштувати на 'right-top', 'left-top', 'left-bottom')
})

// Обработчик нажатия на кнопку "Додати"
updateButton.addEventListener("click", () => {
  const waterDrank = parseFloat(waterInput.value) // Получаем новое значение воды
  if (!isNaN(waterDrank) && waterDrank > 0) {
    totalWaterDrank += waterDrank // Добавляем к общему количеству выпитой воды
    updateProgressText() // Обновляем прогресс
    Notiflix.Notify.success(`Додано ${waterDrank} літрів води!`) // Відображаємо повідомлення
    waterInput.value = "" // Очищаем инпут после ввода
  } else {
    Notiflix.Notify.failure("Введіть правильну кількість!") // Відображаємо повідомлення про помилку
  }
})

// Обработчики для кнопок выбора цели
document.querySelectorAll(".set-target").forEach((button) => {
  button.addEventListener("click", () => {
    targetWater = parseInt(button.value) // Меняем цель (targetWater)
    updateProgressText() // Обновляем прогресс на основе новой цели
    Notiflix.Notify.info(`Ціль змінена на ${targetWater} літрів`) // Відображаємо повідомлення
  })
})

// Обработчик для кнопки сброса прогресса
resetButton.addEventListener("click", () => {
  totalWaterDrank = 0 // Сбрасываем количество выпитой воды
  updateProgressText() // Обновляем прогресс
  Notiflix.Notify.warning("Прогрес скинуто!") // Відображаємо повідомлення
})
