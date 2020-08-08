const submitBtn = document.querySelector('input[type="submit"]')
const resolvedUrls = []
const allUrlsWrapper = document.querySelector('ul.urls')

async function shortenUrl(longUrl) {
    const obj = { longUrl }
    const request = await fetch('/api/url', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })

    if (request.status == 401) {
        
        const errordiv = document.querySelector('p.error')
        if(errordiv.classList.contains('show')) {
            return
        } else {
            errordiv.classList.add('show')

            setTimeout(() => {
                errordiv.classList.remove('show')
            }, 2000);
        }
        return console.log('ERROR')
    }
    const result = await request.json()



    resolvedUrls.push(result)


    outputResult(result)

}

function outputResult(result) {
    const ele = document.createElement('li')
    ele.innerHTML = `
        <span class="long-url">${result.longUrl}</span>
        <span class="short-url">${result.shortUrl}</span>
        <span class="copy">Copy</span>
        `

    const copyBtn = ele.querySelector('.copy')
    copyBtn.addEventListener('click', () => {
        const selection = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(ele.querySelector('.short-url'))
        selection.removeAllRanges()
        selection.addRange(range)

        try {
            document.execCommand('copy')
            selection.removeAllRanges()

            const originalText = copyBtn.textContent
            copyBtn.textContent = 'Copied!'

            setTimeout(() => {
                copyBtn.textContent = originalText
            }, 1200);
        } catch (err) {
            console.log(err)
        }
    })
    if(!allUrlsWrapper.classList.contains('has-sub')) {
        allUrlsWrapper.classList.add('has-sub')
    }
    allUrlsWrapper.prepend(ele)
}

submitBtn.addEventListener('click', e => {
    e.preventDefault()
    const UrlToBeShortened = document.querySelector('input.urlShort').value
    shortenUrl(UrlToBeShortened)
})