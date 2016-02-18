
$(document).ready(function() {

  var thermostat = new Thermostat();

  function updateTemperature() {
    $('#temperature').text(thermostat.getCurrentTemperature());
    $('#temperature').attr('class', thermostat.energyUse());
  }
  function updatePowerStatus() {
    if (thermostat.isPowerSaving === true){
      $('#power-saving-status').text('on');
    } else if (thermostat.isPowerSaving === false) {
      $('#power-saving-status').text('off');
    }
  }


  // $('#power-saving-status').text(thermostat.isPowerSaving());

  $('#temperature').text(thermostat.temp);

  $('#increase-temperature').click(function(){
    thermostat.increaseTemp();
    updateTemperature();
  });

  $('#decrease-temperature').click(function(){
    thermostat.decreaseTemp();
    updateTemperature();
  });

  $('#reset-temperature').click(function(){
    thermostat.reset();
    updateTemperature();

  });

  $('#power-save-on').click(function(){
    thermostat.powerSavingOn();
    updateTemperature();
    updatePowerStatus();
  });

  $('#power-save-off').click(function(){
    thermostat.powerSavingOff();
    updateTemperature();
    updatePowerStatus();
  });

});
