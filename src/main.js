import {callAPIExchange} from "./currencyExchange.js";
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";



async function retrieveRate(currency, usDollar) {
  const response = await callAPIExchange();
  if (!response) {
    $(".error").html("Sorry, an error has ocurred while trying to get your currency exchange");
  } else {
    giveExchangeRate(currency, usDollar, response);
  }
}

function giveExchangeRate(currency, usDollar, response) {
  if (currency ===  "AUD") {
    $(".rateResult").html(`The exchange rate is ${response.conversion_rates.AUD} and your total is ${(response.conversion_rates.AUD*usDollar).toFixed(2)}`);
  } else if (currency === "CHF") {
    $(".rateResult").html(`The exchange rate is ${response.conversion_rates.CHF} and your total is ${(response.conversion_rates.CHF*usDollar).toFixed(2)}`);
  } else if (currency === "DKK") {
    $(".rateResult").html(`The exchange rate is ${response.conversion_rates.DKK} and your total is ${(response.conversion_rates.DKK*usDollar).toFixed(2)}`);
  } else if (currency === "ILS") {
    $(".rateResult").html(`The exchange rate is ${response.conversion_rates.ILS} and your total is ${(response.conversion_rates.ILS*usDollar).toFixed(2)}`);
  } else if (currency === "NOK") {
    $(".rateResult").html(`The exchange rate is ${response.conversion_rates.NOK} and your total is ${(response.conversion_rates.NOK*usDollar).toFixed(2)}`);
  } else {
    $(".rateResult").html ("Sorry, the conversion rate you have entered is not available at this time.");
  }
}


$(document).ready(function () {
  $("#inputForm").submit(function (event) {
    event.preventDefault();
    let usDollar = parseInt($(".exchangeAmount").val());
    let inputtedCurrency = $(".exchangeCurrency").val();
    $(".exchangeAmount").val("");
    $(".exchangeCurrency").val("");
    let currency = inputtedCurrency.toUpperCase();
    retrieveRate(currency, usDollar);
  });
});    