
//Developed by Raffaello Perazzi
//Version 1.1
//Require JQuery

function loadJSON(callback,selected) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    switch(selected){
        case "it":
            xobj.open('GET', 'vendor/lang/it.json', true);
            localStorage.setItem('lang', 'it');
            console.log(">>> Changed language to it."); 
            break;
        case "en":
            xobj.open('GET', 'vendor/lang/en.json', true);
            localStorage.setItem('lang', 'en'); 
            console.log(">>> Changed language to en."); 
            break;
        default: 
            xobj.open('GET', 'vendor/lang/it.json', true); 
            console.log(">>> Changed language to default (it)."); 
            break;
    }    
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}
function switchLang(selected) {
 loadJSON(function(response) {
    var text = JSON.parse(response);
    Object.keys(text).forEach(key => {
        var elem = document.querySelector("[idlang='" + key + "']");
        if (typeof(elem) != 'undefined' && elem != null){
            elem.innerText = text[key]; 
        }
    })
 },selected);
}

$( document ).ready(function() {

    var currentLang = localStorage.getItem('lang');
    switch(currentLang){
        case null:
            switchLang();
            break;
        case "it":
            switchLang("it");
            break;
        case "en":
            switchLang("en");
            break;
        default:
            switchLang("it");
            break;
    }
})