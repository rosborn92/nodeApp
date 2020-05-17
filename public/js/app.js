console.log("CLIENT SIDE APP JS LOADED");

const weatherForm = document.querySelector('form')
const searchEle = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')
const msg4 = document.querySelector('#msg4')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = searchEle.value
    msg1.textContent = "Loading..."
    fetch('/weather?location=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.location
                msg2.textContent = `${data.weather} degrees Fahrenheit`
                msg3.textContent = `It is ${data.forecast} and feels like  ${data.feelslike}`
                
            }

        })
    })
})