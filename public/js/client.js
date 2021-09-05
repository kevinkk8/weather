
const weatherform = document.querySelector('form')
const search = document.querySelector('#form1')
const messageOne = document.querySelector('#mess1')
const messageTy = document.querySelector('#mess2')

weatherform.addEventListener('submit' , (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = "Searching..."
    messageTy.textContent = ""

    fetch('http://localhost:3000/weather?address='+location).then( (response) => {
        response.json().then( (data) => {
            if(data.error){
                messageOne.textContent = data.error
                messageTy.textContent = ""
            }else{
                messageOne.textContent  = data.forecast
                messageTy.textContent  = data.temp
            }
        })
    })

})