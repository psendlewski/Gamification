// Up/Down Buttons
"use strict";
let viewportWidth;

const freeTimeEl = document.querySelector("#free-time");
const studyingEl = document.querySelector("#studying");

const ftBtnUpEl = document.querySelector("#ft-btn-up");
const ftBtnDownEl = document.querySelector("#ft-btn-down");
const sBtnUpEl = document.querySelector("#s-btn-up");
const sBtnDownEl = document.querySelector("#s-btn-down");

// Upgrade Button
const upgradeBtnEl = document.querySelector("#upgrade-btn");

// Date Elements
const dayEl = document.querySelector("#day");
const monthEl = document.querySelector("#month");

const dayNumbersEl = document.querySelector("#day-numbers");

// Display Income & Level
const incomeEl = document.querySelector("#incomeEl");
const levelEl = document.querySelector("#level");

// Progress bar
const progressBgEl = document.querySelector("#progress-background");
const progressBarEl = document.querySelector("#progress-bar");
const expEl = document.querySelector(".exp");

let upgradeCost = 20;
let progressBarWidth;

let freeTime = 0;
let studying = 0;

ftBtnUpEl.addEventListener("click", () => {
  freeTime++;
  freeTimeEl.textContent = freeTime;
});

ftBtnDownEl.addEventListener("click", () => {
  if (freeTime >= 1 && freeTime > studying) freeTime--;
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

// Productivity
let incomePerStudyingHour = 1;
let productivity;
let totalIncomeForStudying;
let currentIncomeForStudying;
let oldIncomeForStudying;
let incomeForStudyingDifference;
let productivityColor;

// Create Current Day Data Object ===============================
let currentDayCalendarData;
let currentFullDate;

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();
const currentDay = currentDate.getDate();

function createCalendarDayDataObject() {
  // Get current Date
  currentFullDate = `${currentYear}-${currentMonth + 1}-${currentDay}`;
  // console.log(currentFullDate); //                                     ******************************

  // Create Current day Data Object
  let currentDayDataObject = {};
  currentDayDataObject.freeTime = freeTime;
  currentDayDataObject.studying = studying;
  currentDayDataObject.productivity =
    studying && freeTime ? ((studying / freeTime) * 100).toFixed(0) : 0;

  // Save Data To Local Storage
  window.localStorage.setItem(
    `${currentFullDate}`,
    JSON.stringify(currentDayDataObject)
  );

  //Save Data to Variable
  currentDayCalendarData = JSON.parse(
    window.localStorage.getItem(`${currentFullDate}`)
  );
  console.log(currentDayCalendarData); //                           ****************************
}
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

      let daysInMonth = getDaysInMonth(currentYear, currentMonth);

      firstDayofAMonth;
      skipFirstDays = firstDayofAMonth > 1 ? firstDayofAMonth - 1 : 7;
      skipLastDays = 35 - skipFirstDays - daysInMonth;

      let dayCounter = 0;
      let currentLoopDayCounter;
      let currentLoopDayEl;
      let currentLoopDate;
      let currentDayLoopObject;

      // ===================================Building the Calendar ========================================================

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

        // Create Cal Day
        let calDay = document.createElement("div");
        calDay.classList.add("cal-day");
        calDay.setAttribute("id", `d${dayCounter}`);
        calDay.textContent = `${i + 1}`;
        dayNumbersEl.appendChild(calDay);
        // console.log(currentLoopDayCounter); //                                       ***************************

        // Set Variables
        currentLoopDayCounter = dayCounter - skipFirstDays;
        currentLoopDayEl = document.querySelector(`#d${dayCounter}`);
        // console.log(  //                                                ***************************************
        //   "dayCounter",
        //   dayCounter,
        //   "currentLoopDayCounter",
        //   currentLoopDayCounter
        // );
        currentLoopDate = `${currentYear}-${
          currentMonth + 1
        }-${currentLoopDayCounter}`;
        currentDayLoopObject = JSON.parse(
          window.localStorage.getItem(`${currentLoopDate}`)
        );

        // console.log(
        //   // ***********************************

        //   "currentLoopDayEl",
        //   currentLoopDayEl,
        //   "currentLoopDate",
        //   currentLoopDate,
        //   "currentDayLoopObject",
        //   currentDayLoopObject
        // );
        //Add Text to Current Day
        let ft = document.createElement("p");
        let s = document.createElement("p");
        let p = document.createElement("p");
        // Productivity and color

        if (currentDayLoopObject) {
          if (
            currentDayLoopObject.studying / currentDayLoopObject.freeTime <
            0.5
          ) {
            productivityColor = "red";
          } else if (
            currentDayLoopObject.studying / currentDayLoopObject.freeTime <
            0.6
          ) {
            productivityColor = "orange";
          } else if (
            currentDayLoopObject.studying / currentDayLoopObject.freeTime <
            0.7
          ) {
            productivityColor = "yellow";
          } else {
            productivityColor = "green";
          }
        }
        // console.log(        //                                            *******************************
        //   "currentDayLoopObject",
        //   currentDayLoopObject,
        //   "productivityColor",
        //   productivityColor
        // );

        if (
          !currentDayLoopObject ||
          !currentDayLoopObject.freeTime ||
          !currentDayLoopObject.studying ||
          !currentDayLoopObject.productivity
        ) {
          ft.innerHTML = `FT: -`;
          s.innerHTML = `S: -`;
          p.innerHTML = `P: -`;
          currentLoopDayEl.appendChild(ft);
          currentLoopDayEl.appendChild(s);
          currentLoopDayEl.appendChild(p);
          currentLoopDayEl.classList.remove("red", "orange", "yellow", "green");
        } else {
          ft.innerHTML = `FT:   ${currentDayLoopObject.freeTime}h`;
          s.innerHTML = `S:   ${currentDayLoopObject.studying}h`;
          p.innerHTML = `P: ${currentDayLoopObject.productivity}%`;
          currentLoopDayEl.appendChild(ft);
          currentLoopDayEl.appendChild(s);
          currentLoopDayEl.appendChild(p);
          currentLoopDayEl.classList.remove("red", "orange", "yellow", "green");
          currentLoopDayEl.classList.add(`${productivityColor}`);
        }
        // console.log("currentLoopDayEl.classList,", currentLoopDayEl.classList); //***************************** */
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

// Add FreeTime & Studying to current day + Save Income From Studying Hours

let saveBtnEl = document.querySelector("#save-btn");

saveBtnEl.addEventListener("click", () => {
  currentIncomeForStudying = studying * incomePerStudyingHour;
  oldIncomeForStudying =
    currentDayCalendarData && currentDayCalendarData.studying
      ? currentDayCalendarData.studying * incomePerStudyingHour
      : 0;
  incomeForStudyingDifference = currentIncomeForStudying - oldIncomeForStudying;

  createCalendarDayDataObject();

  // Change current income for studying
  currentTimeObj.balance += incomeForStudyingDifference;
  console.log("incomeForStudyingDifference", incomeForStudyingDifference); // *************************

  // Save New Balance in Local Storage
  window.localStorage.setItem("pastTimeObj", JSON.stringify(currentTimeObj));
  // Change Border Color depending on productivity
  productivity =
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
  if (currentDayEl.firstChild) currentDayEl.firstChild.remove();
  if (currentDayEl.firstChild) currentDayEl.firstChild.remove();
  if (currentDayEl.firstChild) currentDayEl.firstChild.remove();

  // Add Text to Current Day
  currentDayEl.innerText = dayNr;
  let ft = document.createElement("p");
  ft.innerHTML = `FT:   ${freeTime}h`;
  let s = document.createElement("p");
  s.innerHTML = `S:   ${studying}h`;
  let p = document.createElement("p");
  p.innerHTML = `P: ${productivity}%`;
  currentDayEl.appendChild(ft);
  currentDayEl.appendChild(s);
  currentDayEl.appendChild(p);
  currentDayEl.classList.remove("red", "orange", "yellow", "green");
  currentDayEl.classList.add(productivityColor);
});

// Money Counter
const balanceEl = document.querySelector("#balance");

let monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let balance;

function loadPassiveIncome() {
  if (window.localStorage.getItem("passiveIncomeLevel")) {
    // console.log(//                         **********************
    //   "local storage passive income",
    //   window.localStorage.getItem("passiveIncomeLevel")
    // );
    passiveIncomeLevel = window.localStorage.getItem("passiveIncomeLevel");
    passiveIncome = passiveIncomeLevel * passiveIncomePerLevel;
    // console.log("PassiveIncome", passiveIncome);             //                         **********************
  } else {
    // console.log(                  //                         **********************
    //   "PassiveIncomeLoadFailed",
    //   window.localStorage.getItem("passiveIncome")
    // );
    passiveIncome = passiveIncomeLevel * passiveIncomePerLevel;
    window.localStorage.setItem("passiveIncome", JSON.stringify(passiveIncome));
  }
  if (passiveIncome === 0) {
    // console.log("Passive Income === 0"); //                         **********************
    passiveIncome = passiveIncomeLevel * passiveIncomePerLevel;
    window.localStorage.setItem("passiveIncome", JSON.stringify(passiveIncome));
  }

  if (window.localStorage.getItem("passiveIncomeLevel")) {
    passiveIncomeLevel = parseInt(
      window.localStorage.getItem("passiveIncomeLevel")
    );
  } else {
    console.log(
      "PassiveIncomeLevelLoadFailed",
      window.localStorage.getItem("passiveIncomeLevel")
    );
    passiveIncomeLevel = 1;
    window.localStorage.setItem(
      "passiveIncomeLevel",
      JSON.stringify(passiveIncomeLevel)
    );
  }
  if (passiveIncomeLevel) {
    // console.log(passiveIncome);//                         **********************
    levelEl.textContent = passiveIncomeLevel;
    incomeEl.textContent = `€${passiveIncome.toFixed(2)}/d`;
    // console.log("PassiveIncome", passiveIncome);//                         **********************
    // console.log("PassiveIncomeLevel", passiveIncomeLevel);
  }
}

// Passive Income
let passiveIncomePerLevel = 0.1;
let passiveIncomeLevel;
if (window.localStorage.getItem("passiveIncomeLevel")) {
  passiveIncomeLevel = parseInt(
    window.localStorage.getItem("passiveIncomeLevel")
  );
} else {
  passiveIncomeLevel = 1;
  window.localStorage.setItem(
    "passiveIncomeLevel",
    JSON.stringify(passiveIncomeLevel)
  );
}
let passiveIncome = passiveIncomeLevel * passiveIncomePerLevel;

loadPassiveIncome();
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

// Balance Calc Function ========

function balanceCalc(pastTimeObj, currentTimeObj) {
  // Calculate Time Difference in seconds
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
  // Calculate the difference
  let difference = currentTimeSeconds - pastTimeSeconds;

  // console.log("Old balance:", currentTimeObj.balance); //                         **********************
  // console.log(
  //   "passiveIncome:",
  //   passiveIncome,
  //   "PassiveIncomePerSec",
  //   passiveIncomePerSec
  // );
  // Add Profit
  currentTimeObj.balance =
    pastTimeObj.balance + difference * (passiveIncomePerSec / 2);
  currentTimeObj.balance += passiveIncomePerSec / 2;

  // Save new balance
  window.localStorage.setItem("pastTimeObj", JSON.stringify(currentTimeObj));

  // console.log("New balance:", currentTimeObj.balance); //                         **********************
  // console.log(
  //   "Current Time Seconds:",
  //   currentTimeSeconds,
  //   "Past Time Seconds",
  //   pastTimeSeconds,
  //   "Difference:",
  //   difference,
  //   "Local Storage- pastTimeObj",
  //   window.localStorage.getItem("pastTimeObj")
  // );

  // Display Balance
  if (currentTimeObj.balance) {
    balanceEl.textContent = currentTimeObj.balance.toFixed(6);
    expEl.textContent = `${currentTimeObj.balance.toFixed(1)}/${upgradeCost}`;
  }
  return currentTimeObj.balance;
}

// Load Past Time Object from local memory
function loadPastTimeObj() {
  if (window.localStorage.getItem("pastTimeObj")) {
    let newTimeObject = window.localStorage.getItem("pastTimeObj");

    pastTimeObj = JSON.parse(newTimeObject);
    if (
      !pastTimeObj.month ||
      !pastTimeObj.day ||
      !pastTimeObj.hour ||
      !pastTimeObj.minute ||
      !pastTimeObj.second
    ) {
      pastTimeObj = {
        month: currentTimeObj.month,
        day: currentTimeObj.day,
        hour: currentTimeObj.hour,
        minute: currentTimeObj.minute,
        second: currentTimeObj.second,
      };
      if (!pastTimeObj.balance && currentTimeObj.balance) {
        pastTimeObj.balance = currentTimeObj.balance;
      } else {
        currentTimeObj.balance = parseInt(prompt("Enter a starting balance"));
        pastTimeObj.balance = currentTimeObj.balance;
        window.localStorage.setItem(
          "pastTimeObj",
          JSON.stringify(currentTimeObj)
        );
        updateProgressBar();
      }
    }
  } else {
    console.log("loadPastTimeObj - else"); //                         **********************
    pastTimeObj.month = currentTimeObj.month;
    pastTimeObj.day = currentTimeObj.day;
    pastTimeObj.hour = currentTimeObj.hour;
    pastTimeObj.minute = currentTimeObj.minute;
    pastTimeObj.second = currentTimeObj.second;
    if (currentTimeObj.balance) {
      pastTimeObj.balance = currentTimeObj.balance;
    } else {
      currentTimeObj.balance = parseInt(prompt("Enter a starting balance"));
      pastTimeObj.balance = currentTimeObj.balance;
      window.localStorage.setItem(
        "pastTimeObj",
        JSON.stringify(currentTimeObj)
      );
      // console.log("Created new PastTimeObj"); //                         **********************
      updateProgressBar();
    }
  }
  // Load Passive Income
  if (window.localStorage.getItem("passiveIncomeLevel")) {
    passiveIncomeLevel = parseInt(
      window.localStorage.getItem("passiveIncomeLevel")
    );
  } else {
    console.log("loadPastTimeObj() - passiveIncomeLevel Load Failed"); //                         **********************
    passiveIncomeLevel = 1;
    window.localStorage.setItem(
      "pastTimeObj",
      JSON.stringify(passiveIncomeLevel)
    );
  }

  // console.log("pastTimeObj", pastTimeObj);//                         **********************
  // console.log("currentTimeObj", currentTimeObj);
  // console.log("new time object", newTimeObject);
}

function checkViewportWidth() {
  viewportWidth = window.innerWidth;
  if (viewportWidth < 690) {
    progressBarWidth = 100;
  } else {
    progressBarWidth = 200;
  }
}
// Progress Bar
function updateProgressBar() {
  checkViewportWidth();
  let width;
  if (currentTimeObj.balance) {
    expEl.textContent = `${currentTimeObj.balance.toFixed(1)}/${upgradeCost}`;
    width = progressBarWidth * (currentTimeObj.balance / upgradeCost);
    // console.log("Width:", width);//                         **********************
    if (width < 5) {
      progressBarEl.style.width = `${5}px`;
    } else if (width > 100) {
      progressBarEl.style.width = `${progressBarWidth}px`;
    } else {
      progressBarEl.style.width = `${width}px`;
    }
  }
  if (width >= 100) {
    progressBarEl.classList.add("light-up");
  } else {
    progressBarEl.classList.remove("light-up");
  }
}

// Upgrade Button
upgradeBtnEl.addEventListener("click", () => {
  // Change and export Balance
  if (currentTimeObj.balance >= upgradeCost) {
    currentTimeObj.balance -= upgradeCost;
    pastTimeObj.balance = currentTimeObj.balance;
    window.localStorage.setItem("pastTimeObj", JSON.stringify(currentTimeObj));
    // console.log(window.localStorage.getItem("pastTimeObj")); //                         **********************

    // Change and export passive income levels
    passiveIncomeLevel++;
    passiveIncome = passiveIncomeLevel * passiveIncomePerLevel;

    window.localStorage.setItem("passiveIncome", JSON.stringify(passiveIncome));
    window.localStorage.setItem(
      "passiveIncomeLevel",
      JSON.stringify(passiveIncomeLevel)
    );
    updateProgressBar();
    // console.log(
    //   //                         **********************
    //   "PassiveIncomePerLevel",
    //   passiveIncomePerLevel,
    //   "PassiveIncomeLevel",
    //   passiveIncomeLevel,
    //   "PassiveIncome:",
    //   passiveIncome
    // );

    // Display
    balanceEl.textContent = currentTimeObj.balance.toFixed(6);
    expEl.textContent = `${currentTimeObj.balance.toFixed(1)}/${upgradeCost}`;
    levelEl.textContent = passiveIncomeLevel;
    incomeEl.textContent = `€${passiveIncome.toFixed(2)}/d`;
  }
});

// Function calls on interval
setInterval(() => {
  loadPastTimeObj();
  loadPassiveIncome();
  balanceCalc(pastTimeObj, currentTimeObj);
  updateProgressBar();
}, 500);
