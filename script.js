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

const dayNumbersEl = document.querySelector("#dayNumbers");

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
  studying++;
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

const currentDayEl = document.querySelector(dayNrId);

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

      console.log("First Day of the Month:", firstDayofAMonth); // Output: 3

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
      console.log(firstDayofAMonth, skipFirstDays, skipLastDays);

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
          console.log(`Created Inactive day Nr ${dayCounter}`);
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
        console.log(`Created Calendar day Nr ${dayCounter}`);
      }
      // Skip last days
      for (let i = 0; i < skipLastDays; i++) {
        dayCounter++;
        let inactDay = document.createElement("div");
        inactDay.classList.add("inact-day");
        inactDay.setAttribute("id", `d${dayCounter}`);
        dayNumbersEl.appendChild(inactDay);
        console.log(`Created Calendar day Nr ${dayCounter}`);
      }
      // light up a current day
      //**************************************** */
      dayNrId = `#d${dayNr}`;
      currentDayEl.classList.add("act-day");
      console.log(dayNrId);
      console.log(currentDayEl);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

fetchData();

// Money Counter
const balanceEl = document.querySelector("#balance");
let balance = 215.36;
let passiveIncome = 1;

setInterval(() => {
  let incomePerSecond = passiveIncome / 24 / 60 / 60;
  balance += incomePerSecond;
  balanceEl.textContent = `€${balance.toFixed(5)}`;
}, 1000);
