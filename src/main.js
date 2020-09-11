import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";




function giveExchangeRate(currency, usDollar, response) {
  if (currency ===  AUD) {
    $(".rateResult").html(`The exchange rate for the desired currency is ${response.conversion_rates.AUD} and your total is ${(response.conversion_rates.AUD*usDollar).toFixed(2)}`)
  } else if (currency === CHF) {
    $(".rateResult").html(`The exchange rate for the desired currency is ${response.conversion_rates.CHF} and your total is ${(response.conversion_rates.CHF*usDollar).toFixed(2)}`)
  } else if (curreny === DKK) {
    $(".rateResult").html(`The exchange rate for the desired currency is ${response.conversion_rates.DKK} and your total is ${(response.conversion_rates.DKK*usDollar).toFixed(2)}`)
  } else if (currency === ILS) {
    $(".rateResult").html(`The exchange rate for the desired currency is ${response.conversion_rates.ILS} and your total is ${(response.conversion_rates.ILS*usDollar).toFixed(2)}`)
  } else if (currency === NOK) {
    $(".rateResult").html(`The exchange rate for the desired currency is ${response.conversion_rates.NOK} and your total is ${(response.conversion_rates.NOK*usDollar).toFixed(2)}`)
  } else {
    $(".rateResult").html ("Sorry, the conversion rate you have entered is not available at this time.")
  }
}









$(document).ready(function () {
  $("#weatherLocation").click(function () {
    const city = $("#location").val();
    $("#location").val("");
    const state = $("#locationS").val();
    $("#locationS").val("");
    const latitude = $("#latitude").val();
    $("#latitude").val("");
    const longitude = $("#longitude").val();
    $("#longitude").val("");
    const time = 1599134400;

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=${process.env.API_KEY}`;
    let request2 = new XMLHttpRequest();
    const urlHourly = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${time}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request2.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response2 = JSON.parse(this.responseText);
        historyElements(response2);
      }
    };

    request.open("GET", url, true);
    request.send();
    
    function getElements(response) {
      $(".showHumidity").text(
        `The humidity in ${city} ${state} is ${response.main.humidity}%`
      );
      $(".showTempK").text(
        `The temperature in Kelvins is ${response.main.temp} degrees.`
      );
      $(".showTempF").text(
        `The temperature in F is ${((response.main.temp - 273.15) * 9/5 + 32).toFixed(2)} degrees.`
      );
      $(".showWeather").text(
        `The weather is ${response.weather[0].description}.`
      );
      $(".showWind").text(
        `The current wind speed is ${response.wind.speed}.`
      );
    }

    request2.open("GET", urlHourly, true);
    request2.send();

    function historyElements(response2) {
      $('.showHistory').text(
        `Here is the humidity from 5 days ago, Pretty weird you want this information. ${response2.current.humidity}.`
      );
    }
  });
});
