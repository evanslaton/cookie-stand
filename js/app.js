'use strict';

// Variable/Array declarations
var hoursOfOp = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var allStores = [];
var stores = document.getElementById('stores');
var employees = document.getElementById('employees');
var formEl = document.getElementById('form');
var colorSchemesEl = document.getElementById('color-schemes');
var headerEl = document.getElementById('header');
var anchorEl = document.getElementById('anchor');
var buttonEl = document.getElementById('submit-button');
var footerEl = document.getElementById('footer');

// Store constructor function
function Store(location, minCustomers, maxCustomers, avgCookies) {
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookies = avgCookies;
  this.customersPerHour = [];
  this.employeesNeeded = [];
  this.cookiesPerHour = [];
  this.dailyCookieTotal = 0;
  allStores.push(this);
}

// Generates a random number
Store.prototype.randomNum = function(min, max) {
  return Math.random() * (max - min) + min;
};

// Calculates customers per hour
Store.prototype.calcCustomersPerHour = function() {
  for (var i = 0; i < hoursOfOp.length; i++) {
    this.customersPerHour.push(Math.ceil(this.randomNum(this.minCustomers, this.maxCustomers)));
  }
  // console.log(this.location, this.customersPerHour);
  return this.customersPerHour;
};

// Calculates employees needed per hour
Store.prototype.calcEmployeesNeeded = function() {
  var mustBeGreaterThanTwo;
  for (var i = 0; i < hoursOfOp.length; i++) {
    mustBeGreaterThanTwo = Math.ceil(this.customersPerHour[i] / 20);
    if (mustBeGreaterThanTwo >= 2) {
      this.employeesNeeded.push(Math.ceil(this.customersPerHour[i] / 20));
    } else {
      this.employeesNeeded.push(2);
    }
  }
  // console.log(this.cookiesPerHour);
  return this.employeesNeeded;
};

// Calculates cookies per hour
Store.prototype.calcCookiesPerHour = function() {
  for (var i = 0; i < hoursOfOp.length; i++) {
    this.cookiesPerHour.push(Math.ceil(this.customersPerHour[i] * this.avgCookies));
  }
  // console.log(this.location, this.cookiesPerHour);
  return this.cookiesPerHour;
};

// Calculates daily cookie total
Store.prototype.calcDailyTotalCookies = function() {
  for (var i = 0; i < hoursOfOp.length; i++) {
    this.dailyCookieTotal += this.cookiesPerHour[i];
  }
  // console.log(this.dailyCookieTotal);
  return this.dailyCookieTotal;
};

// Renders to the DOM
Store.prototype.render = function() {
  // Calls functions to calculate property values
  this.customersPerHour = this.calcCustomersPerHour();
  this.employeesNeeded = this.calcEmployeesNeeded();
  this.cookiesPerHour = this.calcCookiesPerHour();
  this.dailyCookieTotal = this.calcDailyTotalCookies();

  createAndAppend('td', this.location, this.cookiesPerHour, this.dailyCookieTotal, stores);
  createAndAppend('td', this.location, this.employeesNeeded, this.dailyCookieTotal, employees);
};

// Creates new th/td, appends to new tr and appends to table
var createAndAppend = function(type, contentOne, contentTwo, contentThree, appendTo) {
  var trEl = document.createElement('tr');
  var tEl = document.createElement(type);
  tEl.textContent = contentOne;
  trEl.appendChild(tEl);

  for (var i = 0; i < hoursOfOp.length; i++) {
    tEl = document.createElement(type);
    tEl.textContent = contentTwo[i];
    trEl.appendChild(tEl);
  }

  if (appendTo !== employees) {
    tEl = document.createElement(type);
    tEl.textContent = contentThree;
    trEl.appendChild(tEl);
  }

  appendTo.appendChild(trEl);
};

// Renders table headers to the DOM
var renderTableHeaders = function() {
  createAndAppend('th', 'Store', hoursOfOp, 'Total', stores);
  createAndAppend('th', 'Store', hoursOfOp, 'Total', employees);
};

// Renders table footers to the DOM
var renderTableFooters = function() {

  var hourlyCookieTotals = [];
  var hourlyEmployeesArray = [];
  var allStoreTotal = 0;

  for (var i = 0; i < hoursOfOp.length; i++) {
    hourlyCookieTotals[i] = 0;
    hourlyEmployeesArray[i] = 0;
    for (var j = 0; j < allStores.length; j++) {
      hourlyCookieTotals[i] += allStores[j].cookiesPerHour[i];
      hourlyEmployeesArray[i] += allStores[j].employeesNeeded[i];
    }
    allStoreTotal += hourlyCookieTotals[i];
  }
  // console.log(hourlyCookieTotals);
  // console.log(allStoreTotal);

  createAndAppend('td', 'Totals', hourlyCookieTotals, allStoreTotal, stores);
  createAndAppend('td', 'Totals', hourlyEmployeesArray, '', employees);
};

// Store locations
new Store('1st and pike', 23, 65, 6.3);
new Store('sea-tac airport', 3, 24, 1.2);
new Store('seattle center', 11, 38, 3.7);
new Store('capitol hill', 20, 38, 2.3);
new Store('alki', 2, 16, 4.6);

// Renders the table
var renderAll = function() {
  renderTableHeaders();
  for (var i = 0; i < allStores.length; i++) {
    allStores[i].render();
  }
  renderTableFooters();
};

// Captures user input and renders new Store
var addUserInputToTable = function(event) {
  event.preventDefault();
  var addNewStore = true;
  var userInput = event.target;
  var branchInput = userInput.branch.value.toLowerCase();
  var minimumCustomersInput = parseInt(userInput.minimumCustomers.value);
  var maximumCustomersInput = parseInt(userInput.maximumCustomers.value);
  var averageCookiesInput = parseFloat(userInput.averageCookies.value);

  // Checks if store already exists and if so updates information
  for (var i = 0; i < allStores.length; i++) {
    if (branchInput === allStores[i].location) {
      addNewStore = false;
      allStores[i].minCustomers = minimumCustomersInput;
      allStores[i].maxCustomers = maximumCustomersInput;
      allStores[i].avgCookies = averageCookiesInput;
      allStores[i].customersPerHour = [];
      allStores[i].employeesNeeded = [];
      allStores[i].cookiesPerHour = [];
      allStores[i].dailyCookieTotal = 0;
    }
  }

  // Adds new store information to the table
  if (addNewStore) {
    new Store(branchInput, minimumCustomersInput, maximumCustomersInput, averageCookiesInput, branchInput);
  }

  // Empties input fields
  userInput.branch.value = null;
  userInput.minimumCustomers.value = null;
  userInput.maximumCustomers.value = null;
  userInput.averageCookies.value = null;

  // Empties and re-renders tables
  stores.innerHTML = '';
  employees.innerHTML = '';
  renderAll();
};

// Adds classes to certain elements to enable different CSS
var changeClassNames = function(colorSchemeClickedOn) {
  headerEl.className = colorSchemeClickedOn;
  anchorEl.className = colorSchemeClickedOn;
  buttonEl.className = colorSchemeClickedOn;
  footerEl.className = colorSchemeClickedOn;
};

// Changes the color scheme of the page
var changeColorScheme = function(event) {
  var colorSchemeClickedOn = event.target.textContent.toLowerCase();

  switch(colorSchemeClickedOn) {
  case 'tiger':
    changeClassNames(colorSchemeClickedOn);
    break;
  case 'ocean':
    changeClassNames(colorSchemeClickedOn);
    break;
  case 'charcoal':
    changeClassNames(colorSchemeClickedOn);
    break;
  case 'eggplant':
    changeClassNames(colorSchemeClickedOn);
  }
};

// Binds addUserInputToTable to formEl
formEl.addEventListener('submit', addUserInputToTable);

// Binds changeColorScheme to colorSchemesEl
colorSchemesEl.addEventListener('click', changeColorScheme);

renderAll();


