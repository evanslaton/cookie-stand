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
pike.calcCustomersPerHour = function() {
  for (var i = 0; i < hoursOfOp.length; i++) {
    this.customersPerHour.push(Math.round(randomNum(this.minCustomers, this.maxCustomers)));
  }
  console.log(this.customersPerHour);
}

// Calculates cookies per hour
pike.calcCookiesPerHour = function() {
  for (var i = 0; i < this.customersPerHour.length; i++) {
    this.cookiesPerHour.push(Math.round(this.customersPerHour[i] * this.avgCookies));
  }
  console.log(this.cookiesPerHour);
}

// Calculates daily cookie total
pike.calcDailyTotalCookies = function() {
  for (var i = 0; i < this.cookiesPerHour.length; i++) {
    this.dailyCookieTotal += this.cookiesPerHour[i];
  }
  console.log(this.dailyCookieTotal);
}