'use strict';

var hoursOfOp = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

var allStores = [];
var stores = document.getElementById('stores');

// Store constructor function
function Store(location, minCustomers, maxCustomers, avgCookies, customersPerHour, cookiesPerHour, dailyCookieTotal, id) {
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookies = avgCookies;
  this.customersPerHour = customersPerHour;
  this.cookiesPerHour = cookiesPerHour;
  this.dailyCookieTotal = dailyCookieTotal;
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
  console.log(this.customersPerHour);
  return this.customersPerHour;
};

// Calculates cookies per hour
Store.prototype.calcCookiesPerHour = function() {
  for (var i = 0; i < hoursOfOp.length; i++) {
    this.cookiesPerHour.push(Math.ceil(this.customersPerHour[i] * this.avgCookies));
  }
  console.log(this.cookiesPerHour);
  return this.cookiesPerHour;
};

// Calculates daily cookie total
Store.prototype.calcDailyTotalCookies = function() {
  for (var i = 0; i < hoursOfOp.length; i++) {
    this.dailyCookieTotal += this.cookiesPerHour[i];
  }
  console.log(this.dailyCookieTotal);
  return this.dailyCookieTotal;
};

// Renders table headers to the DOM
var renderTableHeaders = function() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Store';
  trEl.appendChild(thEl);

  for (var i = 0; i < hoursOfOp.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = hoursOfOp[i];
    trEl.appendChild(thEl);
  }

  thEl = document.createElement('th');
  thEl.textContent = 'Total Cookies';
  trEl.appendChild(thEl);
  stores.appendChild(trEl);
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
  console.log(hourlyCookieTotals);
  console.log(allStoreTotal);

  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Totals';
  trEl.appendChild(tdEl);

  for (var k = 0; k < hoursOfOp.length; k++) {
    tdEl = document.createElement('td');
    tdEl.textContent = hourlyCookieTotals[k];
    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  tdEl.textContent = allStoreTotal;
  trEl.appendChild(tdEl);
  stores.appendChild(trEl);
};

// Renders to the DOM
Store.prototype.render = function() {
  // Calls functions to calculate property values
  this.customersPerHour = this.calcCustomersPerHour();
  this.cookiesPerHour = this.calcCookiesPerHour();
  this.dailyCookieTotal = this.calcDailyTotalCookies();

  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.location;
  trEl.appendChild(tdEl);

  for (var i = 0; i < hoursOfOp.length; i++) {
    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesPerHour[i];
    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  tdEl.textContent = this.dailyCookieTotal;
  trEl.appendChild(tdEl);
  stores.appendChild(trEl);
};

new Store('1st and Pike', 23, 65, 6.3, [], [], 0, 'pike');
new Store('SeaTac Airport', 3, 24, 1.2, [], [], 0, 'seatac');
new Store('Seattle Center', 11, 38, 3.7, [], [], 0, 'seattle');
new Store('Capitol Hill', 20, 38, 2.3, [], [], 0, 'capitol');
new Store('Alki', 2, 16, 4.6, [], [], 0, 'alki');

renderTableHeaders();

for (var i = 0; i < allStores.length; i++) {
  allStores[i].render();
}

renderTableFooters();