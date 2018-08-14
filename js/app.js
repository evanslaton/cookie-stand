'use strict';

var hoursOfOp = ['6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm'];

var pike = {
  location: '1st and Pike',
  minCustomers: 23,
  maxCustomers: 65,
  avgCookies: 6.3,
  customersPerHour: [],
  cookiesPerHour: [],
  dailyCookieTotal: 0,
  id: 'pike'
};

var seatac = {
  location: 'SeaTac Airport',
  minCustomers: 3,
  maxCustomers: 24,
  avgCookies: 1.2,
  customersPerHour: [],
  cookiesPerHour: [],
  dailyCookieTotal: 0,
  id: 'seatac'
};

var seattle = {
  location: 'Seattle Center',
  minCustomers: 11,
  maxCustomers: 38,
  avgCookies: 3.7,
  customersPerHour: [],
  cookiesPerHour: [],
  dailyCookieTotal: 0,
  id: 'seattle'
};

var capitol = {
  location: 'Capitol Hill',
  minCustomers: 20,
  maxCustomers: 38,
  avgCookies: 2.3,
  customersPerHour: [],
  cookiesPerHour: [],
  dailyCookieTotal: 0,
  id: 'capitol'
};

var alki = {
  location: 'Alki',
  minCustomers: 2,
  maxCustomers: 16,
  avgCookies: 4.6,
  customersPerHour: [],
  cookiesPerHour: [],
  dailyCookieTotal: 0,
  id: 'alki'
};

// Generates a random number
function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

// Calculates customers per hour
var calcCustomersPerHour = function(customersPerHour, minCustomers, maxCustomers) {
  for (var i = 0; i < hoursOfOp.length; i++) {
    customersPerHour.push(Math.ceil(randomNum(minCustomers, maxCustomers)));
  }
  console.log(customersPerHour);
  return customersPerHour;
};

// Calculates cookies per hour
var calcCookiesPerHour = function(cookiesPerHour, customersPerHour, avgCookies) {
  for (var i = 0; i < hoursOfOp.length; i++) {
    cookiesPerHour.push(Math.ceil(customersPerHour[i] * avgCookies));
  }
  console.log(cookiesPerHour);
  return cookiesPerHour;
};

// Calculates daily cookie total
var calcDailyTotalCookies = function(dailyCookieTotal, cookiesPerHour) {
  for (var i = 0; i < hoursOfOp.length; i++) {
    dailyCookieTotal += cookiesPerHour[i];
  }
  console.log(dailyCookieTotal);
  return dailyCookieTotal;
};

// Creates <li> and adds to the <ul>
var addToUl = function(id, cookiesPerHour, dailyCookieTotal) {
  var pikeUlEl = document.getElementById(id);
  for (var i = 0; i < hoursOfOp.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = hoursOfOp[i] + ': ' + cookiesPerHour[i] + ' cookies';
    pikeUlEl.appendChild(liEl);
  }
  liEl.textContent = 'Total' + ': ' + dailyCookieTotal + ' cookies';
  pikeUlEl.appendChild(liEl);
};

// Render to the screen each object
var renderToScreen = function() {
  this.customersPerHour = calcCustomersPerHour(this.customersPerHour, this.minCustomers, this.maxCustomers);
  this.cookiesPerHour = calcCookiesPerHour(this.cookiesPerHour, this.customersPerHour, this.avgCookies);
  this.dailyCookieTotal = calcDailyTotalCookies(this.dailyCookieTotal, this.cookiesPerHour);
  addToUl(this.id, this.cookiesPerHour, this.dailyCookieTotal);
};

// Adds renderToScreen to each object
pike.render = renderToScreen;
seatac.render = renderToScreen;
seattle.render = renderToScreen;
capitol.render = renderToScreen;
alki.render = renderToScreen;

// Adds content to HTML doc
var locations = [pike, seatac, seattle, capitol, alki];

for (var i = 0; i < locations.length; i++) {
  locations[i].render();
}