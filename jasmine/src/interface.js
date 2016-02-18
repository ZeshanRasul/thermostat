$( document ).ready(function() {

  var thermostat = new Thermostat();
  var city, cityName, cityTemp, cityWeather;


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

  $('#select-city').on("submit", function( event ){
    event.preventDefault();
    city = $( this ).serialize() ;
    $.get('http://api.openweathermap.org/data/2.5/forecast/weather?' + city + '&APPID=ca6f6c4482e27abd7c68f8d5e303960f&units=metric', function ( report ) {
      console.log(report);
      console.log(report.city.name);
      console.log(report.list[0].main.temp);
      console.log(report.list[0].weather[0].description);
      cityName = (report.city.name);
      cityTemp = (report.list[0].main.temp);
      cityWeather = (report.list[0].weather[0].description);
      $('#city-name').text(cityName);
      $('#country-temperature').text(cityTemp);
      $('#country-weather').text(cityWeather);

      });
    });

  });

  // $('#select-city').submit(function(event){
  //   event.preventDefault();
  //   var city = $('#current-city').val();
  //   $.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric', function(data) {
  //     $('#country-temperature').text(data.main.temp);
  //   });
