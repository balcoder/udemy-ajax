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

// Get random picture of Cat using jQuery
$("#getCat").click(function () {
  let flickerApi =
    "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON(flickerApi, {
    tags: "cat",
    tagmode: "any",
    format: "json",
  })
    .done(function (data) {
      let randNum = Math.floor(Math.random() * 21);
      // $.each(data.items, function (i, item) {
      //   $("<img>").attr("src", item.media.m).appendTo("#randomCat");
      //   if (i === 5) {
      //     return false;
      //   }
      // });
      $("#cat").attr("src", data.items[randNum].media.m);
    })
    .fail(function () {
      console.log("Error There was a problem");
    });
});

// Using AXIOS for AJAX calls for triva
const trivaUrl = "https://opentdb.com/api.php?amount=1";

let getTrivaBtn = document.querySelector("#getTriva");
let trivaQuestion = document.querySelector("#trivaQuestion");

getTrivaBtn.addEventListener("click", function () {
  axios
    .get(trivaUrl)
    .then(function (res) {
      console.log(res.data.results[0]);
      let question = res.data.results[0].question;
      //let text = document.createTextNode(question);
      trivaQuestion.innerHTML = question;
    })
    .catch(function () {
      console.log("Error");
    });
});

// Axios error handling
const placeholderBtn = document.querySelector("#placeholderBtn");
let section = document.querySelector("#comments");

placeholderBtn.addEventListener("click", function () {
  sendRequest();
});

function sendRequest() {
  axios
    .get("https://jsonplaceholder.typicode.com/comments", {
      params: {
        postId: 1,
      },
    })
    .then(addComments)
    .catch(handleErrorsAxios);
}

function addComments(res) {
  res.data.forEach(function (comment) {
    appendComment(comment);
  });
}

function appendComment(comment) {
  console.log(comment);
  const p = document.createElement("p");
  var text = document.createTextNode(comment.email);
  p.appendChild(text);
  section.append(p);
}

// Ron Swanson

const ronXhrBtn = document.querySelector("#ronXhr");
const ronFetchBtn = document.querySelector("#ronFetch");
const ronJqueryBtn = document.querySelector("#ronJquery");
const ronAxiosBtn = document.querySelector("#ronAxios");
const ronsQuote = document.querySelector("#ronsQuote");
const ronsApiUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

// XHR
ronXhrBtn.addEventListener("click", function () {
  let XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function () {
    if (XHR.readyState === 4 && XHR.status === 200) {
      let responseQuote = JSON.parse(XHR.responseText);
      ronsQuote.innerHTML = responseQuote;
    }
  };

  XHR.open("GET", ronsApiUrl);
  XHR.send();
});

// Fetch

ronFetchBtn.addEventListener("click", function () {
  fetch(ronsApiUrl)
    .then(handleErrors)
    .then((res) => res.json())
    .then((data) => (ronsQuote.innerHTML = data))
    .catch(printError);
});

// jQuery
ronJqueryBtn.addEventListener("click", function () {
  $.getJSON("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
    .done(function (data) {
      console.log(data);
      ronsQuote.innerHTML = data[0];
    })
    .fail(function (jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
    });
});

// Axios

ronAxiosBtn.addEventListener("click", function () {
  axios
    .get(ronsApiUrl)
    .then(function (response) {
      ronsQuote.innerHTML = response.data[0];
    })
    //.catch(handleErrorsAxios(err));
    .catch(function (err) {
      if (err.response) {
        console.log("Problem with response", err.response.status);
      } else if (err.request) {
        console.log("Problem with request");
      } else {
        console.log("Error", err.message);
      }
    });
});

function handleErrorsAxios(err) {
  if (err.response) {
    console.log("Problem with Response ", err.response.status);
  } else if (err.request) {
    console.log("Problem with Request");
  } else {
    console.log("Error", err.message);
  }
}
