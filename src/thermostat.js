function Thermostat () {
  this.temperature = 20;
  this.minimumTemperature = 10;
}

Thermostat.prototype.increaseTemperature = function () {
  this.temperature ++
}

Thermostat.prototype.descreaseTemperature = function () {
  if (this.temperature === this.minimumTemperature) {
    throw "Minimum temperature is 10 degrees, the Thermostat cannot go below this";
  };
  this.temperature --
}
