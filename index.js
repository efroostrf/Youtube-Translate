// ==UserScript==
// @name         YouTube Translate
// @namespace    https://github.com/efroostrf/Youtube-Translate
// @version      17.12.2020 1.0.0
// @description  Быстрый перевод названия/описания видео на необходимые языки всего в несколько кликов!
// @author       efroostrf
// @copyright    efroostrf
// @match        https://*.youtube.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      https://apis.google.com/js/api.js
// @license      MIT; https://opensource.org/licenses/MIT
// @updateURL    https://github.com/efroostrf/Youtube-Translate/blob/main/index.js
// ==/UserScript==

(function() {
    'use strict';

    const APIKey = "AIzaSyAiFKm5Fglp0vON-OhpcBFTnYmx-n4prwg";
    const AppCode = '937071706522-jfnijg1tdislj9rm0i4a25k7ibqmflph.apps.googleusercontent.com';
    const BtnAppend = 'ytd-expander.style-scope.ytd-video-secondary-info-renderer';
    const XRapidMicrosoftKey = 'f4fc1397f7mshf3ca60fad5167d5p1b4e2cjsn55d7e3d45bff';
    var TranslateBy = 'Microsoft';
    var Translated = { "data": [] };
    const Languages = {"translation":{
      "af":{"name":"Африкаанс","nativeName":"Afrikaans","dir":"ltr"},
      "ar":{"name":"Арабский","nativeName":"العربية","dir":"rtl"},
      "as":{"name":"Assamese","nativeName":"Assamese","dir":"ltr"},
      "bg":{"name":"Болгарский","nativeName":"Български","dir":"ltr"},
      "bn":{"name":"Бенгальский","nativeName":"বাংলা","dir":"ltr"},
      "bs":{"name":"Боснийский","nativeName":"bosanski (latinica)","dir":"ltr"},
      "ca":{"name":"Каталанский","nativeName":"Català","dir":"ltr"},
      "cs":{"name":"Чешский","nativeName":"Čeština","dir":"ltr"},
      "cy":{"name":"Валлийский","nativeName":"Welsh","dir":"ltr"},
      "da":{"name":"Датский","nativeName":"Dansk","dir":"ltr"},
      "de":{"name":"Немецкий","nativeName":"Deutsch","dir":"ltr"},
      "el":{"name":"Греческий","nativeName":"Ελληνικά","dir":"ltr"},
      "en":{"name":"Английский","nativeName":"English","dir":"ltr"},
      "es":{"name":"Испанский","nativeName":"Español","dir":"ltr"},
      "et":{"name":"Эстонский","nativeName":"Eesti","dir":"ltr"},
      "fa":{"name":"Персидский","nativeName":"Persian","dir":"rtl"},
      "fi":{"name":"Финский","nativeName":"Suomi","dir":"ltr"},
      "fj":{"name":"фиджи","nativeName":"Fijian","dir":"ltr"},
      "fr":{"name":"Французский","nativeName":"Français","dir":"ltr"},
      "fr-ca":{"name":"French (Canada)","nativeName":"French (Canada)","dir":"ltr"},
      "ga":{"name":"Ирландский","nativeName":"Gaeilge","dir":"ltr"},
      "gu":{"name":"Гуджарати","nativeName":"ગુજરાતી","dir":"ltr"},
      "he":{"name":"Иврит","nativeName":"עברית","dir":"rtl"},
      "hi":{"name":"Хинди","nativeName":"हिंदी","dir":"ltr"},
      "hr":{"name":"Хорватский","nativeName":"Hrvatski","dir":"ltr"},
      "ht":{"name":"Гаитянский креольский","nativeName":"Haitian Creole","dir":"ltr"},
      "hu":{"name":"Венгерский","nativeName":"Magyar","dir":"ltr"},
      "id":{"name":"Индонезийский","nativeName":"Indonesia","dir":"ltr"},
      "is":{"name":"Исландский","nativeName":"Íslenska","dir":"ltr"},
      "it":{"name":"Итальянский","nativeName":"Italiano","dir":"ltr"},
      "ja":{"name":"Японский","nativeName":"日本語","dir":"ltr"},
      "kk":{"name":"Казахский","nativeName":"Kazakh","dir":"ltr"},
      "kn":{"name":"Каннада","nativeName":"ಕನ್ನಡ","dir":"ltr"},
      "ko":{"name":"Корейский","nativeName":"한국어","dir":"ltr"},
      "ku":{"name":"Kurdish (Central)","nativeName":"Kurdish (Central)","dir":"rtl"},
      "lt":{"name":"Литовский","nativeName":"Lietuvių","dir":"ltr"},
      "lv":{"name":"Латышский","nativeName":"Latviešu","dir":"ltr"},
      "mg":{"name":"малагасийский","nativeName":"Malagasy","dir":"ltr"},
      "mi":{"name":"Маори","nativeName":"Māori","dir":"ltr"},
      "ml":{"name":"Малаялам","nativeName":"മലയാളം","dir":"ltr"},
      "mr":{"name":"Маратхи","nativeName":"मराठी","dir":"ltr"},
      "ms":{"name":"Малайский","nativeName":"Melayu","dir":"ltr"},
      "mt":{"name":"Мальтийский","nativeName":"Il-Malti","dir":"ltr"},
      "nb":{"name":"Норвежский","nativeName":"Norsk","dir":"ltr"},
      "nl":{"name":"Голландский","nativeName":"Nederlands","dir":"ltr"},
      "or":{"name":"ория","nativeName":"Odia","dir":"ltr"},
      "pa":{"name":"Панджаби","nativeName":"ਪੰਜਾਬੀ","dir":"ltr"},
      "pl":{"name":"Польский","nativeName":"Polski","dir":"ltr"},
      "ps":{"name":"Pashto","nativeName":"Pashto","dir":"rtl"},
      "pt":{"name":"Португальский (Бразилия)","nativeName":"Português (Brasil)","dir":"ltr"},
      "pt-pt":{"name":"Португальский (Португалия)","nativeName":"Português (Portugal)","dir":"ltr"},
      "ro":{"name":"Румынский","nativeName":"Română","dir":"ltr"},
      "ru":{"name":"Русский","nativeName":"Русский","dir":"ltr"},
      "sk":{"name":"Словацкий","nativeName":"Slovenčina","dir":"ltr"},
      "sl":{"name":"Словенский","nativeName":"Slovenščina","dir":"ltr"},
      "sm":{"name":"самоа","nativeName":"Samoan","dir":"ltr"},
      "sv":{"name":"Шведский","nativeName":"Svenska","dir":"ltr"},
      "sw":{"name":"Суахили","nativeName":"Kiswahili","dir":"ltr"},
      "ta":{"name":"Тамильский","nativeName":"தமிழ்","dir":"ltr"},
      "te":{"name":"Телугу","nativeName":"తెలుగు","dir":"ltr"},
      "th":{"name":"Тайский","nativeName":"ไทย","dir":"ltr"},
      "to":{"name":"тонга","nativeName":"lea fakatonga","dir":"ltr"},
      "tr":{"name":"Турецкий","nativeName":"Türkçe","dir":"ltr"},
      "uk":{"name":"Украинский","nativeName":"Українська","dir":"ltr"},
      "ur":{"name":"Урду","nativeName":"اردو","dir":"rtl"},
      "vi":{"name":"Вьетнамский","nativeName":"Tiếng Việt","dir":"ltr"},
      "yue":{"name":"Кантонский (традиционное письмо)","nativeName":"粵語 (繁體中文)","dir":"ltr"},
      "zh-Hans":{"name":"Китайский упрощенный","nativeName":"简体中文","dir":"ltr"},
      "zh-Hant":{"name":"Китайский традиционный","nativeName":"繁體中文","dir":"ltr"}}};

    var loadedLanguages = [];
    if (localStorage.getItem('YoutubeTranslator') !== undefined && localStorage.getItem('YoutubeTranslator') !== null) {
        loadedLanguages = JSON.parse(localStorage.getItem('YoutubeTranslator'), true);
    }


    $(document).ready(function() {
        var adder;
        async function languagesToSelect() {
          for (var i = 0; i < Object.keys(Languages.translation).length; i++) {
            let code = Object.keys(Languages.translation)[i];
            $(".select-language").append('<option value="'+code+'">'+Languages.translation[code].name+'</option>');
          }
        }

        async function createElement() {
            var css = '<style>.meta-translator-extension{background:brown;padding:4px 15px;border-radius:5px;color:#fff;user-select:none;cursor:pointer}.meta-translator-extension:hover{background:#791d1d}#popup-meta-translator-extension{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.6);z-index:999999999}#popup-meta-translator-extension .content{background:#fff;width:250px;padding:10px 15px}#popup-meta-translator-extension .loading{background:#fff;width:250px;padding:10px 15px}.h{color:#000;font-size:2em}.selected-languages{margin-top:5px;margin-bottom:5px}.selected-languages a{margin:2px;display:inline-block;border-radius:5px;background:#e8e8e8;padding:2px 5px;color:#000;user-select:none;cursor:pointer}.infotxt{color:#a9a9a9;font-size:1em;word-break:break-all}#g-signin2{margin-top:40px}#Extension-Starts{height:36px;background:brown;color:#fff;font-size:13px;box-shadow:0 2px 4px 0 rgba(0,0,0,.25);text-align:center;margin-left:auto;width:40%;user-select:none;cursor:pointer;-webkit-transition:background-color .218s,border-color .218s,box-shadow .218s;transition:background-color .218s,border-color .218s,box-shadow .218s}.g-signin2{height:36px;background:#fff;color:#000;font-size:13px;box-shadow:0 2px 4px 0 rgba(0,0,0,.25);text-align:center;width:50%;user-select:none;cursor:pointer;-webkit-transition:background-color .218s,border-color .218s,box-shadow .218s;transition:background-color .218s,border-color .218s,box-shadow .218s}#Extension-Starts:hover{-webkit-box-shadow:0 0 3px 3px rgb(244 66 66 / 30%);box-shadow:0 0 3px 3px rgb(244 66 66 / 30%)}.flx{display:-webkit-box;display:-moz-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.flx-column{-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.flx-row{-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.flx-center{justify-content:center;align-items:center}</style>';

            $('head').append(css);
            let btn = '<a class="meta-translator-extension">Перевести название/описание</a>';
            let popup = [
                '<div id="popup-meta-translator-extension" class="flx flx-center" style="display: none;">',
                '<div class="content flx flx-column">',
                '<div class="selected-languages-h">',
                '<a class="h">Выбранные языки:</a>',
                '<div class="selected-languages"></div>',
                '<a class="infotxt" style="margin-left: 2px;">Для удаление языка из списка кликните на него.</a>',
                '</div>',
                '<a class="h" style="margin-top: 5px;">Добавить язык:</a>',
                '<select class="select-language" style="margin-left: 2px; margin-top: 5px;"></select>',
                '<a class="infotxt" style="margin-left: 2px;">Выбирете язык из списка. Он автоматически добавится в существующий список.</a>',
                '<a id="ExtensionError" class="infotxt" style="display: none;; margin-left: 2px; color: red; font-weight: bold;"></a>',
                '<div id="g-signin2" class="flx flx-row"><div id="LoginGoogle" class="g-signin2 flx flx-center"><a>Войти</a></div><div id="Extension-Starts" class="flx flx-center"><a>Старт</a></div></div>',
                '</div>',
                '<div class="loading flx flx-column" style="display: none;">',
                '<a class="h">Обрабатываем...</a>',
                '<a class="infotxt" id="Extension-Status"></a>',
                '</div>',
                '</div>'
            ].join('');

            $(BtnAppend).prepend(btn);
            $("body").prepend(popup);

            languagesToSelect();
            drawLanguages();

            $("#Extension-Starts").on("click", function(evt) {
                var UrlQueryes = getParamsGET();
                var Name = $("#popup-meta-translator-extension").attr("name");
                if (Name === undefined || Name === null || Name == '') { abort("Выполните вход нажав на кнопку Google."); return; }
                $.ajax({
                    url: 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id='+UrlQueryes['v']+'&key='+APIKey,
                    type: "GET",
                    headers: {
                        // "Authorization": "Bearer "+$("#popup-meta-translator-extension").attr("access_token"),
                        "Accept": "application/json"
                    },
                    processData: false,
                    success: function(response) {
                        if (response.items[0].snippet.channelTitle !== Name) {
                            abort("Похоже, это не ваше видео! Вы можете работать только со своим видео.");
                            return;
                        } else {
                            startTranslate(response, UrlQueryes['v'], response.items[0].snippet.categoryId);
                        }

                    }
                });
            });


            $(".meta-translator-extension").on("click", function() {
                $("#popup-meta-translator-extension").attr({"style":""});
            });

            $("#popup-meta-translator-extension").click( function(event) {
                if ($("#popup-meta-translator-extension").css("display") !== "none") {
                    if( $(event.target).closest("#popup-meta-translator-extension .content").length ) return;
                    $("#popup-meta-translator-extension").hide();
                    event.stopPropagation();
                }
            });

            $(".select-language").change(function(evt) {
                var code = $(".select-language").val();
                if(loadedLanguages.indexOf(code) == -1) {
                    loadedLanguages.push(code);
                    drawLanguages();
                }
            });

        }

        async function timerSetter() {
            if ($(BtnAppend) != undefined && $(BtnAppend) != '') {
                clearInterval(adder);
                setTimeout(createElement, 2000);
            }
        }
        adder = setInterval(timerSetter, 1000);



        async function drawLanguages() {
            var searched;
            localStorage.setItem('YoutubeTranslator', JSON.stringify(loadedLanguages));
            $(".selected-languages").html('');

            for (var i = 0; i < loadedLanguages.length; i++) {
              $(".selected-languages").append('<a code="'+loadedLanguages[i]+'">'+Languages.translation[loadedLanguages[i]].name+'</a>');
            }


            if (loadedLanguages.length > 0) {
                $(".selected-languages-h").show();
            } else {
                $(".selected-languages-h").hide();
            }


            $(".selected-languages a").on("click", function(evt) {
                let code = $(evt.currentTarget).attr("code");
                loadedLanguages.splice(loadedLanguages.indexOf(code), 1);
                drawLanguages();
                evt.stopPropagation();
            });
        }
    });



    async function startTranslate(response, query, category) {
        $("#ExtensionError").hide();
        if (APIKey === undefined || APIKey === '') {
            abort('У вас не указан API ключ! Создайте его по данной ссылке: https://console.cloud.google.com/projectselector2/home/dashboard');
            return;
        }
        if (loadedLanguages === undefined || loadedLanguages === null || loadedLanguages.length === 0) {
            abort('Вы не указали ни 1 языка.');
        }

        var snippet = response.items[0].snippet;
        function translate_bing(text, sl, tl, success, complete){
            if(typeof(complete) != 'function')
                complete = function(){};
            $.ajax({
                url: 'https://api.bing.com/json.aspx?JsonCallback=?',
                dataType: 'jsonp',
                data: {
                    'AppId' : 'YOUR_API_KEY',
                    'Query': text.substr(0, 5000),
                    'Sources': 'Translation',
                    'Version': '2.2',
                    'Translation.SourceLanguage': sl,
                    'Translation.TargetLanguage': tl,
                    'JsonType':'callback'
                },
                success: function(response){
                    success(response.SearchResponse.Translation.Results[0].TranslatedTerm || '');
                },
                complete: complete
            });
        }

        async function translate_microsoft(text, to) {
            // return new Promise(resolve => {
            var json;
            var dates = [{"Text":text}];
            const settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://microsoft-translator-text.p.rapidapi.com/translate?to="+to+"&api-version=3.0&profanityAction=NoAction&textType=plain",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "x-rapidapi-key": XRapidMicrosoftKey,
                    "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com"
                },
                "processData": false,
                "data": JSON.stringify(dates),
                "dataType":"JSON"
            };


            async function sendReq() {
                $.ajax(settings).done(function (response) {
                    json = response[0].translations[0].text;
                });
            }

            await sendReq();
            return json;
            // });
        }

        Translated = { "data": [] };
        Translated.title = snippet.title;
        Translated.description = snippet.description;
        Translated.id = query;
        Translated.category = category;

        if (TranslateBy === 'Microsoft') {
            var i = 0;
            $("#popup-meta-translator-extension >").hide();
            $(".loading").show();
            loadDraw();

            async function translateElements() {
                var temp = {};
                temp.code = loadedLanguages[i];
                var AjaxSettings = {
                    "url": "https://microsoft-translator-text.p.rapidapi.com/translate?to="+temp.code+"&api-version=3.0&profanityAction=NoAction&textType=plain",
                    "async": true,
                    "crossDomain": true,
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "x-rapidapi-key": XRapidMicrosoftKey,
                        "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com"
                    },
                    "processData": false,
                    "dataType":"JSON"
                };

                titleTranslate();

                function titleTranslate() {
                    AjaxSettings.data = JSON.stringify([{"Text":snippet.title}]);
                    $.ajax(AjaxSettings).done(function (response) {
                        temp.title = response[0].translations[0].text;
                        descriptionTranslate();
                    });

                }

                function descriptionTranslate() {
                    AjaxSettings.data = JSON.stringify([{"Text":snippet.description}]);
                    $.ajax(AjaxSettings).done(function (response) {
                        temp.description = response[0].translations[0].text;
                        Translated.lang = response[0].detectedLanguage.language;
                        repeatContinue(temp)
                    });
                }

                function repeatContinue(value) {
                    Translated.data[i] = value;
                    loadDraw();
                    i = i+1;

                    if (i < loadedLanguages.length) {
                        translateElements();
                    } else {
                      addDefaultLanguage();

                    }
                }

            }

            function loadDraw() {
                $("#Extension-Status").html('Переводим текст '+(i+1)+'/'+loadedLanguages.length+' ('+loadedLanguages[i]+')');
            }

            translateElements();
        }


    }

    function translateFinish(text) {
        $("#Extension-Status").html(text);
        setTimeout(function() {
            $("#popup-meta-translator-extension .content").show();
            $("#popup-meta-translator-extension .loading").hide();
        }, 5000);
    }

    function addDefaultLanguage() {
      $("#Extension-Status").html('Добавляем язык по умолчанию...');
        var req = {
            "id": Translated.id,
            "snippet": {
                "title": Translated.title,
                "description": Translated.description,
                "categoryId": Translated.category,
                "defaultLanguage": Translated.lang
            }
        }
        req = JSON.stringify(req);
        $.ajax({
            url: 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&alt=json&key='+APIKey,
            type: "PUT",
            headers: {
                "Authorization": "Bearer "+$("#popup-meta-translator-extension").attr("access_token"),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            processData: false,
            data: req,
            success: function(response) {
                addLanguagesToVideo();
            }
        });
    }

    function addLanguagesToVideo() {
      var req = {
          "id": Translated.id,
          "localizations": {}
      }
      createJSON();

      async function createJSON() {
        $("#Extension-Status").html('Создаём список языков...');
        for (var i = 0; i < Translated.data.length; i++) {
          let ins = {
            "title": Translated.data[i].title,
            "description": Translated.data[i].description
          }
          req.localizations[Translated.data[i].code] = ins;
        }
        addLanguageVID();
      }

      async function addLanguageVID() {
        $("#Extension-Status").html('Добавляем языки к видео...');
        req = JSON.stringify(req);
        $.ajax({
            url: 'https://youtube.googleapis.com/youtube/v3/videos?part=localizations&alt=json&key='+APIKey,
            type: "PUT",
            headers: {
                "Authorization": "Bearer "+$("#popup-meta-translator-extension").attr("access_token"),
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            processData: false,
            data: req,
            success: function(response) {
                translateFinish('Успешно!');
            },
            error: function() {
              translateFinish('Произошла ошибка. Похоже, какой-то из языков не поддерживается ютубом.');
            }
        });
      }
    }



    function getParamsGET() {
        var tmp = new Array();
        var tmp2 = new Array();
        var param = new Array();

        var get = location.search;
        if(get != '') {
            tmp = (get.substr(1)).split('&');
            for(var i=0; i < tmp.length; i++) {
                tmp2 = tmp[i].split('=');
                param[tmp2[0]] = tmp2[1];
            }
        } else return false;
        return param;
    }

    function abort(text) {
        $("#ExtensionError").html(text).show();
    }



  var GoogleAuth;
  var SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl';
    handleClientLoad();
  async function handleClientLoad() { gapi.load('client:auth2', initClient); }

  async function initClient() {
    gapi.client.init({
        'apiKey': APIKey,
        'clientId': AppCode,
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        'scope': SCOPE
    }).then(async function () {
      GoogleAuth = gapi.auth2.getAuthInstance();
      GoogleAuth.isSignedIn.listen(updateSigninStatus);

      var user = GoogleAuth.currentUser.get();
      $("#popup-meta-translator-extension").attr("access_token", user.xc.access_token);
      $("#popup-meta-translator-extension").attr("name", user.wt.Ad);

      setSigninStatus();
      $('#LoginGoogle').click(function() {
        handleAuthClick();
      });
    });
  }

  async function handleAuthClick() {
    if (GoogleAuth.isSignedIn.get() === true) {
      GoogleAuth.signOut();
    } else {
      GoogleAuth.signIn();
    }
    updateSigninStatus();
  }

  function revokeAccess() {
    GoogleAuth.disconnect();
    updateSigninStatus();
  }

  async function setSigninStatus() {
    var user = GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
      $("#LoginGoogle a").html('Выполнено');
    } else {
      $("#LoginGoogle a").html('Войти');
    }
  }

  async function updateSigninStatus() {
    setSigninStatus();
  }


})();
