var inputText = document.getElementById('inputText');
var output = document.getElementById('output');
var container = document.getElementById("container");
var outputHeight = document.getElementById("outputHeight")
var containerHeight = document.getElementById("containerHeight")
var bodyHeight =document.getElementById("bodyHeight")

function displayText() {  
   
    if (inputText.value) {
        output.style.fontSize = "1px";
        var fontGroesse = 1;
        while((container.clientHeight < screen.availHeight/1) & (container.clientWidth < screen.availWidth)) {
            fontGroesse = fontGroesse + 1;
            output.style.fontSize = `${fontGroesse+5}px`;
            output.textContent = inputText.value;
        } 
        inputText.value="";
    } else {
        inputText.value="";
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('Service Worker registriert mit Scope:', registration.scope);
        }).catch(error => {
            console.log('Service Worker Registrierung fehlgeschlagen:', error);
        });
    });
}
