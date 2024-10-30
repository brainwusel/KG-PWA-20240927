const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const containerGesamt = document.getElementById("containerGesamt");
const outputTitel = document.getElementById("outputTitel");
const outputTonart = document.getElementById("outputTonart");
const containerOben = document.getElementById("containerOben");

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
    if (e.code == "Enter"){
        inputText.hidden=true;        
        displayText();
    }
}

function displayText() {  
    outputText.hidden=false;
    outputTitel.hidden=false;
    outputTonart.hidden=false;
    inputText.hidden=true;

    if (inputText.value.charAt(0) === " "){
        inputText.value="KG Blau-Weiß Fischenich";
        outputText.style.hyphens = "none";
    } else {
        outputText.style.hyphens = "auto";
    };

    if (inputText.value) { 
        outputText.textContent = inputText.value;
        alert(outputText.textContent);
        outputText.style.fontSize = "1px";
        var fontGroesse = 1;
        do {
             fontGroesse = fontGroesse + 1;
             outputText.style.fontSize = `${fontGroesse}px`;
             outputText.style.fontFamily = "Times";
             outputText.style.overflowWrap = "normal";
             outputText.textContent = inputText.value;
        } while((outputText.clientHeight < containerGesamt.clientHeight) & (outputText.clientWidth <= containerGesamt.clientWidth))           
        fontGroesse = fontGroesse - 1;
        outputText.style.fontSize = `${fontGroesse}px`;
        outputText.textContent = inputText.value;
    }
    else {
        inputText.value="";
    };

    outputTitel.textContent = "";
    outputTitel.style.backgroundColor = "white";
    outputTonart.textContent = "";
    outputTonart.style.backgroundColor = "white";

    for (m of musikSammlung) {
        if (String(m.nummer) === String(inputText.value)) {
            if (String(m.mappe).startsWith("gelb")){
                outputTitel.style.backgroundColor = "yellow";
                outputTonart.style.backgroundColor = "yellow";
            } 
            else if (String(m.mappe).startsWith("grün")){
                outputTitel.style.backgroundColor = "green";
                outputTonart.style.backgroundColor = "green";
            }
            else if (String(m.mappe).startsWith("blau")){
                outputTitel.style.backgroundColor = "blue";
                outputTonart.style.backgroundColor = "blue";
            }
            outputTitel.textContent = m.titel;
            //outputTitel.style.fontSize = fontSizeAnpassen(outputTitel,containerOben,m.titel,outputTitel.style);
            outputTonart.textContent = m.tonart;
            break;
        }
    }
}

//SCHROTT:
function fontSizeAnpassen (textFeld, conti, textString, textStringStyle){ // für Ausgabe: textfeld - outputText, conti - container, textString - inputText.value, textStringStyle - outputText.style
    let _fontGroesse = 1;
    do {
        _fontGroesse = _fontGroesse + 1;
        textFeld.style = textStringStyle;
        textFeld.style.fontSize = `${_fontGroesse}px`; // Festlegung ...style.fontFamiliy und ...style.overflowWrap VOR Aufruf der Funktion
        textFeld.textContent = textString;
        alert(textFeld.style.fontSize + " " + textFeld.clientHeight + " " + conti.clientHeight + " " + textFeld.clientWidth + " " + conti.clientWidth);
    } while((textFeld.clientHeight < 2 * conti.clientHeight) & (textFeld.clientWidth <= conti.clientWidth));
    alert(textFeld.style.fontSize);
    return textFeld.style.fontSize;
}

document.addEventListener("touchend", startInput);
document.addEventListener("mousedown", startInput);

function startInput() {
    outputText.textContent="";
    outputText.hidden=true;
    outputTitel.textContent="";
    outputTitel.hidden=true;
    outputTonart.textContent="";
    outputTonart.hidden=true;
    inputText.value="";
    inputText.hidden=false;
    inputText.focus();
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
