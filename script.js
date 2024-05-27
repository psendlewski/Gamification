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
const monthsEl = document.querySelector("#months");

const dayNumbersEl = document.querySelector("#day-numbers");

// Display Income & Level
const incomeEl = document.querySelector("#incomeEl");
const levelEl = document.querySelector("#level");

// Progress bar
const progressBgEl = document.querySelector("#progress-background");
const progressBarEl = document.querySelector("#progress-bar");
const expEl = document.querySelector(".exp");

const editCloseBtnEl = document.querySelector("#edit-close-btn");

// const editSaveBtn = document.querySelector("#edit-save-btn");
let editSaveBtn;

let progressBarWidth;

let freeTime;
let studying;

// Date
let dayNr;
let dayNrId;
let dayOfAWeek;
let dayOfAWeekNr;
let monthNr;
let month;
let time;
let dataObject = {};
let yearDataObject = {
  1: { ft: 0, s: 0, p: 0 },
  2: { ft: 0, s: 0, p: 0 },
  3: { ft: 0, s: 0, p: 0 },
  4: { ft: 0, s: 0, p: 0 },
  5: { ft: 0, s: 0, p: 0 },
  6: { ft: 0, s: 0, p: 0 },
  7: { ft: 0, s: 0, p: 0 },
  8: { ft: 0, s: 0, p: 0 },
  9: { ft: 0, s: 0, p: 0 },
  10: { ft: 0, s: 0, p: 0 },
  11: { ft: 0, s: 0, p: 0 },
  12: { ft: 0, s: 0, p: 0 },
};

let firstDayofAMonth;
let skipFirstDays;
let skipLastDays;

let currentDayEl;

// Productivity
let productivity;
let productivityBonus;
let productivityBonusCounter = 0;
let totalIncomeForStudying;
let currentIncomeForStudying;
let oldIncomeForStudying;
let incomeForStudyingDifference;
let productivityColor;
let monthDays;

const bonusValueEl = document.querySelector("#bonusValue");

// =============Create Current Day Data Object ===============================
let currentDayCalendarData;
let currentFullDate;

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();
let currentDayOfWeek = currentDate.getDay();
// console.log("currentDayOfWeek", currentDayOfWeek);//    ***************************** */

dayNr = currentDay;
dayOfAWeekNr = currentDayOfWeek;
monthNr = currentMonth + 1;

// let balance;
let balance;

let currentTimeObj = {
  month: currentDate.getMonth(),
  day: currentDate.getDate(),
  hour: currentDate.getHours(),
  minute: currentDate.getMinutes(),
  second: currentDate.getSeconds(),
  balance,
};
let pastTimeObj = {};

// Edit Current Date data
let currentEditDayId;
let currentEditDay;

let currentEditMonthId;
let currentEditMonth;

let editFreeTimeEl = document.querySelector("#edit-free-time");
let editStudyingEl = document.querySelector("#edit-studying");
let editWindowEl = document.querySelector("#edit-window");
let editCurrentDateEl = document.querySelector("#edit-current-date");

// Settings Window
const settingsBtnEl = document.querySelector("#settings-btn");

const settingsWindowEl = document.querySelector("#settings-window");
const settingsCloseBtnEl = document.querySelector("#settings-close-btn");
const settingsSaveBtnEl = document.querySelector("#settings-save-btn");

const settingsBalanceEl = document.querySelector("#settings-balance");
const settingsIncomeStudyingEl = document.querySelector(
  "#settings-income-studying"
);
const settingsUpgradeCostEl = document.querySelector("#settings-upgrade-cost");
const settingsUpgradeIncomeEl = document.querySelector(
  "#settings-upgrade-income"
);

// Settings Object
let settingsObject;

if (window.localStorage.getItem("settingsObject")) {
  settingsObject = JSON.parse(window.localStorage.getItem("settingsObject"));
} else {
  settingsObject = {
    incomePerStudyingHour: 1,
    upgradeCost: 20,
    passiveIncomePerLevel: 0.1,
  };
  window.localStorage.setItem("settingsObject", JSON.stringify(settingsObject));
}

loadCalendarDayDataObject();

//======================== Arrow Buttons ===========================
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

// =======================================Load Calendar Data Object ================================
function loadCalendarDayDataObject() {
  currentFullDate = `${currentYear}-${currentMonth + 1}-${currentDay}`;

  // Load Data from Local Storage & Set Freetime and Studying Variable
  currentDayCalendarData = JSON.parse(
    window.localStorage.getItem(`${currentFullDate}`)
  );
  freeTime =
    currentDayCalendarData && currentDayCalendarData.freeTime
      ? currentDayCalendarData.freeTime
      : 0;
  studying =
    currentDayCalendarData && currentDayCalendarData.studying
      ? currentDayCalendarData.studying
      : 0;

  // Display FreeTime & Studying
  freeTimeEl.textContent = freeTime;
  studyingEl.textContent = studying;
}
// Testing Data for createCalendarDayDataObject
// let randomDayData = Math.floor(Math.random() * 10) + 1;

// function testingDayData() {
//   let currentDayDataObject = {};

//   let year = currentYear;
//   let month = currentMonth;
//   let day = currentDay;

//   for (let i = 1; i < currentDay; i++) {
//     let currentFullDate = `${currentYear}-${currentMonth + 1}-${i}`;

//     currentDayDataObject.freeTime = randomDayData;
//     randomDayData = Math.floor(Math.random() * 10);
//     currentDayDataObject.studying = randomDayData / 2 + 1;
//     currentDayDataObject.productivity = (
//       (currentDayDataObject.studying / currentDayDataObject.freeTime) *
//       100
//     ).toFixed(0);

//     window.localStorage.setItem(
//       `${currentFullDate}`,
//       JSON.stringify(currentDayDataObject)
//     );
//     console.log(currentFullDate, currentDayDataObject);
//   }
// }
// testingDayData();

// =============================== Create Calendar Data For Each Single Day =====================================

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
  // console.log(currentDayCalendarData); //                           ****************************
}

// Extract date and time from the response

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

// Displaying date
dayEl.textContent = dayNr;
monthEl.textContent = month;

// ==================================================Building The Calendar======================================

// ===========================Getting First Day Of Month ============================

function getFirstDayOfMonth(dayOfAWeekNr, dayOfMonth) {
  // console.log("dayOfAWeekNr", dayOfAWeekNr, "dayOfMonth", dayOfMonth); // ********************

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
// console.log("firstDayofAMonth", firstDayofAMonth); // ******************************

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

// ===================================Building the Month Calendar ========================================================

// Skip first days
function buildCalendars() {
  // Remove all elements in #Months div
  for (let i = 0; i < 12; i++) {
    if (monthsEl.firstChild) monthsEl.firstChild.remove();
  }
  // Remove all elements in #day-numbers div
  for (let i = 0; i < 35; i++) {
    if (dayNumbersEl.firstChild) dayNumbersEl.firstChild.remove();
  }

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
    // console.log(
    //   //                                                ***************************************
    //   "dayCounter",
    //   dayCounter,
    //   "currentLoopDayCounter",
    //   currentLoopDayCounter
    // );
    currentLoopDate = `${currentYear}-${
      currentMonth + 1
    }-${currentLoopDayCounter}`;
    // console.log(currentLoopDate); //               * ********************************
    if (window.localStorage.getItem(`${currentLoopDate}`)) {
      currentDayLoopObject = JSON.parse(
        window.localStorage.getItem(`${currentLoopDate}`)
      );
    } else {
      currentDayLoopObject = {
        freeTime: 0,
        studying: 0,
        productivity: 0,
      };
    }

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
      if (currentDayLoopObject.studying / currentDayLoopObject.freeTime < 0.5) {
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

    if (!currentDayLoopObject || !currentDayLoopObject.freeTime) {
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

  // ===================================Building the Year Calendar ========================================================
  let currentMonthName;
  let currentMonthEl;
  let monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let currentMonthLoop;
  let currentDayLoop;

  let currentDateObject;
  let currentMonthDataObject = {
    ft: 0,
    s: 0,
    p: 0,
  };
  let currentLoopFullDate;
  // Loop Through all Dates and Save Data to current Month

  for (let i = 0; i < 12; i++) {
    currentMonthLoop = i;
    // console.log("currentMonthLoop", currentMonthLoop); //            ********************
    for (let j = 0; j < monthDays[i]; j++) {
      // console.log(monthDays[i]);
      // console.log("currentDayLoop", j); //            ********************
      currentLoopFullDate = `${currentYear}-${currentMonthLoop + 1}-${j + 1}`;

      if (window.localStorage.getItem(`${currentLoopFullDate}`)) {
        // console.log("Current Date Object Found!)", currentLoopFullDate);
        // console.log(
        //   "Current Date Loop Data Object",
        //   window.localStorage.getItem(`${currentLoopFullDate}`) //                         ********************
        // );
        //Load Current Date Data Object
        currentDateObject = JSON.parse(
          window.localStorage.getItem(`${currentLoopFullDate}`)
        );
        // console.log("currentDateObject", currentDateObject); //                ********************
        if (currentDateObject.freeTime || currentDateObject.studying) {
          // Add Values To currentMonthDataObject
          if (
            currentDateObject.freeTime &&
            currentDateObject.freeTime >= 1 &&
            currentDateObject.freeTime < 1000
          )
            currentMonthDataObject.ft += parseInt(currentDateObject.freeTime);
          // console.log("currentDateObject.freeTime", currentDateObject.freeTime); // ************
          // console.log("currentMonthDataObject.ft ", currentMonthDataObject.ft); // ************
          if (
            currentDateObject.studying &&
            currentDateObject.studying >= 1 &&
            currentDateObject.studying < 1000
          )
            currentMonthDataObject.s += parseInt(currentDateObject.studying);
        }
      } else {
        // console.log("No Current Date Object)", currentLoopFullDate);
        currentDateObject = {
          studying: 0,
          freeTime: 0,
        };
        // console.log("currentMonthDataObject", currentMonthDataObject);
        // console.log("currentDateObject", currentDateObject);
      }
      // console.log(
      //   //                       ********************************
      //   "No Data Object for Current Day (",
      //   "Month:",
      //   i,
      //   "day:",
      //   j,
      //   ")"
      // );

      currentDayLoop++;
    }

    // Adding Collected Data To yearDataObject

    // console.log("yearDataObject", yearDataObject); //  ****************************

    // Saving Month Name to Variable
    switch (i + 1) {
      case 1:
        currentMonthName = "January";
        break;
      case 2:
        currentMonthName = "February";
        break;
      case 3:
        currentMonthName = "March";
        break;
      case 4:
        currentMonthName = "April";
        break;
      case 5:
        currentMonthName = "May";
        break;
      case 6:
        currentMonthName = "June";
        break;
      case 7:
        currentMonthName = "July";
        break;
      case 8:
        currentMonthName = "August";
        break;
      case 9:
        currentMonthName = "September";
        break;
      case 10:
        currentMonthName = "October";
        break;
      case 11:
        currentMonthName = "November";
        break;
      case 12:
        currentMonthName = "December";
        break;
      default:
        console.log(`Wrong month number format`);
    }
    // Creating Div Element and Adding it to a page

    // Create Cal Day
    let calMonth = document.createElement("div");
    calMonth.classList.add("cal-month");
    calMonth.setAttribute("id", `m${i + 1}`);
    calMonth.textContent = `${currentMonthName}`;
    calMonth.classList.add("month");
    monthsEl.appendChild(calMonth);
    currentMonthEl = document.querySelector(`#m${i + 1}`);
    // console.log(currentLoopDayCounter); //                                       ***************************

    let productivityColor;
    if (currentMonthDataObject) {
      if (currentMonthDataObject.s / currentMonthDataObject.ft < 0.5) {
        productivityColor = "red";
      } else if (currentMonthDataObject.s / currentMonthDataObject.ft < 0.6) {
        productivityColor = "orange";
      } else if (currentMonthDataObject.s / currentMonthDataObject.ft < 0.7) {
        productivityColor = "yellow";
      } else {
        productivityColor = "green";
      }
    }
    if (currentMonthDataObject.s) {
      currentMonthEl.classList.add(`${productivityColor}`);
    }
    //Add Text to Current Month
    let ft = document.createElement("p");
    let s = document.createElement("p");
    let p = document.createElement("p");

    // Add Classes
    ft.classList.add("bonus");
    s.classList.add("bonus");
    p.classList.add("bonus");

    if (
      !currentMonthDataObject ||
      !currentMonthDataObject.ft ||
      !currentMonthDataObject.s
    ) {
      ft.innerHTML = `FT: -`;
      s.innerHTML = `S: -`;
      p.innerHTML = `P: -`;
      currentMonthEl.appendChild(ft);
      currentMonthEl.appendChild(s);
      currentMonthEl.appendChild(p);
    } else {
      ft.innerHTML = `FT:   ${currentMonthDataObject.ft}h`;
      s.innerHTML = `S: &nbsp;  ${currentMonthDataObject.s}h`;
      p.innerHTML = `P:&nbsp;&nbsp; ${(
        (currentMonthDataObject.s / currentMonthDataObject.ft) *
        100
      ).toFixed(0)}%`;

      currentMonthEl.appendChild(ft);
      currentMonthEl.appendChild(s);
      currentMonthEl.appendChild(p);
    }
    yearDataObject[i + 1].ft = currentMonthDataObject.ft;
    yearDataObject[i + 1].s = currentMonthDataObject.s;
    currentMonthDataObject.ft = 0;
    currentMonthDataObject.s = 0;

    // Save Year Data to local storage
    window.localStorage.setItem(
      "yearDataObject",
      JSON.stringify(yearDataObject)
    );
    // console.log("yearDataObject", yearDataObject);
  }
  // Add FreeTime & Studying to current day + Save Income From Studying Hours
  dayCounter = 0;
}
buildCalendars();

let saveBtnEl = document.querySelector("#save-btn");

saveBtnEl.addEventListener("click", () => {
  currentIncomeForStudying = studying * settingsObject.incomePerStudyingHour;
  oldIncomeForStudying =
    currentDayCalendarData && currentDayCalendarData.studying
      ? currentDayCalendarData.studying * settingsObject.incomePerStudyingHour
      : 0;
  incomeForStudyingDifference = currentIncomeForStudying - oldIncomeForStudying;

  createCalendarDayDataObject();

  // Change current income for studying
  currentTimeObj.balance += incomeForStudyingDifference;
  // console.log("incomeForStudyingDifference", incomeForStudyingDifference); // *************************

  // Save New Balance in Local Storage
  window.localStorage.setItem("pastTimeObj", JSON.stringify(currentTimeObj));
  // console.log(window.localStorage.getItem("pastTimeObj")); //********************************* */

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

monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function loadPassiveIncome() {
  if (window.localStorage.getItem("passiveIncomeLevel")) {
    // console.log(//                         **********************
    //   "local storage passive income",
    //   window.localStorage.getItem("passiveIncomeLevel")
    // );
    passiveIncomeLevel = window.localStorage.getItem("passiveIncomeLevel");
    passiveIncome = passiveIncomeLevel * settingsObject.passiveIncomePerLevel;
    // console.log("PassiveIncome", passiveIncome);             //                         **********************
  } else {
    // console.log(                  //                         **********************
    //   "PassiveIncomeLoadFailed",
    //   window.localStorage.getItem("passiveIncome")
    // );
    passiveIncome = passiveIncomeLevel * settingsObject.passiveIncomePerLevel;
    window.localStorage.setItem("passiveIncome", JSON.stringify(passiveIncome));
  }
  if (passiveIncome === 0) {
    // console.log("Passive Income === 0"); //                         **********************
    passiveIncome = passiveIncomeLevel * settingsObject.passiveIncomePerLevel;
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
let passiveIncome = passiveIncomeLevel * settingsObject.passiveIncomePerLevel;

loadPassiveIncome();
let passiveIncomePerSec = passiveIncome / 24 / 60 / 60;

// ==================================================Balance Calc Function ================================================

function balanceCalc(pastTimeObj, currentTimeObj) {
  // Update current Time
  currentDate = new Date();

  currentTimeObj.month = currentDate.getMonth();
  currentTimeObj.day = currentDate.getDate();
  currentTimeObj.hour = currentDate.getHours();
  currentTimeObj.minute = currentDate.getMinutes();
  currentTimeObj.second = currentDate.getSeconds();

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
  let productivityBonusPerSecond;
  if (productivityBonus > 0) {
    productivityBonusPerSecond =
      (productivityBonus * passiveIncome) / 24 / 60 / 12;
  } else {
    productivityBonusPerSecond = 0;
  }
  // console.log( //                                  **********************
  //   "productivityBonus",
  //   productivityBonus,
  //   "passiveIncome",
  //   passiveIncome,
  //   "productivityBonusPerSecond",
  //   productivityBonusPerSecond
  // );

  // console.log(productivityBonusCounter); //                    *************************

  if (productivityBonusCounter >= 9) {
    productivityBonusCounter = 0;
    currentTimeObj.balance += productivityBonusPerSecond;
    // console.log("productivity Bonus add!");
  }

  productivityBonusCounter++;

  if (window.localStorage.getItem("passiveIncome"))
    passiveIncome = window.localStorage.getItem("passiveIncome");
  passiveIncomePerSec = passiveIncome / 24 / 60 / 60;
  // console.log(
  //   "passiveIncome",
  //   passiveIncome,
  //   "passiveIncomePerSec",
  //   passiveIncomePerSec
  // );

  currentTimeObj.balance =
    pastTimeObj.balance + difference * (passiveIncomePerSec / 2);
  // console.log("passiveIncomePerSec", passiveIncomePerSec);

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
    balanceEl.textContent = `€${currentTimeObj.balance.toFixed(7)}`;
    expEl.textContent = `${currentTimeObj.balance.toFixed(1)}/${
      settingsObject.upgradeCost
    }`;
  }
  return currentTimeObj.balance;
}

// Load Past Time Object from local memory
function loadPastTimeObj() {
  if (!window.localStorage.getItem("pastTimeObj")) {
    currentTimeObj.balance = parseInt(prompt("Enter a starting balance"));
    pastTimeObj = currentTimeObj;
    window.localStorage.setItem("pastTimeObj", JSON.stringify(currentTimeObj));
  } else {
    let newTimeObject = window.localStorage.getItem("pastTimeObj");
    pastTimeObj = JSON.parse(newTimeObject);
  }
  if (!pastTimeObj.balance && currentTimeObj.balance) {
    pastTimeObj.balance = currentTimeObj.balance;
  } else if (!pastTimeObj.balance && !currentTimeObj.balance) {
    currentTimeObj.balance = parseInt(prompt("Enter a starting balance"));
    pastTimeObj.balance = currentTimeObj.balance;
    window.localStorage.setItem("pastTimeObj", JSON.stringify(currentTimeObj));
  }
  updateProgressBar();

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
}

// console.log("pastTimeObj", pastTimeObj); //                         **********************
// console.log("currentTimeObj", currentTimeObj);

function checkViewportWidth() {
  viewportWidth = window.innerWidth;
  if (viewportWidth < 690) {
    progressBarWidth = 100;
  } else {
    progressBarWidth = 200;
  }
}
// =================Progress Bar====================
function updateProgressBar() {
  checkViewportWidth();
  let width;
  if (currentTimeObj.balance) {
    expEl.textContent = `${currentTimeObj.balance.toFixed(1)}/${
      settingsObject.upgradeCost
    }`;
    width =
      progressBarWidth * (currentTimeObj.balance / settingsObject.upgradeCost);
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

// ================================Upgrade Button================================
upgradeBtnEl.addEventListener("click", () => {
  // Change and export Balance
  if (currentTimeObj.balance >= settingsObject.upgradeCost) {
    currentTimeObj.balance -= settingsObject.upgradeCost;
    pastTimeObj.balance = currentTimeObj.balance;
    window.localStorage.setItem("pastTimeObj", JSON.stringify(currentTimeObj));
    // console.log(window.localStorage.getItem("pastTimeObj")); //                         **********************

    // console.log(
    //   "Old Passive Income Level:",
    //   passiveIncomeLevel,
    //   "Old Passive Income:",
    //   passiveIncome
    // ); // *******************
    // Change and export passive income levels
    passiveIncomeLevel++;
    passiveIncome = passiveIncomeLevel * settingsObject.passiveIncomePerLevel;
    // console.log(
    //   "New Passive Income Level:",
    //   passiveIncomeLevel,
    //   "New Passive Income:",
    //   passiveIncome
    // ); // *********************

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
    balanceEl.textContent = `€${currentTimeObj.balance.toFixed(7)}`;
    expEl.textContent = `${currentTimeObj.balance.toFixed(1)}/${
      settingsObject.upgradeCost
    }`;
    levelEl.textContent = passiveIncomeLevel;
    incomeEl.textContent = `€${passiveIncome.toFixed(2)}/d`;
  }
});
// ================================Calculate Productivity Bonus================================
function calcProductivityBonus() {
  let loopFullDate;
  let loopDataObject;

  // Calculate Bonus
  let startingDay = currentDay > 7 ? currentDay - 7 : 1;
  let bonusSum = 0;
  let bonusAverage;
  let productivity;

  for (let i = 0; i <= 7; i++) {
    loopFullDate = `${currentYear}-${currentMonth + 1}-${startingDay + i}`;
    // console.log("loopFullDate", loopFullDate); //              ***************************
    loopDataObject = JSON.parse(window.localStorage.getItem(`${loopFullDate}`));
    // console.log(i, loopDataObject); // **************************
    if (loopDataObject && loopDataObject.studying && loopDataObject.freeTime) {
      productivity = loopDataObject.studying / loopDataObject.freeTime;
    } else {
      productivity = 0;
    }

    bonusSum += productivity;
    // console.log("bonusSum", bonusSum); //                    ***********************************
  }
  bonusAverage = bonusSum / 7;
  productivityBonus = (bonusAverage - 0.5).toFixed(2);

  // console.log("passiveIncomePerSec", passiveIncomePerSec);
  // console.log("productivity", productivity);
  // console.log("startingDay", startingDay);
  // console.log("bonusAverage", bonusAverage);
  // console.log("bonusSum", bonusSum);
  // console.log("productivityBonus", productivityBonus); //                         ***********************

  // Display Bonus:
  if (productivityBonus > 0) {
    bonusValueEl.textContent = `+ ${(productivityBonus * 100).toFixed(0)}%`;
  } else {
    bonusValueEl.textContent = `0%`;
  }
}

// ===================Add Edit- Days Function=====================
function addEditorToPastDays() {
  for (let i = 0; i <= currentDay; i++) {
    let currentDayEl = document.querySelector(`#d${i + 1}`);
    // console.log(currentDayEl);
    currentDayEl.classList.add("edit-past");

    currentDayEl.addEventListener("click", () => {
      // Display Edit window
      editWindowEl.style = "display: flex";

      // Get Day Number From Current Element Id and save it to external variable
      let currentDayId = String(currentDayEl.attributes.id.value);
      currentEditDay =
        parseInt(currentDayId.replace(/\D/g, "")) - skipFirstDays;
      // console.log(currentEditDayId);

      // Change Date inside edit window
      editCurrentDateEl.innerHTML = `${currentEditDay} ${month}`;

      // Check current day object for data
      let currentDate = `${currentYear}-${currentMonth + 1}-${currentEditDay}`;
      // console.log(currentDate);
      if (window.localStorage.getItem(currentDate)) {
        console.log("Object exist in local memory");
        let currentDateObject = JSON.parse(
          window.localStorage.getItem(currentDate)
        );
        console.log(currentDateObject);

        // Display proper data in edit window
        editFreeTimeEl.value = currentDateObject.freeTime;
        editStudyingEl.value = currentDateObject.studying;
      } else {
        editFreeTimeEl.value = 0;
        editStudyingEl.value = 0;
      }
    });
  }

  // Add Save Button Element
  editSaveBtn = document.createElement("button");
  editSaveBtn.attributes.id = "edit-save-btn";
  editSaveBtn.innerHTML = "&#128190;";
  editSaveBtn.classList.add("save-btn");
  editWindowEl.appendChild(editSaveBtn);

  // console.log(editSaveBtn);

  // Save Btn Event Listener
  editSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let currentDate = `${currentYear}-${currentMonth + 1}-${currentEditDay}`;
    let currentDayDataObj = {};
    currentDayDataObj.freeTime = editFreeTimeEl.value;
    currentDayDataObj.studying = editStudyingEl.value;
    currentDayDataObj.productivity =
      editFreeTimeEl.value && editStudyingEl.value
        ? ((editStudyingEl.value / editFreeTimeEl.value) * 100).toFixed(0)
        : 0;
    // Save Data To Local Storage
    window.localStorage.setItem(
      `${currentDate}`,
      JSON.stringify(currentDayDataObj)
    );
    // console.log(
    //   "currentDate",
    //   currentDate,
    //   "currentDayDataObject",
    //   currentDayDataObj
    // );

    // Remove the SaveBtnEl
    editSaveBtn.remove();

    // Close Window
    editWindowEl.style = "display:none;";
    buildCalendars();
    addEditorToPastDays();
    addEditorToPastMonths();
  });
}
addEditorToPastDays();

// ===================Add Edit- Months Function==================

function addEditorToPastMonths() {
  // console.log(currentMonth);
  for (let i = 0; i < currentMonth; i++) {
    let currentMonthEl = document.querySelector(`#m${i + 1}`);
    // console.log(currentMonthEl);
    currentMonthEl.classList.add("edit-past");

    currentMonthEl.addEventListener("click", () => {
      // Display Edit window
      editWindowEl.style = "display: flex";

      currentEditMonth = 0;

      // Saving Month Name to Variable
      switch (i + 1) {
        case 1:
          currentEditMonth = "January";
          break;
        case 2:
          currentEditMonth = "February";
          break;
        case 3:
          currentEditMonth = "March";
          break;
        case 4:
          currentEditMonth = "April";
          break;
        case 5:
          currentEditMonth = "May";
          break;
        case 6:
          currentEditMonth = "June";
          break;
        case 7:
          currentEditMonth = "July";
          break;
        case 8:
          currentEditMonth = "August";
          break;
        case 9:
          currentEditMonth = "September";
          break;
        case 10:
          currentEditMonth = "October";
          break;
        case 11:
          currentEditMonth = "November";
          break;
        case 12:
          currentEditMonth = "December";
          break;
        default:
          console.log(`Wrong month number format`);
      }

      // Change Date inside edit window
      editCurrentDateEl.innerHTML = `${currentEditMonth}`;

      // Check Year object for data
      let currentMonthDataObj = yearDataObject[i + 1];
      // console.log("currentMonthDataObj", currentMonthDataObj);
      // console.log(currentEditMonth);
      // Save Btn Event Listener

      // Display Values in edit window
      editFreeTimeEl.value = currentMonthDataObj.ft;
      editStudyingEl.value = currentMonthDataObj.s;

      // Add Save Button Element
      editSaveBtn = document.createElement("button");
      editSaveBtn.attributes.id = "edit-save-btn";
      editSaveBtn.innerHTML = "&#128190;";
      editSaveBtn.classList.add("save-btn");
      editWindowEl.appendChild(editSaveBtn);

      editSaveBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // Calculate the difference between yearDataObject
        let monthDifference = { ft: 0, s: 0 };
        let currentMonthFirstDay = `${currentYear}-${i + 1}-1`;
        let currentMonthFirstDayDataObj;

        console.log("currentMonthFirstDay", currentMonthFirstDay);

        // Load First Day of the month data from local storage and save in currentMonthFirstDayDataObj
        if (window.localStorage.getItem(currentMonthFirstDay)) {
          currentMonthFirstDayDataObj = JSON.parse(
            window.localStorage.getItem(currentMonthFirstDay)
          );
        } else {
          currentMonthFirstDayDataObj = {
            freeTime: 0,
            studying: 0,
            productivity: 0,
          };
        }

        // Calculate The Difference between Edit Window values and yearDataObj and save to monthDifference
        monthDifference.ft = editFreeTimeEl.value - yearDataObject[i + 1].ft;
        monthDifference.s = editStudyingEl.value - yearDataObject[i + 1].s;

        // console.log("yearDataObject", yearDataObject);
        // console.log("monthDifference", monthDifference);

        // Add Difference to First Day Data Object
        currentMonthFirstDayDataObj.freeTime += monthDifference.ft;
        currentMonthFirstDayDataObj.studying += monthDifference.s;
        currentMonthFirstDayDataObj.productivity =
          currentMonthFirstDayDataObj.freeTime &&
          currentMonthFirstDayDataObj.studying
            ? (
                (currentMonthFirstDayDataObj.studying /
                  currentMonthFirstDayDataObj.freeTime) *
                100
              ).toFixed(0)
            : 0;

        console.log("currentMonthFirstDayDataObj", currentMonthFirstDayDataObj);

        // Clear monthDifference
        monthDifference.ft = 0;
        monthDifference.s = 0;

        // *****************
        // Save Data To Local Storage
        window.localStorage.setItem(
          `${currentMonthFirstDay}`,
          JSON.stringify(currentMonthFirstDayDataObj)
        );
        console.log(
          "First April 2024 - local storage-",
          window.localStorage.getItem("2024-4-1")
        );
        // console.log("currentMonthFirstDay", currentMonthFirstDay);
        // console.log("currentMonthFirstDayDataObj", currentMonthFirstDayDataObj);

        // console.log(
        //   "currentDate",
        //   currentDate,
        //   "currentMonthDataObject",
        //   currentMonthDataObj
        // );
        editSaveBtn.remove();
        // Close Window
        editWindowEl.style = "display:none;";
        buildCalendars();
        addEditorToPastDays();
        addEditorToPastMonths();

        // Remove the SaveBtnEl
      });

      addEditorToPastMonths();

      // Display proper data in edit window
      editFreeTimeEl.value = currentMonthDataObj.ft;
      editStudyingEl.value = currentMonthDataObj.s;
    });
  }
}
addEditorToPastMonths();

// Edit - Close Button
editCloseBtnEl.addEventListener("click", () => {
  editWindowEl.style = "display: none;";
});

// Open Settings Window
settingsBtnEl.addEventListener("click", () => {
  console.log("Settings Btn");
  settingsWindowEl.style = "display:flex";

  // Display suggested values
  settingsBalanceEl.value = 0;
  settingsIncomeStudyingEl.value = settingsObject.incomePerStudyingHour;
  settingsUpgradeCostEl.value = settingsObject.upgradeCost;
  settingsUpgradeIncomeEl.value = settingsObject.passiveIncomePerLevel;

  // Settings Save Button
  settingsSaveBtnEl.addEventListener("click", (e) => {
    e.preventDefault();
    // Add/substract balance
    currentTimeObj.balance += parseInt(settingsBalanceEl.value);

    // Add new settings to settingsObject
    settingsObject.incomePerStudyingHour = settingsIncomeStudyingEl.value;
    settingsObject.upgradeCost = settingsUpgradeCostEl.value;
    settingsObject.passiveIncomePerLevel = settingsUpgradeIncomeEl.value;

    // Save settingsObject to LocalStorage
    window.localStorage.setItem("pastTimeObj", JSON.stringify(currentTimeObj));
    window.localStorage.setItem(
      "settingsObject",
      JSON.stringify(settingsObject)
    );

    // Calculate New Balance
    pastTimeObj.balance = currentTimeObj.balance;
    balanceCalc(pastTimeObj, currentTimeObj);

    // Display New Balance

    // Close Settings Window
    settingsWindowEl.style = "display:none";
  });
});
// Close settings window
settingsCloseBtnEl.addEventListener("click", () => {
  settingsWindowEl.style = "display:none";
});

// Function calls on interval
setInterval(() => {
  loadPastTimeObj();
  loadPassiveIncome();
  calcProductivityBonus();
  balanceCalc(pastTimeObj, currentTimeObj);
  updateProgressBar();
}, 500);
