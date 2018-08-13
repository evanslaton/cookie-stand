'use strict'

var hoursOfOp = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

var pike = {
  location: '1st and Pike',
  minCustomers: 23,
  maxCustomers: 65,
  avgCookies: 6.3,
  customersPerHour: [],
  cookiesPerHour: [],
  dailyCookieTotal: 0
}

var seatac = {
  location: 'SeaTac Airport',
  minCustomers: 3,
  maxCustomers: 24,
  avgCookies: 1.2,
  customersPerHour: [],
  cookiesPerHour: [],
  dailyCookieTotal: 0
}

var seattle = {
  location: 'Seattle Center',
  minCustomers: 11,
  maxCustomers: 38,
  avgCookies: 3.7,
  customersPerHour: [],
  cookiesPerHour: [],
  dailyCookieTotal: 0
}

var capitol = {
  location: 'Capitol Hill',
  minCustomers: 20,
  maxCustomers: 38,
  avgCookies: 2.3,
  customersPerHour: [],
  cookiesPerHour: [],
  dailyCookieTotal: 0
}

var alki = {
  location: 'Alki',
  minCustomers: 2,
  maxCustomers: 16,
  avgCookies: 4.6,
  customersPerHour: [],
  cookiesPerHour: [],
  dailyCookieTotal: 0
}

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
}

// Calculates cookies per hour
var calcCookiesPerHour = function(cookiesPerHour, customersPerHour, avgCookies) {
  for (var i = 0; i < hoursOfOp.length; i++) {
    cookiesPerHour.push(Math.ceil(customersPerHour[i] * avgCookies));
  }
  console.log(cookiesPerHour);
  return cookiesPerHour;
}

// Calculates daily cookie total
var calcDailyTotalCookies = function(dailyCookieTotal, cookiesPerHour) {
  for (var i = 0; i < hoursOfOp.length; i++) {
    dailyCookieTotal += cookiesPerHour[i];
  }
  console.log(dailyCookieTotal);
  return dailyCookieTotal;
}

// Adds render to each object
pike.render = function() {
  this.customersPerHour = calcCustomersPerHour(this.customersPerHour, this.minCustomers, this.maxCustomers);
  this.cookiesPerHour = calcCookiesPerHour(this.cookiesPerHour, this.customersPerHour, this.avgCookies);
  this.dailyCookieTotal = calcDailyTotalCookies(this.dailyCookieTotal, this.cookiesPerHour);
  
  // Creates <li> and adds to the <ul>
  var pikeUlEl = document.getElementById('pike');
  for (var i = 0; i < hoursOfOp.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = hoursOfOp[i] + ': ' + this.cookiesPerHour[i];
    pikeUlEl.appendChild(liEl);
  }
  liEl.textContent = 'Total' + ': ' + this.dailyCookieTotal;
  pikeUlEl.appendChild(liEl);
}

seatac.render = function() {
  this.customersPerHour = calcCustomersPerHour(this.customersPerHour, this.minCustomers, this.maxCustomers);
  this.cookiesPerHour = calcCookiesPerHour(this.cookiesPerHour, this.customersPerHour, this.avgCookies);
  this.dailyCookieTotal = calcDailyTotalCookies(this.dailyCookieTotal, this.cookiesPerHour);
  
  // Creates <li> and adds to the <ul>
  var seatacUlEl = document.getElementById('seatac');
  for (var i = 0; i < hoursOfOp.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = hoursOfOp[i] + ': ' + this.cookiesPerHour[i];
    seatacUlEl.appendChild(liEl);
  }
  liEl.textContent = 'Total' + ': ' + this.dailyCookieTotal;
  seatacUlEl.appendChild(liEl);
}

seattle.render = function() {
  this.customersPerHour = calcCustomersPerHour(this.customersPerHour, this.minCustomers, this.maxCustomers);
  this.cookiesPerHour = calcCookiesPerHour(this.cookiesPerHour, this.customersPerHour, this.avgCookies);
  this.dailyCookieTotal = calcDailyTotalCookies(this.dailyCookieTotal, this.cookiesPerHour);
  
  // Creates <li> and adds to the <ul>
  var seattleUlEl = document.getElementById('seattle');
  for (var i = 0; i < hoursOfOp.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = hoursOfOp[i] + ': ' + this.cookiesPerHour[i];
    seattleUlEl.appendChild(liEl);
  }
  liEl.textContent = 'Total' + ': ' + this.dailyCookieTotal;
  seattleUlEl.appendChild(liEl);
}

capitol.render = function() {
  this.customersPerHour = calcCustomersPerHour(this.customersPerHour, this.minCustomers, this.maxCustomers);
  this.cookiesPerHour = calcCookiesPerHour(this.cookiesPerHour, this.customersPerHour, this.avgCookies);
  this.dailyCookieTotal = calcDailyTotalCookies(this.dailyCookieTotal, this.cookiesPerHour);
  
  // Creates <li> and adds to the <ul>
  var capitolUlEl = document.getElementById('capitol');
  for (var i = 0; i < hoursOfOp.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = hoursOfOp[i] + ': ' + this.cookiesPerHour[i];
    capitolUlEl.appendChild(liEl);
  }
  liEl.textContent = 'Total' + ': ' + this.dailyCookieTotal;
  capitolUlEl.appendChild(liEl);
}

alki.render = function() {
  this.customersPerHour = calcCustomersPerHour(this.customersPerHour, this.minCustomers, this.maxCustomers);
  this.cookiesPerHour = calcCookiesPerHour(this.cookiesPerHour, this.customersPerHour, this.avgCookies);
  this.dailyCookieTotal = calcDailyTotalCookies(this.dailyCookieTotal, this.cookiesPerHour);

  // Creates <li> and adds to the <ul>
  var alkiUlEl = document.getElementById('alki');
  for (var i = 0; i < hoursOfOp.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = hoursOfOp[i] + ': ' + this.cookiesPerHour[i];
    alkiUlEl.appendChild(liEl);
  }
  liEl.textContent = 'Total' + ': ' + this.dailyCookieTotal;
  alkiUlEl.appendChild(liEl);
}


// Adds content to HTML doc
var locations = [pike, seatac, seattle, capitol, alki];

for (var i = 0; i < locations.length; i++) {
  locations[i].render();
}