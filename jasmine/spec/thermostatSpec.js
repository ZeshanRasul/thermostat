'use strict';

describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe('constructor qualities', function() {
    it('has an initial temp of 20', function() {
      expect(thermostat.temp).toEqual(20);
    });
    it('power saving mode is on by default', function() {
      expect(thermostat.isPowerSaving).toEqual(true);
    });
    it('has an initial min temp of 10', function() {
      expect(thermostat._MINTEMP).toEqual(10);
    });
    it('has an initial max power saving temp of 25', function() {
      expect(thermostat._MAXPSTEMP).toEqual(25);
    });
    it('has an initial max non-power saving temp of 32', function() {
      expect(thermostat._MAXTEMP).toEqual(32);
    });
  });

  describe('increase temp', function() {
    it('increases temp by 1', function() {
      thermostat.increaseTemp();
      expect(thermostat.temp).toEqual(21);
    })
    it('raises an error if you try to go above 25 in power saving mode', function() {
      thermostat.temp = thermostat._MAXPSTEMP;
      expect(function() {
        thermostat.increaseTemp();
      }).toThrowError('Already at maximum temperature');
      expect(thermostat.temp).toEqual(thermostat._MAXPSTEMP);
    });
    it('raises an error if you try to go above 32 in power saving mode', function() {
      thermostat.temp = thermostat._MAXTEMP;
      expect(function() {
        thermostat.powerSavingOff();
        thermostat.increaseTemp();
      }).toThrowError('Already at maximum temperature');
      expect(thermostat.temp).toEqual(thermostat._MAXTEMP);
    });
  });

  describe('decrease temp', function() {
    it('decreases temp by 1', function() {
      thermostat.decreaseTemp();
      expect(thermostat.temp).toEqual(19);
    });
    it('raises an error if you try to go bwlow 10', function() {
      thermostat.temp = thermostat._MINTEMP;
      expect(function() {
        thermostat.decreaseTemp();
      }).toThrowError('Already at minimum temperature');
      expect(thermostat.temp).toEqual(thermostat._MINTEMP);
    });
  });

  describe('turning power saving model on', function() {
    it('should change power saving to be true', function() {
      thermostat.powerSavingOn()
      expect(thermostat.isPowerSaving).toEqual(true);
    });
    it('should change max temp to be lower max', function() {
      thermostat.powerSavingOn()
      expect(thermostat.maxTemp()).toEqual(thermostat._MAXPSTEMP);
    });
  });

  describe('turning power saving model off', function() {
    it('should change power saving to be false', function() {
      thermostat.powerSavingOff()
      expect(thermostat.isPowerSaving).toEqual(false);
    });
    it('should change max temp to be upper max', function() {
      thermostat.powerSavingOff()
      expect(thermostat.maxTemp()).toEqual(thermostat._MAXTEMP);
    });
  });

});
