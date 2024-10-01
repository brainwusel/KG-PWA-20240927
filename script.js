const inputText = document.getElementById('inputText');
var output = document.getElementById('output');
var container = document.getElementById("container");
var outputHeight = document.getElementById("outputHeight")
var containerHeight = document.getElementById("containerHeight")
var bodyHeight =document.getElementById("bodyHeight")




/*inputText.addEventListener('input', () => { */

function displayText() {    
    output.style.fontSize = "1px"
    var fontGroesse = 1
    /*outputHeight.textContent = output.clientHeight
    containerHeight.textContent = container.clientHeight
    bodyHeight.textContent = screen.availHeight*/

    while(container.clientHeight < screen.availHeight/1.5) {
        fontGroesse = fontGroesse + 1
        output.style.fontSize = `${fontGroesse-1}px`;
        output.textContent = inputText.value; 
    } 
};

/*
function resize_to_fit() {
    var output = document.getElementById("output");
    var container = document.getElementById("container");
    let fontSize = window.getComputedStyle(output).fontSize;
    output.style.fontSize = parseFloat(fontSize) - 1 + "px"

    if (output.clientHeight >= container.clientHeight) {
      resize_to_fit();
    }
}
*/

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('Service Worker registriert mit Scope:', registration.scope);
        }).catch(error => {
            console.log('Service Worker Registrierung fehlgeschlagen:', error);
        });
    });
}
