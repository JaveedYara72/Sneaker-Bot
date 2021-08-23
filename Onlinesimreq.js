// https://onlinesim.ru/api/METHOD_NAME.php?PARAMETERS&apikey=YOUR_APIKEY&lang=LANGUAGE

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://onlinesim.ru/api/getNum.php?apikey=86369120f8b9a9b37aa94da987f993e8&service=VKcom",
    "method": "GET",
    "headers": {"accept": "application/json"}
}
$.ajax(settings).done(function (response) {
    console.log(response);
});