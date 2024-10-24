const inputText = document.getElementById('inputText'); // mit let anstatt var funktioniert es nicht!
const outputText = document.getElementById('outputText');
const container = document.getElementById("container");
const outputTitel = document.getElementById("outputTitel");
const outputTonart = document.getElementById("outputTonart");

function musikStueck (id,nummer,titel,tonart,mappe) {
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
    let _musikSammlung = [musikStueck];
    let _musikStueckeQuellText = await getText("musikstückequelle.csv");
    let _musikStueckeArray = _musikStueckeQuellText.split('\n');
    for (msText of _musikStueckeArray) {
        
        let msArray = msText.split(';');

        let _musikStueck = musikStueck(msArray[0],msArray[1],msArray[2],msArray[3],msArray[4]);
        alert("böh" + _musikStueck.titel);
        alert(`_musikStueck.titel: ${_musikStueck.titel}`);
        
        _musikSammlung = _musikSammlung + musikStueck(msArray[0],msArray[1],msArray[2],msArray[3],msArray[4]);
    }
    alert(_musikSammlung[10].titel);
    return(_musikSammlung)
}


inputText.addEventListener("keydown", endInput);

function endInput(e) {
    if (e.code == "Enter"){
        inputText.hidden=true
        displayText()
    }
   /* if (e.code == "?"){
        let meinAuto = Auto("Audi","rot",500);
        meinAuto.zeige();
    }*/
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
            while((container.clientHeight < screen.availHeight*0.6) & (container.clientWidth < screen.availWidth)) {
                outputText.style.fontSize = `${fontGroesse}px`;
                outputText.style.fontFamily = "Times";
                outputText.style.overflowWrap = "normal"
                outputText.textContent = inputText.value;
                fontGroesse = fontGroesse + 1;
            } 
            fontGroesse = fontGroesse - 1;
            outputText.style.fontSize = `${fontGroesse}px`;
            outputText.textContent = inputText.value;
        }
    else {
        inputText.value="";
    }
    outputTitel.textContent="DAS IST DER TITEL VON " + musikSammlung[9].titel;
    outputTonart.textContent="DAS IST DIE TONART VON " + musikSammlung[9].tonart;
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
