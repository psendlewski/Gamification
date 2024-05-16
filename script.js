// Up/Down Buttons
"use strict";
const freeTimeEl = document.querySelector("#free-time");
const studyingEl = document.querySelector("#studying");

const ftBtnUpEl = document.querySelector("#ft-btn-up");
const ftBtnDownEl = document.querySelector("#ft-btn-down");
const sBtnUpEl = document.querySelector("#s-btn-up");
const sBtnDownEl = document.querySelector("#s-btn-down");

// Date Elements
const dayEl = document.querySelector("#day");
const monthEl = document.querySelector("#month");

const dayNumbersEl = document.querySelector("#day-numbers");

// Progress bar
const progressBgEl = document.querySelector("#progress-background");
const progressBarEl = document.querySelector("#progress-bar");
const expEl = document.querySelector(".exp");

let upgradeCost = 20;
let progressBarWidth = 200;

let freeTime = 0;
let studying = 0;

ftBtnUpEl.addEventListener("click", () => {
  freeTime++;
  freeTimeEl.textContent = freeTime;
});

ftBtnDownEl.addEventListener("click", () => {
  if (freeTime >= 1) freeTime--;
  freeTimeEl.textContent = freeTime;
});
sBtnUpEl.addEventListener("click", () => {
  if (studying < freeTime) studying++;
  studyingEl.textContent = studying;
});
sBtnDownEl.addEventListener("click", () => {
  if (studying >= 1) studying--;
  studyingEl.textContent = studying;
});

// Date
let dayNr;
let dayNrId;
let dayOfAWeek;
let dayOfAWeekNr;
let monthNr;
let month;
let time;
let dataObject = {};

let firstDayofAMonth;
let skipFirstDays;
let skipLastDays;

let currentDayEl;

// Function to fetch data from API

function fetchData() {
  const proxyUrl = "https://api.allorigins.win/get?url=";
  const apiUrl =
    "https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam";
  const url = proxyUrl + encodeURIComponent(apiUrl);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Parse the JSON response from the proxy server
      dataObject = JSON.parse(data.contents);

      // Extract date and time from the response
      dayNr = dataObject.day;
      dayOfAWeek = dataObject.dayOfWeek;
      monthNr = dataObject.month;
      time = dataObject.time;

      switch (monthNr) {
        case 1:
          month = "January";
          break;
        case 2:
          month = "February";
          break;
        case 3:
          month = "March";
          break;
        case 4:
          month = "April";
          break;
        case 5:
          month = "May";
          break;
        case 6:
          month = "June";
          break;
        case 7:
          month = "July";
          break;
        case 8:
          month = "August";
          break;
        case 9:
          month = "September";
          break;
        case 10:
          month = "October";
          break;
        case 11:
          month = "November";
          break;
        case 12:
          month = "December";
          break;
        default:
          console.log(`Wrong month number format`);
      }
      switch (dayOfAWeek) {
        case "Monday":
          dayOfAWeekNr = 1;
          break;
        case "Tuesday":
          dayOfAWeekNr = 2;
          break;
        case "Wednesday":
          dayOfAWeekNr = 3;
          break;
        case "Thursday":
          dayOfAWeekNr = 4;
          break;
        case "Friday":
          dayOfAWeekNr = 5;
          break;
        case "Saturday":
          dayOfAWeekNr = 6;
          break;
        case "Sunday":
          dayOfAWeekNr = 7;
          break;
        default:
          console.log(`Wrong day of a week format`);
      }

      // Displaying date
      dayEl.textContent = dayNr;
      monthEl.textContent = month;

      // Calendar

      function getFirstDayOfMonth(dayOfAWeekNr, dayOfMonth) {
        // Ensure dayOfAWeekNr is in the range [1, 7]
        dayOfAWeekNr = ((dayOfAWeekNr % 7) + 7) % 7;

        // Ensure dayOfMonth is in the range [1, 31]
        dayOfMonth = Math.max(1, Math.min(dayOfMonth, 31));

        // Calculate the difference between the current day and the day of the week of the first day of the month
        const difference = dayOfMonth - 1; // Since we're interested in the first day of the month

        // Use modular arithmetic to find the corresponding day of the week for the first day of the month
        let firstDayOfMonth = (dayOfAWeekNr - (difference % 7) + 7) % 7;

        // Adjust for Sunday being represented as 7 instead of 0
        if (firstDayOfMonth === 0) {
          firstDayOfMonth = 7;
        }

        // Return the corresponding day of the week for the first day of the month
        return firstDayOfMonth;
      }

      firstDayofAMonth = getFirstDayOfMonth(dayOfAWeekNr, dayNr);

      // Days in the Month
      function getDaysInMonth(year, month) {
        // JavaScript months are 0-based (January is 0, February is 1, etc.)
        // So, to get the last day of the month, we set the day to 0 of the next month
        return new Date(year, month + 1, 0).getDate();
      }
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      let daysInMonth = getDaysInMonth(currentYear, currentMonth);

      firstDayofAMonth;
      skipFirstDays = firstDayofAMonth > 1 ? firstDayofAMonth - 1 : 7;
      skipLastDays = 35 - skipFirstDays - daysInMonth;

      let dayCounter = 0;
      // Building the Calendar
      // Skip first days
      if (skipFirstDays > 0) {
        for (let i = 0; i < skipFirstDays; i++) {
          dayCounter++;
          let inactiveDay = document.createElement("div");
          inactiveDay.classList.add("inact-day");
          inactiveDay.setAttribute("id", `d${dayCounter}`);
          dayNumbersEl.appendChild(inactiveDay);
        }
      }
      // Calendar days
      for (let i = 0; i < daysInMonth; i++) {
        dayCounter++;
        let calDay = document.createElement("div");
        calDay.classList.add("cal-day");
        calDay.setAttribute("id", `d${dayCounter}`);
        calDay.textContent = `${i + 1}`;
        dayNumbersEl.appendChild(calDay);
      }
      // Skip last days
      for (let i = 0; i < skipLastDays; i++) {
        dayCounter++;
        let inactDay = document.createElement("div");
        inactDay.classList.add("inact-day");
        inactDay.setAttribute("id", `d${dayCounter}`);
        dayNumbersEl.appendChild(inactDay);
      }
      // light up a current day
      //**************************************** */
      dayNrId = `#d${dayNr + skipFirstDays}`;
      currentDayEl = document.querySelector(dayNrId);
      currentDayEl.classList.add("act-day");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

fetchData();

// Add FreeTime & Studying to current day
let saveBtnEl = document.querySelector("#save-btn");
saveBtnEl.addEventListener("click", () => {
  let productivityColor;
  let productivity =
    studying && freeTime ? ((studying / freeTime) * 100).toFixed(0) : 0;
  if (studying / freeTime < 0.5) {
    productivityColor = "red";
  } else if (studying / freeTime < 0.6) {
    productivityColor = "orange";
  } else if (studying / freeTime < 0.7) {
    productivityColor = "yellow";
  } else {
    productivityColor = "green";
  }
  currentDayEl;
  if (currentDayEl.firstChild) currentDayEl.firstChild.remove();
  if (currentDayEl.firstChild) currentDayEl.firstChild.remove();
  if (currentDayEl.firstChild) currentDayEl.firstChild.remove();

  currentDayEl.innerText = dayNr;
  let ft = document.createElement("p");
  ft.innerHTML = `FT: &nbsp;  ${freeTime}h`;
  let s = document.createElement("p");
  s.innerHTML = `S: &nbsp; &nbsp; ${studying}h`;
  let p = document.createElement("p");
  p.innerHTML = `P: &nbsp;    ${productivity}%`;
  currentDayEl.appendChild(ft);
  currentDayEl.appendChild(s);
  currentDayEl.appendChild(p);
  currentDayEl.classList.remove("red", "orange", "yellow", "green");
  currentDayEl.classList.add(productivityColor);
});

// Money Counter
const balanceEl = document.querySelector("#balance");

let monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const currentDate = new Date();

let balance;

let passiveIncome = 1;
let passiveIncomePerSec = passiveIncome / 24 / 60 / 60;

let currentTimeObj = {
  month: currentDate.getMonth(),
  day: currentDate.getDate(),
  hour: currentDate.getHours(),
  minute: currentDate.getMinutes(),
  second: currentDate.getSeconds(),
  balance,
};
let pastTimeObj = {};

function balanceCalc(pastTimeObj, currentTimeObj) {
  // console.log("currentTimeObj Balance:", currentTimeObj.balance);
  // console.log("pastTimeObj", pastTimeObj);

  // balanceCalc(pastTimeObj, currentTimeObj);
  let pastTimeDays = 0;
  for (let i = 0; i < pastTimeObj.month - 1; i++) {
    pastTimeDays += monthDays[i];
  }
  pastTimeDays += pastTimeObj.day - 1;
  let pastTimeSeconds = pastTimeDays * 24 * 60 * 60;
  pastTimeSeconds += pastTimeObj.hour * 60 * 60;
  pastTimeSeconds += pastTimeObj.minute * 60;
  pastTimeSeconds += pastTimeObj.second;

  let currentTimeDays = 0;
  for (let i = 0; i < currentTimeObj.month - 1; i++) {
    currentTimeDays += monthDays[i];
  }
  currentTimeDays += currentTimeObj.day - 1;
  let currentTimeSeconds = currentTimeDays * 24 * 60 * 60;
  currentTimeSeconds += currentTimeObj.hour * 60 * 60;
  currentTimeSeconds += currentTimeObj.minute * 60;
  currentTimeSeconds += currentTimeObj.second;

  let difference = currentTimeSeconds - pastTimeSeconds;
  currentTimeObj.balance =
    pastTimeObj.balance + difference * passiveIncomePerSec;
  currentTimeObj.balance += passiveIncomePerSec;
  // console.log("Current Balance After:", currentTimeObj.balance);
  return currentTimeObj.balance;
}
// Load Past Time Object from local memory
function loadPastTimeObj() {
  if (window.localStorage.getItem("pastTimeObject")) {
    let newTimeObject = window.localStorage.getItem("pastTimeObject");
    pastTimeObj = JSON.parse(newTimeObject);
  } else {
    console.log("loadPastTimeObj - else");
    pastTimeObj.month = currentTimeObj.month;
    pastTimeObj.day = currentTimeObj.day;
    pastTimeObj.hour = currentTimeObj.hour;
    pastTimeObj.minute = currentTimeObj.minute;
    pastTimeObj.second = currentTimeObj.second;
    if (!currentTimeObj.balance) {
      currentTimeObj.balance = parseInt(prompt("Enter a starting balance"));
      pastTimeObj.balance = currentTimeObj.balance;
      window.localStorage.setItem(
        "pastTimeObject",
        JSON.stringify(currentTimeObj)
      );
    }
  }
}

function updateProgressBar() {
  expEl.textContent = `${currentTimeObj.balance.toFixed(1)}/${upgradeCost}`;
  let width = progressBarWidth * (currentTimeObj.balance / upgradeCost);
  console.log(width);
  console.log(progressBarEl);
  progressBarEl.style.width = width > 5 ? `${width}px` : `${5}px`;
}

setInterval(() => {
  // console.log(currentTimeObj);
  loadPastTimeObj();
  balanceCalc(pastTimeObj, currentTimeObj);
  balanceEl.textContent = currentTimeObj.balance.toFixed(5);
  updateProgressBar();
  window.localStorage.setItem("pastTimeObject", JSON.stringify(currentTimeObj));
}, 1000);
