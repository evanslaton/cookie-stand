'use strict'

// Generates a random number
function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

var hoursOfOp = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

var pike = {
  location: '1st and Pike',
  minCustomers: 23,
  maxCustomers: 65,
  avgCookies: 6.3,
  customersPerHour: [],
  cookiesPerHour: [],
  dailyCookies: undefined
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
  for (var i = 0; i < hoursOfOp.length; i++) {
    this.cookiesPerHour.push(Math.round(this.customersPerHour[i] * this.avgCookies));
  }
  console.log(this.cookiesPerHour);
}