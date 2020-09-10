/*
  From RapidAPI
  https://rapidapi.com/googlecloud/api/google-translate1/endpoints
*/

function Trans(apiCredentials) {

  var lang = 'en';
  var langSelectors = null;
  var initEls = [];

  function initTranslateEl(els) {
    initEls = els;
    translateEl(initEls);
  }

  function setLangFromEl() {
    lang = this.value;
    this.parentNode.className = "active";
    for (var i = 0; i < langSelectors.length; i++) {
      if (langSelectors[i].value !== lang) langSelectors[i].parentNode.className = ''
    }
    translateEl(initEls);
  }

  function listenLangSelector(selector, evtName) {
    langSelectors = document.getElementsByName(selector);
    for (var i = 0; i < langSelectors.length; i++) {
      langSelectors[i].addEventListener(evtName, setLangFromEl);
    }
    if (langSelectors.length) lang = langSelectors[0].value || 'es';
  }

  function translateEl(items, optLang) {
    optLang = optLang || lang;
    for (var i = 0; i < items.length; i++) {
      (function(i, items) {
        translate(items[i].innerHTML, function(msg) {
          items[i].innerHTML = msg;
        }, lang);
      })(i, items);
    }
  }

  function parseResponse(res, fallback) {
    var message = fallback;
    var res = JSON.parse(res);
    if (res.data && res.data.translations && res.data.translations.length) message = res.data.translations[0].translatedText;
    return message;
  }

  function translate(message, cb, lang) {
    lang = lang || 'en';
    var data = ["source=es", "target=" + lang, "q=" + encodeURIComponent(message)].join('&');
    var translated = message;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        
        // Handle response errors
        if (this.status !== 200) return cb(translated);
        
        // Parse translation
        translated = parseResponse(this.responseText, translated);
        cb(translated);
      }
    });

    xhr.open("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");
    xhr.setRequestHeader("x-rapidapi-host", "google-translate1.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", apiCredentials[0]);
    //xhr.setRequestHeader("accept-encoding", "application/gzip");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

    xhr.send(data);
  }

  return {
    translate: translate,
    translateEl: translateEl,
    initTranslateEl: initTranslateEl,
    setLangFromEl: setLangFromEl,
    listenLangSelector: listenLangSelector
  }
}
