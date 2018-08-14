'use strict';

var hoursOfOp = ['6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm'];

var allStores = [];

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
}

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

// Creates <li> and adds to the <ul>
Store.prototype.addToUl = function() {
  var pikeUlEl = document.getElementById(this.id);
  for (var i = 0; i < hoursOfOp.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = hoursOfOp[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
    pikeUlEl.appendChild(liEl);
  }
  liEl.textContent = 'Total' + ': ' + this.dailyCookieTotal + ' cookies';
  pikeUlEl.appendChild(liEl);
};

Store.prototype.render = function() {
  this.customersPerHour = this.calcCustomersPerHour();
  this.cookiesPerHour = this.calcCookiesPerHour();
  this.dailyCookieTotal = this.calcDailyTotalCookies();
  this.addToUl();
};

var pike = new Store('1st and Pike', 23, 65, 6.3, [], [], 0, 'pike');
var seatac = new Store('SeaTac Airport', 3, 24, 1.2, [], [], 0, 'seatac');
var seattle = new Store('Seattle Center', 11, 38, 3.7, [], [], 0, 'seattle');
var capitol = new Store('Capitol Hill', 20, 38, 2.3, [], [], 0, 'capitol');
var alki = new Store('Alki', 2, 16, 4.6, [], [], 0, 'alki');

// Adds content to HTML doc
for (var i = 0; i < allStores.length; i++) {
  allStores[i].render();
}