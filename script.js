const inputText = document.getElementById('inputText');
const output = document.getElementById('output');

inputText.addEventListener('input', () => {
    output.textContent = inputText.value;
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('Service Worker registriert mit Scope:', registration.scope);
        }).catch(error => {
            console.log('Service Worker Registrierung fehlgeschlagen:', error);
        });
    });
}
