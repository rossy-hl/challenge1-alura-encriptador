const el = document.querySelector('div[contenteditable]');
const encriptButton = document.querySelector('#btn-encriptar');
const desencriptButton = document.querySelector('#btn-desencriptar');
const copyButton = document.querySelector('#btn-copiar');

const letras = ['a', 'e', 'i', 'o', 'u'];
const encriptadas = ['ai', 'enter', 'imes', 'ober', 'ufat'];

// Remueve tildes y eñes del texto
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Quita el formato al pegar en el div content editable
el.addEventListener('paste', function (e) {
    e.preventDefault()
    var text = e.clipboardData.getData('text/plain')
    document.execCommand('insertText', false, text)
})

function mostrarRespuesta(request) {
    if (request.trim().length > 0) {
        document.querySelector("#notfound").style.display = "none"
        document.querySelector("#result").innerHTML = request
        document.querySelector("#showdata").style.display = "flex"
    } else {
        document.querySelector("#notfound").style.display = "block"
        document.querySelector("#result").innerHTML = ""
        document.querySelector("#showdata").style.display = "none"
    }
}

function encriptar() {
    let request = removeAccents(el.innerHTML).toLowerCase();
    let solucion = "";
    for (let letra of request) {
        for (let i = 0; i < letras.length; i++) {
            if (letra == letras[i]) {
                letra = encriptadas[i];
                break;
            }
        }
        solucion += letra;
    }
    
    mostrarRespuesta(solucion);
}

function desencriptar() {
    let request = removeAccents(el.innerHTML).toLowerCase()
    for (let i = 0; i < encriptadas.length; i++) {
        request = request.replaceAll(encriptadas[i], letras[i])
    }
    mostrarRespuesta(request);
}

function clipboard() {
    var copyText = document.querySelector("#result").innerHTML;

    navigator.clipboard.writeText(copyText);
}

encriptButton.addEventListener('click', encriptar);
desencriptButton.addEventListener('click', desencriptar);
copyButton.addEventListener('click', clipboard);
