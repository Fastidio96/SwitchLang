/**
* MIT License
* 
* Copyright (c) 2020 Raffaello Perazzi
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
**/

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

document.addEventListener("DOMContentLoaded", function(event) {
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
});