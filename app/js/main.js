// Get dog image

let dogPic = document.getElementById("photo");
let getRndDogBtn = document.getElementById("dogBtn");

getRndDogBtn.addEventListener("click", function () {
  var XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function () {
    if (XHR.readyState === 4 && XHR.status === 200) {
      let url = JSON.parse(XHR.responseText);
      dogPic.setAttribute("src", url.message);
    }
  };

  XHR.open("GET", "https://dog.ceo/api/breeds/image/random");
  XHR.send();
});

// Get Bitcoin Price using XHR
let bitcoinApiUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";
let bitcoinBtnXhr = document.querySelector("#btn-bitcoin");
let usdXhr = document.querySelector("#usd");
let euroXhr = document.querySelector("#euro");

bitcoinBtnXhr.addEventListener("click", function () {
  let XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function () {
    if (XHR.readyState === 4 && XHR.status === 200) {
      let bitcoinXhrPrice = JSON.parse(XHR.responseText);
      console.log(bitcoinXhrPrice);
      usdXhr.innerHTML = `USD: ${bitcoinXhrPrice.bpi.USD.rate}`;
      euroXhr.innerHTML = `EURO: ${bitcoinXhrPrice.bpi.EUR.rate}`;
    }
  };

  XHR.open("GET", bitcoinApiUrl);
  XHR.send();
});

// Get Bitcoin price using fetch
let usdFetch = document.querySelector("#usd-fetch");
let euroFetch = document.querySelector("#euro-fetch");
let bitcoinBtnFetch = document.querySelector("#btn-bitcoin-fetch");

bitcoinBtnFetch.addEventListener("click", function () {
  fetch(bitcoinApiUrl)
    .then(handleErrors)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      usdFetch.innerHTML = `USD: ${data.bpi.USD.rate}`;
      euroFetch.innerHTML = `EURO: ${data.bpi.EUR.rate}`;
    })
    .catch(function (error) {
      console.log(error);
    });
});

function handleErrors(request) {
  if (!request.ok) {
    throw Error(request.status);
  }
  return request;
}
