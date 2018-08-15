'use strict';

var hoursOfOp = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var allStores = [];
var stores = document.getElementById('stores');

// Store constructor function
function Store(location, minCustomers, maxCustomers, avgCookies, dailyCookieTotal, id) {
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookies = avgCookies;
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.dailyCookieTotal = 0;
  this.id = id;
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
  // console.log(this.customersPerHour);
  return this.customersPerHour;
};

// Calculates cookies per hour
Store.prototype.calcCookiesPerHour = function() {
  for (var i = 0; i < hoursOfOp.length; i++) {
    this.cookiesPerHour.push(Math.ceil(this.customersPerHour[i] * this.avgCookies));
  }
  // console.log(this.cookiesPerHour);
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
  this.cookiesPerHour = this.calcCookiesPerHour();
  this.dailyCookieTotal = this.calcDailyTotalCookies();

  createAndAppend('td', this.location, this.cookiesPerHour, this.dailyCookieTotal);
};

var createAndAppend = function(type, contentOne, contentTwo, contentThree) {
  var trEl = document.createElement('tr');
  var tEl = document.createElement(type);
  tEl.textContent = contentOne;
  trEl.appendChild(tEl);

  for (var i = 0; i < hoursOfOp.length; i++) {
    tEl = document.createElement(type);
    tEl.textContent = contentTwo[i];
    trEl.appendChild(tEl);
  }

  tEl = document.createElement(type);
  tEl.textContent = contentThree;
  trEl.appendChild(tEl);
  stores.appendChild(trEl);
};

// Renders table headers to the DOM
var renderTableHeaders = function() {
  createAndAppend('th', 'Store', hoursOfOp, 'Total Cookies');
};

// Renders table footers to the DOM
var renderTableFooters = function() {

  var hourlyCookieTotals = [];
  var allStoreTotal = 0;

  for (var i = 0; i < hoursOfOp.length; i++) {
    hourlyCookieTotals[i] = 0;

    for (var j = 0; j < allStores.length; j++) {
      hourlyCookieTotals[i] += allStores[j].cookiesPerHour[i];
    }
    allStoreTotal += hourlyCookieTotals[i];
  }
  // console.log(hourlyCookieTotals);
  // console.log(allStoreTotal);

  createAndAppend('td', 'Totals', hourlyCookieTotals, allStoreTotal);
};

new Store('1st and Pike', 23, 65, 6.3, 'pike');
new Store('SeaTac Airport', 3, 24, 1.2, 'seatac');
new Store('Seattle Center', 11, 38, 3.7, 'seattle');
new Store('Capitol Hill', 20, 38, 2.3, 'capitol');
new Store('Alki', 2, 16, 4.6, 'alki');

var renderAll = function() {
  renderTableHeaders();

  for (var i = 0; i < allStores.length; i++) {
    allStores[i].render();
  }

  renderTableFooters();
};

renderAll();

//Event listener
var formEl = document.getElementById('form');

var addUserInputToTable = function(e) {
  var userInput = e.target;
  var branchInput = userInput.branch.value.toLowerCase();
  var minimumCustomersInput = parseInt(userInput.minimumCustomers.value);
  var maximumCustomersInput = parseInt(userInput.maximumCustomers.value);
  var averageCookiesInput = parseInt(userInput.averageCookies.value);

  new Store(branchInput, minimumCustomersInput, maximumCustomersInput, averageCookiesInput, branchInput);
  console.log(allStores);

  stores.innerHTML = '';

  renderAll();

  e.preventDefault();
};

formEl.addEventListener('submit', addUserInputToTable);