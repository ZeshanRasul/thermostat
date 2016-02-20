$( document ).ready(function() {

  var thermostat = new Thermostat();
  var city, cityName, cityTemp, cityWeather, cityWind;



  function updateTemperature() {
    $('#temperature').text(thermostat.getCurrentTemperature());
    $('#section_1').attr('class', thermostat.energyUse());
  }
  function updatePowerStatus() {
    if (thermostat.isPowerSaving === true){
      $('#power-saving-status').text('on');
    } else if (thermostat.isPowerSaving === false) {
      $('#power-saving-status').text('off');
    }
  }

  // function windLevel() {
  //   if (cityWind > 3) {
  //     $('#wind_pic').attr('class', "windy");
  //   else {
  //     $('#wind_pic').attr('class', "not_windy");
  //   }
  //   }
  // }

  $('#temperature').text(thermostat.temp);
  updateTemperature();

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

  $('#select-city').on('submit', function(event){
    event.preventDefault();
    city = $(this).serialize();
    $.get('http://api.openweathermap.org/data/2.5/forecast/weather?' + city + '&APPID=ca6f6c4482e27abd7c68f8d5e303960f&units=metric', function(report){
      console.log(report);
      console.log(report.list[0].main.temp);
      console.log(report.list[0].wind.speed);
      cityName = report.city.name;
      cityWind = report.list[0].wind.speed;
      cityTemp = report.list[0].main.temp;
      cityWeather = report.list[0].weather[0].description;
      $('#city-name').text(cityName);
      $('#city-temperature').text(cityTemp);
      $('#city-wind').text(cityWind);
      $('#city-weather').text(cityWeather);
      function windLevel(cityWind) {
        if (cityWind > 3) {
          $('#wind_pic').attr('class', "windy");
        } else {
          $('#wind_pic').attr('class', "not_windy");
        }
      }
      windLevel(cityWind);


    });


  });





















  // $('#select-city').on("submit", function( event ){
  //   event.preventDefault();
  //   city = $( this ).serialize() ;
  //   $.get('http://api.openweathermap.org/data/2.5/forecast/weather?' + city + '&APPID=ca6f6c4482e27abd7c68f8d5e303960f&units=metric', function ( report ) {
  //     console.log(report);
  //     console.log(report.city.name);
  //     console.log(report.list[0].main.temp);
  //     console.log(report.list[0].weather[0].description);
  //     cityName = (report.city.name);
  //     cityTemp = (report.list[0].main.temp);
  //     cityWeather = (report.list[0].weather[0].description);
  //     $('#city-name').text(cityName);
  //     $('#country-temperature').text(cityTemp);
  //     $('#country-weather').text(cityWeather);

      // });

  });
