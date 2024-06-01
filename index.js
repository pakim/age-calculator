const day = document.querySelector(".day");
const dayInput = document.querySelector("#day");
const month = document.querySelector(".month");
const monthInput = document.querySelector("#month");
const year = document.querySelector(".year");
const yearInput = document.querySelector("#year");
const resultDay = document.querySelector(".result-day");
const resultMonth = document.querySelector(".result-month");
const resultYear = document.querySelector(".result-year");
const resultLabelDay = document.querySelector(".result div:nth-of-type(3) p");
const resultLabelMonth = document.querySelector(".result div:nth-of-type(2) p");
const resultLabelYear = document.querySelector(".result div:nth-of-type(1) p");
const inputs = document.querySelectorAll("input");
const button = document.querySelector(".button button");
const validInputs = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Tab", "Backspace"];
const errorEmpty = "This field is required";
const errorDay = "Must be a valid day";
const errorMonth = "Must be a valid month";
const errorYear = "Must be in the past";
const errorDate = "Must be a valid date";
let now = new Date();
let valid = true;

const showError = (element, message = "") => {
  const error = element.querySelector(".error");
  const label = element.querySelector("label");
  const input = element.querySelector("input");

  if (message) {
    error.classList.remove("hidden");
    error.innerText = message;
  }
  label.classList.add("red");
  input.classList.add("red");
};

const removeError = element => {
  const error = element.querySelector(".error");
  const label = element.querySelector("label");
  const input = element.querySelector("input");

  error.classList.add("hidden");
  label.classList.remove("red");
  input.classList.remove("red");
};

const checkDay = num => {
  if (isNaN(num)) {
    showError(day, errorEmpty);
    valid = false;
  } else if (num < 1 || num > 31) {
    showError(day, errorDay);
    valid = false;
  }
};

const checkMonth = num => {
  const error = month.querySelector(".error");
  const label = month.querySelector("label");
  if (isNaN(num)) {
    showError(month, errorEmpty);
    valid = false;
  } else if (num < 1 || num > 12) {
    showError(month, errorMonth);
    valid = false;
  }
};

const checkYear = num => {
  const error = year.querySelector(".error");
  const label = year.querySelector("label");
  if (isNaN(num)) {
    showError(year, errorEmpty);
    valid = false;
  } else if (num > now.getFullYear()) {
    showError(year, errorYear);
    valid = false;
  }
};

const reset = () => {
  removeError(day);
  removeError(month);
  removeError(year);
  resultYear.innerText = "--";
  resultMonth.innerText = "--";
  resultDay.innerText = "--";
};

const addAnimation = () => {
  resultYear.classList.add("animate");
  resultMonth.classList.add("animate");
  resultDay.classList.add("animate");
};

const removeAnimation = () => {
  setTimeout(() => {
    resultYear.classList.remove("animate");
    resultMonth.classList.remove("animate");
    resultDay.classList.remove("animate");
  }, 500);
};

const validate = () => {
  const valueDay = parseInt(dayInput.value);
  const valueMonth = parseInt(monthInput.value);
  const valueYear = parseInt(yearInput.value);

  reset();
  addAnimation();
  removeAnimation();

  valid = true;
  now = new Date();
  checkDay(valueDay);
  checkMonth(valueMonth);
  checkYear(valueYear);

  if (valid) {
    const inputDate = new Date(`${valueYear}-${valueMonth}-${valueDay}`);

    if (
      inputDate.getDate() === valueDay &&
      inputDate.getMonth() + 1 === valueMonth &&
      inputDate.getFullYear() === valueYear
    ) {
      const total = Math.floor((now - inputDate) / (1000 * 60 * 60 * 24));
      const years = Math.floor(total / 365);
      const months = Math.floor((total % 365) / 30.4);
      const days = Math.floor((total % 365) % 30.4);

      resultLabelDay.innerText = days === 1 ? "day" : "days";
      resultLabelMonth.innerText = months === 1 ? "month" : "months";
      resultLabelYear.innerText = years === 1 ? "year" : "years";
      resultYear.innerText = years;
      resultMonth.innerText = months;
      resultDay.innerText = days;
    } else {
      showError(day, errorDate);
      showError(month);
      showError(year);
    }
  }
};

inputs.forEach(input => {
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      validate();
    } else if (!validInputs.includes(e.key)) {
      e.preventDefault();
    }
  });

  input.addEventListener("focus", () => {
    removeError(day);
    removeError(month);
    removeError(year);
  });
});

button.addEventListener("click", () => {
  validate();
});
