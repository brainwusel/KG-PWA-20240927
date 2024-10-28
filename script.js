const inputText = document.getElementById('inputText'); // mit let anstatt var funktioniert es nicht!
const outputText = document.getElementById('outputText');
const container = document.getElementById("container");
const outputTitel = document.getElementById("outputTitel");
const outputTonart = document.getElementById("outputTonart");

function MusikStueck (id,nummer,titel,tonart,mappe) {
    this.id = id;
    this.nummer = nummer;
    this.titel = titel;
    this.tonart = tonart;
    this.mappe = mappe;
}
let musikSammlung = [];

//----------------------------------------------------------------

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
    /* 
    for (m of _musikSammlung){
        alert(m.nummer + "..." + m.titel + "..." + m.tonart + "..." + m.mappe);
    }
    */
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

    if (inputText.value.charAt(0) === " "){
        inputText.value="KG Blau-Weiß Fischenich";
        outputText.style.hyphens = "none";
    } else {
        outputText.style.hyphens = "auto";
    };

    if (inputText.value) {    
        outputText.style.fontSize = "1px";
        var fontGroesse = 1;
        alert(fontGroesse);
        outputText.style.fontSize = `${fontGroesse}px`;
            outputText.style.fontFamily = "Times";
            outputText.style.overflowWrap = "normal";
            outputText.textContent = inputText.value;
            fontGroesse = fontGroesse + 1;
        while((outputText.clientHeight < container.clientHeight) & (outputText.clientWidth < container.clientWidth)) {
            outputText.style.fontSize = `${fontGroesse}px`;
            outputText.style.fontFamily = "Times";
            outputText.style.overflowWrap = "normal";
            outputText.textContent = inputText.value;
            fontGroesse = fontGroesse + 1;
        } 
        fontGroesse = fontGroesse - 1;
        outputText.style.fontSize = `${fontGroesse}px`;
        outputText.textContent = inputText.value;
    }
    else {
        inputText.value="";
    };

    outputText.title.textContent = "";
    outputTonart.textContent = "";
    for (m of musikSammlung) {
        if ("m.nummer" === inputText.textContent) {
            outputTitel.textContent = m.titel;
            outputTonart.textContent = m.tonart;
        }
        break;
    }

}


document.addEventListener("touchend", startInput);
document.addEventListener("mousedown", startInput);

function startInput() {
    // alert(JSON.stringify(outputText.textContent));
    outputText.textContent="";
    outputTitel.textContent="";
    outputTonart.textContent="";
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
