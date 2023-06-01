// ==UserScript==
// @name         Many letters
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Oksana Fedorova
// @match        https://www.bing.com
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let keywords = ["Топ 10 самых быстрых мотоциклов", "Товары для тюнинга hayabusa", "Купить мотоцикл Suzuki"];
let keyword = keywords[getRandom(0, keywords.length)];
let links = document.links;
let search = document.getElementsByName("search")[0];
let bingInput = document.getElementsByName("q")[0];

if (search !== undefined) {
  document.getElementsByName("q")[0].value = keyword;
  search.click();
  let i = 0;
  let timerId = setInterval(() => {
    bingInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      search.click();
    }
  }, 500);
} else if (location.hostname == "avito.ru") {
  console.log("Мы на целевом сайте");
  setInterval(() => {
    let index = getRandom(0, links.length);
    if (getRandom(0, 101) >= 70) {
      location.href = "https://www.bing.com/";
    }
    if (links[index].href.indexOf("avito.ru") != -1) links[index].click();
  }, getRandom(3000, 8000))
} else {
  let nextBingPage = true;
  for(let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("avito.ru") != -1) {
      let link = links[i];
      nextBingPage = false;
      console.log("Нашел строку " + link);
      link.click();
      setTimeout(() => {
        link.click();
      }, getRandom(2500, 5000))
      break;
    }
  }
  //Если не нашли на первой странице выдачи
  let elementExist = setInterval(() => {
    let element = document.querySelector("sw_next");
    if (element != null) {
      if (element.innerText == "5") {
        nextBingPage = false;
        location.href = "https://www.bing.com/";
      }
      clearInterval(elementExist);
    }
  }, 100)

  if (nextBingPage) {
    setTimeout(() => {
     sw_next.click();
    }, getRandom(3000, 8000))
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
