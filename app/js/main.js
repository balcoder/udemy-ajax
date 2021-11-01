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

// Get Random user

const userUrl = "https://randomuser.me/api/";
const userImg = document.querySelector("#user-img");
const userName = document.querySelector("#user-name");
const fullName = document.querySelector("#name");
const userEmail = document.querySelector("#user-email");
const userCity = document.querySelector("#user-city");
const userBtn = document.querySelector("#user-button");

userBtn.addEventListener("click", function () {
  fetch(userUrl)
    .then(handleErrors)
    .then(parseJson)
    .then(updateUserInfo)
    .catch(printError);
});

function parseJson(response) {
  return response.json();
}

function updateUserInfo(data) {
  let info = data.results[0];
  userImg.setAttribute("src", info.picture.medium);
  fullName.innerHTML = `${info.name.title} ${info.name.first} ${info.name.last}`;
  userName.innerHTML = `Username: ${info.login.username}`;
  userEmail.innerHTML = `Email: ${info.email}`;
  userCity.innerHTML = `City: ${info.location.city}`;
}

function printError(error) {
  console.log(error);
}

// Using jQuery for AJAX calls
$("#jqueryBtn").click(function () {
  $.ajax({
    method: "GET",
    url: "https://baconipsum.com/api/?type=meat-and-filler",
    dataType: "json",
  })
    .done(function (data) {
      $("#meat").text(data);
    })
    .fail(function () {
      console.log("Fail");
    });
});

$("#getBtn").click(function () {
  $.get("https://api.github.com/users/balcoder")
    .done(function (data) {
      console.log(data);
    })
    .fail(function () {
      console.log("Error!");
    });
});
$("#postBtn").click(function () {
  let data = { name: "John", time: "2pm" };
  $.post("www.idontthinkthiswillwork.com", data)
    .done(function () {
      console.log("Hi!");
    })
    .fail(function () {
      console.log("Error!");
    });
});
$("#getJsonBtn").click(function () {
  $.getJSON("https://api.github.com/users/balcoder")
    .done((data) => {
      console.log(data);
    })
    .fail(function () {
      console.log("We got a Problem");
    });
});

// Get random picture of Cat
$("#getCat").click(function () {
  let flickerApi =
    "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON(flickerApi, {
    tags: "cat",
    tagmode: "any",
    format: "json",
  }).done(function (data) {
    let randNum = Math.floor(Math.random() * 21);
    console.log(data.items[randNum].link);
    // $.each(data.items, function (i, item) {
    //   $("<img>").attr("src", item.media.m).appendTo("#randomCat");
    //   if (i === 5) {
    //     return false;
    //   }
    // });
    $("#cat").attr("src", data.items[randNum].media.m);
  });
});
