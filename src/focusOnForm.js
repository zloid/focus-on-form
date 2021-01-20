'use strict'

const localStore = {
    isFocusHit: false,
    smtpjsScriptIsLoaded: false,
}

const getMainInput = document.getElementById('main-input')
const getMainTextarea = document.getElementById('main-textarea')
const getMainSubmitButton = document.getElementById('main-submit')
const getMessageFromName = document.getElementById('messageFromName')
const getModalBody = document.getElementById('customModalBody')

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

getMainInput.addEventListener('focus', () => {
    if (localStore.isFocusHit === false) {
        loadScript('https://smtpjs.com/v3/smtp.js')
    }
    localStore.isFocusHit = true
})

getMainTextarea.addEventListener('focus', () => {
    if (localStore.isFocusHit === false) {
        loadScript('https://smtpjs.com/v3/smtp.js')
    }
    localStore.isFocusHit = true
})

getMainSubmitButton.addEventListener('click', () => {
    clickOnModal()
    hitSubmit()
})
 