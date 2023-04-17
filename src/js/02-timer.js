// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний в документації
import Notiflix from 'notiflix';
// Додатковий імпорт стилів
import "notiflix/dist/notiflix-3.2.6.min.css";

const timerContainer = document.querySelector('.timer');

const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            Notiflix.Notify.failure("Please choose a date in the future");
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
    },
  };

const dateTimePicker = flatpickr("#datetime-picker", options);

  function startCountdown() {
    const targetDate = new Date(dateTimePicker.latestSelectedDateObj);
    let countdownInterval;
    startButton.disabled = true;
    countdownInterval = setInterval(() => {
      const timeDifference = targetDate - new Date();
      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        daysValue.textContent = '00';
        hoursValue.textContent = '00';
        minutesValue.textContent = '00';
        secondsValue.textContent = '00';
        return;
      }

      daysValue.textContent = convertMs(timeDifference).days.toString().padStart(2, '0');
      hoursValue.textContent = convertMs(timeDifference).hours.toString().padStart(2, '0');
      minutesValue.textContent = convertMs(timeDifference).minutes.toString().padStart(2, '0');
      secondsValue.textContent = convertMs(timeDifference).seconds.toString().padStart(2, '0');
    }, 1000);
  }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  startButton.addEventListener('click', startCountdown);

  // Set the font size and color of the timer labels
const timerLabels = timerContainer.querySelectorAll('.label');
timerLabels.forEach(label => {
  label.style.fontSize = '1.2rem';
  label.style.color = 'gray';
});

// Set the font size and color of the timer values
const timerValues = timerContainer.querySelectorAll('.value');
timerValues.forEach(value => {
  value.style.fontSize = '2rem';
  value.style.color = 'black';
});