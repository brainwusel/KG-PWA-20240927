var inputText = document.getElementById('inputText');
var outputText = document.getElementById('outputText');
var outputTitel = document.getElementById('outputTitel')
var outputTonart = document.getElementById('outputTitel')
var container = document.getElementById("container");

inputText.addEventListener("keydown", endInput);

function endInput(e) {
    if (e.code === "Enter"){
        inputText.hidden=true
        displayText()
    }
}


function displayText() {  
    if (inputText.value.charAt(0) === " "){
        inputText.value="KG Blau-Weiß Fischenich";
        outputText.style.hyphens = "none"
    } else {
        outputText.style.hyphens = "auto"
    }
    if (inputText.value) {        
            outputText.style.fontSize = "1px";
            var fontGroesse = 1;
            while((container.clientHeight < screen.availHeight*0.8) & (container.clientWidth < screen.availWidth)) {
                fontGroesse = fontGroesse + 1;
                outputText.style.fontSize = `${fontGroesse}px`;
                outputText.style.fontFamily = "Times";
                outputText.style.overflowWrap = "normal"
                outputText.textContent = inputText.value;
            } 
        }
    else {
        inputText.value="";
    }
outputTitel.textContent = ""
outputTonart.textContent = ""

}

document.addEventListener("touchend", startInput);

function startInput() {
    outputText.textContent=""
    outputTitel.textContent=""
    inputText.value=""
    inputText.hidden=false
    inputText.focus()
}


if ('serviceworker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('Service Worker registriert mit Scope:', registration.scope);
        }).catch(error => {
            console.log('Service Worker Registrierung fehlgeschlagen:', error);
        });
    });
}
