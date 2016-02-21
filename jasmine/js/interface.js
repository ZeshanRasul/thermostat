$( document ).ready(function() {
  var thermostat = new Thermostat();
  var city, cityName, cityTemp, cityWeather, cityWind, lat, long;

  function updateTemperature() {
    $('#temperature').text(thermostat.getCurrentTemperature());
    $('#section_1').attr('class', thermostat.energyUse());
  }

  function updatePowerStatus() {
    if (thermostat.isPowerSaving === true){
      $('#power-saving-status').text('On');
    } else if (thermostat.isPowerSaving === false) {
      $('#power-saving-status').text('Off');
    }
  }

  function windLevel(cityWind) {
    if (cityWind > 10) {
      $('#wind_pic').attr('class', "windy");
    } else {
      $('#wind_pic').attr('class', "not_windy");
    }
  }

  function warmthLevel(cityTemp) {
    if (cityTemp > 18) {
      $('#weather_pic').attr('class', "hot");
    } else {
      $('#weather_pic').attr('class', "cold");
    }
  }

  function initialize(lat, long) {
    var mapProp = {
      center:new google.maps.LatLng(lat,long),
      zoom: 10,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
  }
  google.maps.event.addDomListener(window, 'load', initialize);

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
      lat = report.city.coord.lat
      long = report.city.coord.lon
      console.log(lat);
      console.log(long);
      windLevel(cityWind);
      warmthLevel(cityTemp);
      $('#city-name').text(cityName);
      $('#city-temperature').text(cityTemp);
      $('#city-wind').text(cityWind);
      $('#city-weather').text(cityWeather);
      initialize(lat, long);
    });
  });
  
  });
