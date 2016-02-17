function Thermostat() {
  this.temp = 20;
  this.isPowerSaving = true
  this._MINTEMP = 10;
  this._MAXPSTEMP = 25;
  this._MAXTEMP = 32;
}

Thermostat.prototype.increaseTemp = function() {
  if (this.temp >= this.maxTemp()) {
    throw new Error('Already at maximum temperature')
  } else {
    this.temp++;
  };
};

Thermostat.prototype.decreaseTemp = function() {
  if (this.temp <= this._MINTEMP) {
    throw new Error('Already at minimum temperature');
  } else {
    this.temp--;
  };
};

Thermostat.prototype.maxTemp = function() {
  if (this.isPowerSaving) {
    return this._MAXPSTEMP;
  } else {
    return this._MAXTEMP;
  };
};

Thermostat.prototype.powerSavingOn = function() {
  this.isPowerSaving = true;
}

Thermostat.prototype.powerSavingOff = function() {
  this.isPowerSaving = false;
}
