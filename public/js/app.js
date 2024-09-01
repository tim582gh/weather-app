// const { response } = require('express')

console.log('Client side javascrip is loaded')

// Fecth API is a browser based API, not accessible in Node.js
// It can only be used in the client side.
// Fecth API is asynchronous

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()  // Prevent from default behavior, which is refresh the page.
    const location = searchElement.value

    const fetchUrl = 'http://localhost:3000/weather?search=' + searchElement.value

    fetch(fetchUrl).then((response)=>{
        response.json().then((data)=> {
            if (!data.error) {
                console.log(data.address)
                console.log(data.forcast)
                console.log(data.temperature)
                messageOne.textContent = 'The current weather of ' + data.address + ' is ' + data.forcast
                messageTwo.textContent = data.temperature
            } else {
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ""
            }
        })
    })  // */e
})
