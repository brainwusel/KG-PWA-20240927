var inputText = document.getElementById('inputText');
var output = document.getElementById('output');
var container = document.getElementById("container");
var outputHeight = document.getElementById("outputHeight")
var containerHeight = document.getElementById("containerHeight")
var bodyHeight =document.getElementById("bodyHeight")

inputText.addEventListener("input", displayText)

function displayText() {  
    if (inputText.value) {
        if (inputText.value.charAt(0) !== " "){
           output.style.fontSize = "1px";
            var fontGroesse = 1;
            while((container.clientHeight < screen.availHeight*0.8) & (container.clientWidth < screen.availWidth)) {
                fontGroesse = fontGroesse + 1;
                output.style.fontSize = `${fontGroesse+1}px`;
                output.textContent = inputText.value;
            } 
            //if (inputText.value === "Enter") {inputText.value=""};
        } else {
            inputText.value="";
            output.textContent="";
        }
    } else {
        inputText.value="";
    }
}

inputText.addEventListener("keydown", endInput);

function endInput(e) {
    if (e.code === "Enter"){
        inputText.hidden=true
    }
}

document.addEventListener("touchend", startInput);

function startInput() {
    output.textContent=""
    inputText.value=""
    inputText.hidden=false
    inputText.focus()
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
