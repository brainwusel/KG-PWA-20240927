const inputText = document.getElementById('inputText');
const containerGesamt = document.getElementById("containerGesamt");
const containerOben = document.getElementById("containerOben");
const containerTitel = document.getElementById("containerTitel");
const outputTitel = document.getElementById("outputTitel");
const containerTonart = document.getElementById("containerTonart");
const outputTonart = document.getElementById("outputTonart");
const containerUnten = document.getElementById("containerUnten");
const outputText = document.getElementById("outputText");

let musikStueckAngezeigt = false

function MusikStueck (id,nummer,titel,tonart,mappe) {
    this.id = id;
    this.nummer = nummer;
    this.titel = titel;
    this.tonart = tonart;
    this.mappe = mappe;
}

let musikSammlung = [];

async function getText (file) {
    let myText = "";
    let myObject = await fetch(file);
    myText = await myObject.text();
    return(myText);    
}

async function musikSammlungErstellen () {
    let _musikSammlung = [];
    let _musikStueckeQuellText = await getText("musikstückequelle.csv");
    let _musikStueckeArray = _musikStueckeQuellText.split('\n');
    for (msText of _musikStueckeArray) {
        let msArray = msText.split(';');
        let _musikStueck = new MusikStueck(msArray[0],msArray[1],msArray[2],msArray[3],msArray[4]);
        _musikSammlung.push(_musikStueck);
    }
    musikSammlung = _musikSammlung;
}

inputText.addEventListener("keydown", endInput);

function endInput(e) {
    inputText.value = String(inputText.value).toUpperCase();
    if (e.code === "Space") {
        inputText.inputMode = "text"
    }
    if (e.code === "Enter"){
        inputText.hidden=true;        
        displayText();
    }
}

function displayText() {  
    
    containerGesamt.hidden=false;
    containerOben.hidden=false;
    containerTitel.hidden=false;
    containerTonart.hidden=false;
    containerUnten.hidden=false;
    outputText.hidden=false;
    outputTitel.hidden=false;
    outputTonart.hidden=false;
    inputText.hidden=true;

    inputText.value = String(inputText.value).trim();

    if (inputText.value.charAt(0) === " " || inputText.value === ""){
        inputText.value="KG Blau-Weiß Fischenich";
        outputText.style.hyphens = "none";
    } else {
        outputText.style.hyphens = "auto";
    };

   

    outputTitel.textContent = "";
    outputTitel.style.backgroundColor = "white";

    outputTonart.textContent = "";
    outputTonart.style.backgroundColor = "white";

    for (m of musikSammlung) {
        if (String(m.nummer) === String(inputText.value)) {
            musikStueckAngezeigt = true;
            if (String(m.mappe).startsWith("gelb")){
                containerTitel.style.backgroundColor = "yellow";
                outputTitel.style.backgroundColor = "yellow";
                outputTitel.style.color = "black";
                containerTonart.style.backgroundColor = "yellow";
                outputTonart.style.backgroundColor = "yellow";
                outputTonart.style.color = "black";
            } 
            else if (String(m.mappe).startsWith("grün")){
                containerTitel.style.backgroundColor = "green";
                outputTitel.style.backgroundColor = "green";
                outputTitel.style.color = "white";
                containerTonart.style.backgroundColor = "green";
                outputTonart.style.backgroundColor = "green";
                outputTonart.style.color = "white";
            }
            else if (String(m.mappe).startsWith("blau")){
                containerTitel.style.backgroundColor = "blue";
                outputTitel.style.backgroundColor = "blue";
                outputTitel.style.color = "white";
                containerTonart.style.backgroundColor = "blue";
                outputTonart.style.backgroundColor = "blue";
                outputTonart.style.color = "white";
            }
            
            if (m.titel !== " " && m.titel !== ""){
                // outputTitel.style.fontSize = "50px";
                var fontGroesse = 1;
                do {
                    fontGroesse = fontGroesse + 1;
                    outputTitel.style.fontSize = `${fontGroesse}px`;
                    outputTitel.style.fontFamily = "Times";
                    outputTitel.style.overflowWrap = "normal";
                    outputTitel.textContent = m.titel;
                } while((outputTitel.clientHeight < containerTitel.clientHeight) & (outputTitel.clientWidth <= containerTitel.clientWidth))           
                fontGroesse = fontGroesse - 1;
                outputTitel.style.fontSize = `${fontGroesse}px`;      
            }
            if (m.tonart !== " "){
                // outputTonart.style.fontSize = "50px";
                var fontGroesse = 1;
                do {
                    fontGroesse = fontGroesse + 1;
                    outputTonart.style.fontSize = `${fontGroesse}px`;
                    outputTonart.style.fontFamily = "Times";
                    outputTonart.style.overflowWrap = "normal";
                    outputTonart.textContent = m.tonart;
                } while((outputTonart.clientHeight < containerTonart.clientHeight) & (outputTonart.clientWidth <= containerTonart.clientWidth))           
                fontGroesse = fontGroesse - 1;
                outputTonart.style.fontSize = `${fontGroesse}px`;         
            }
            break;
        }
    }

    if (inputText.value) { 
        outputText.textContent = inputText.value;
        outputText.style.fontSize = "50px";

        var fontGroesse = 1;

        if (musikStueckAngezeigt === true) {
            do {
                  fontGroesse = fontGroesse + 1;
                outputText.style.fontSize = `${fontGroesse}px`;
                outputText.style.fontFamily = "Times";
                outputText.style.overflowWrap = "normal";
                outputText.textContent = inputText.value;
                } while((outputText.clientHeight < containerUnten.clientHeight) & (outputText.clientWidth <= containerUnten.clientWidth))           
            fontGroesse = fontGroesse - 1;
        }
        if (musikStueckAngezeigt === false) {
            do {
                  fontGroesse = fontGroesse + 1;
                outputText.style.fontSize = `${fontGroesse}px`;
                outputText.style.fontFamily = "Times";
                outputText.style.overflowWrap = "normal";
                outputText.textContent = inputText.value;
                } while((outputText.clientHeight < containerGesamt.clientHeight) & (outputText.clientWidth <= containerGesamt.clientWidth))           
            fontGroesse = fontGroesse - 1;
        }
        outputText.style.fontSize = `${fontGroesse}px`;
        outputText.textContent = inputText.value;
    }
}

document.addEventListener("touchend", startInput);
document.addEventListener("mousedown", startInput);

function startInput() {
    musikStueckAngezeigt = false;

    containerGesamt.hidden=true;
    containerOben.hidden=true;
    containerTitel.hidden=true;
    containerTonart.hidden=true;
    containerUnten.hidden=true
    outputText.hidden=true;
    outputTitel.hidden=true;
    outputTonart.hidden=true;
    inputText.hidden=false;

    outputText.textContent="";
    outputTitel.textContent="";
    outputTonart.textContent="";
    inputText.value="";
    inputText.focus();
    inputText.inputMode="numeric";

    containerOben.style.backgroundColor = "white";
    containerTitel.style.backgroundColor = "white";
    containerTonart.style.backgroundColor = "white";
    containerUnten.style.backgroundColor = "white";
    outputTitel.style.backgroundColor = "white";
    outputTonart.style.backgroundColor = "white";
    outputText.style.backgroundColor = "white";

    outputTitel.style.color = "black";
    outputTonart.style.color = "black";
    outputText.style.color = "black";
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
