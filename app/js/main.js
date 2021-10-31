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
