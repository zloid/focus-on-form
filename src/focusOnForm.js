'use strict'

const localStore = {
    isFocusHit: false,
}

const getMainInput = document.getElementById('main-input')
const getMainTextarea = document.getElementById('main-textarea')
const getMainSubmitButton = document.getElementById('main-submit')

async function loadScript(url) {
    try {
        const response = await fetch(url)
        console.log(response)
        const urlToScript = await response.url
        console.log(urlToScript)

        let scriptToBody = document.createElement('script')
        scriptToBody.src = urlToScript
        document.body.appendChild(scriptToBody)
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

async function hitSubmit(fullName, message) {
    if (typeof Email !== 'undefined') {
        await Email.send({})

        console.log('await resolve, submit hit, do some...')
        alert(fullName + '\n\n' + message)
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
    hitSubmit(getMainInput.value, getMainTextarea.value)
})
