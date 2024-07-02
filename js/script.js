const text = document.querySelector('#text');
const encryptButton = document.querySelector('.container__encrypt__button');
const containerCopy = document.querySelector('.container__copy');
const decryptButton = document.querySelector('.container__button__decrypt');
const copyButton = document.querySelector('.container__copy__button');

const key = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat',
}; 

function encrypt(key, text) {
    const encryptedText = text.split('').map((letter) => {
        if (key[letter]) {
            return key[letter];
        }
        return letter;
    }).join('');

    return encryptedText;
}

function decrypt(key, text) {
    let newText = "";
    for (let i = 0; i < text.length; i++) {
        const element = text[i]; // Pegando a letra atual
        const keyValue = key[element]; // Pegando o valor da letra atual

        if (keyValue) { // Se a letra atual for uma chave
            const kvl = keyValue.length; // Tamanho do valor da chave atual
            const nt = text.slice(i, i + kvl); // Pegando a substring do texto atual com o tamanho do valor da chave atual
            if (keyValue === nt) {
                i += kvl - 1;
            }
        }

        newText += element; // Adicionando a letra atual ao texto
    }

    return newText;
}

function verifyText(text) {
    const regex = /^[a-z\s.,;:!?]*$/;
    if (!regex.test(text)) {
        alert('Digite apenas letras minúsculas e sem acentos');
        return false;
    }
    return true;
}

function clearText() {
    text.value = '';
    decryptButton.disabled = true;
}

function focusText() {
    text.focus();
}

function clearContainerCopy() {
    containerCopy.innerHTML = '';
}

function addHtmlContent(element, text){
    element.innerHTML = text;
}

function createElement(element, className, id, text) {
    const el = document.createElement(element);
    el.className = className;
    el.id = id;
    el.innerHTML = text;
    return el;
}

function createButton(className, id, text) {
    const button = document.createElement('button');
    button.className = className;
    button.id = id;
    button.innerHTML = text;
    return button;
}

function addNode(parent, element) {
    parent.appendChild(element);
}

function createDefaultCopySection(text) {
    const div = document.createElement('div');
    div.className = 'container__copy__have';
    
    const p = document.createElement('p');
    addHtmlContent(p, text);

    const button = createButton('container__button container__copy__button', 'btn__copy', 'Copiar');

    addNode(div, p);
    addNode(div, button);
    addNode(containerCopy, div);
}

function createInvalidAlert() {
    const div = document.createElement('div');
    div.className = 'container__copy__dont-have';
    
    const p = document.createElement('p');
    addHtmlContent(p, 'Digite algo válido para ser criptografado');

    addNode(div, p);
    addNode(containerCopy, div);
    
    // A div deve ser filha da main
    const main = document.querySelector('main');
    main.appendChild(div);

    // Limpar o alerta após 2 segundos
    setTimeout(() => {
        div.className = "container__copy__dont-have hide";
    }, 2000);
    setTimeout(() => {
        div.remove();
    }, 3000);
}

text.addEventListener('input', (e) => {
    if (text.value === '') {
        decryptButton.disabled = true;
    } else {
        decryptButton.disabled = false;
    }
})

encryptButton.addEventListener('click', (e) => {
    const textValue = text.value;

    if (textValue === '') {
        createInvalidAlert();
        return;
    }

    if (!verifyText(textValue)) {
        return;
    }

    clearContainerCopy();

    const encryptedText = encrypt(key, textValue);

    createDefaultCopySection(encryptedText);

    clearText();
    focusText();
})

decryptButton.addEventListener('click', (e) => {
    const textValue = text.value;

    if (textValue === '') {
        createInvalidAlert();
        return;
    }

    if (!verifyText(textValue)) {
        return;
    }

    clearContainerCopy();

    const decryptedText = decrypt(key, textValue);

    createDefaultCopySection(decryptedText);

    clearText();
    focusText();
})

containerCopy.addEventListener('click', (e) => {
    if (e.target.id !== 'btn__copy') return; // Se o botão clicado não for o de copiar, retornar

    const text = e.target.previousElementSibling.innerHTML; // Pegando o texto, que é o irmão anterior do botão
    navigator.clipboard.writeText(text); // Copiando o texto
    e.target.innerHTML = 'Copiado'; // Mudando o texto do botão
    setTimeout(() => {
        e.target.innerHTML = 'Copiar'; // Voltando o texto do botão
    }, 500);

    // Limpando o p da div
    e.target.previousElementSibling.innerHTML = '';

    focusText();
});

