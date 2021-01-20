'use strict'

/* 
Jak działa program: 

Jeśli nie było focus'a na jednym z pól, okno modalne zgłosi błąd. 

Po focus'ie (na input czy textarea) będzie ładowany asynchronicznie skrypt przetwarzania e-mail (w <body>).

Następnie, jeśli klikniesz przycisk wysyłania danych, wcześniej pobrany skrypt pocztowy zostanie uruchomiony asynchronicznie, pusty, bez danych, co potwierdzi prawidłowe działanie programu. Jednocześnie uruchomi się spinner, a po zakończeniu przetwarzania skryptu zostanie wyświetlony komunikat do konsoli o prawidłowym wykonaniu skryptu.
*/

const localStore = {
    isFocusHit: false,
    smtpjsScriptIsLoaded: false,
}

const getMainInput = document.getElementById('main-input')
const getMainTextarea = document.getElementById('main-textarea')
const getMainSubmitButton = document.getElementById('main-submit')
const getMessageFromName = document.getElementById('messageFromName')
const getModalBody = document.getElementById('customModalBody')

/**
 * Process 2 situation for Modal-board: before e-mail script load and after
 */
function clickOnModal() {   
    switch (localStore.smtpjsScriptIsLoaded) {
        case false:
            getMessageFromName.innerHTML = 'Proszę podać poprawne dane do wysłania!'
            getModalBody.innerHTML = 'Proszę podać poprawne dane do wysłania!'
            return
        case true:
            getMessageFromName.innerHTML = getMainInput.value
            getModalBody.innerHTML = getMainTextarea.value
            return
        default:
            return
    }
}

/**
 * For async download of script and inserting it to tag 'body'
 * @param {string} url 
 */
async function loadScript(url) {
    try {
        const response = await fetch(url)

        const urlToScript = await response.url

        let scriptToBody = document.createElement('script')
        scriptToBody.src = urlToScript
        document.body.appendChild(scriptToBody)

        console.log(`${url} script is get from url and insert to body`)

        localStore.smtpjsScriptIsLoaded = true
    } catch (error) {
        console.log('Fetch error: ', error)
        alert(
            'Jakiś błąd. Spróbuj połączyć się z Internetem i przeładować stronę...'
        )
    }
}

function submitFunctionPreven(event) {
    event.preventDefault()
    return false
}

/**
 * For testing correct downloading of e-mail script, and Email object
 * Also for start and stop of spinner, while await
 */
async function hitSubmit() {
    if (typeof Email !== 'undefined') {
        document.getElementById(
            'loading'
        ).innerHTML = `<img src='./src/spinner.gif' />`

        // emulate processing data
        await Email.send({})

        document.getElementById('loading').innerHTML = null

        console.log('Script working correct!')
    }
}

// Process focus on input 
getMainInput.addEventListener('focus', () => {
    if (localStore.isFocusHit === false) {
        loadScript('https://smtpjs.com/v3/smtp.js')
    }
    localStore.isFocusHit = true
})

// Process focus on textarea 
getMainTextarea.addEventListener('focus', () => {
    if (localStore.isFocusHit === false) {
        loadScript('https://smtpjs.com/v3/smtp.js')
    }
    localStore.isFocusHit = true
})

// Process submit actions
getMainSubmitButton.addEventListener('click', () => {
    clickOnModal()
    hitSubmit()
})
 