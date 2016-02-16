describe("Thermostat", function () {

  var thermostat = new Thermostat

  describe('thermostat starting temperature', function(){

    it("should start at 20 degrees", function() {
      expect(thermostat.temperature).toEqual(20);

    });

    it("should have a minimumTemperature of 10 degrees", function() {
      expect(thermostat.minimumTemperature).toEqual(10);
    });
  });

  describe('thermostat controls', function(){

    it("should have an up button to increase temperature", function(){
      thermostat.increaseTemperature();
      expect(thermostat.temperature).toEqual(21);

    });

    it("should have a down button to decrease temperature", function(){
      thermostat.descreaseTemperature();
      expect(thermostat.temperature).toEqual(20);
    });

    it("cannot go below 10 degrees", function(){
      thermostat.temperature = 10
      expect(function(){thermostat.descreaseTemperature();}).toThrow("Minimum temperature is 10 degrees, the Thermostat cannot go below this")
    });
  });


});
