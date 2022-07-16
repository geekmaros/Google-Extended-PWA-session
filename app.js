const APPID = "b6ef7c2fc764e43b5f9ec0a4a02adf59"
const URLEndPoint = "https://api.openweathermap.org/data/2.5/weather"

const searchButton = document.getElementById('search')

var loading = false


searchButton.addEventListener('click', async () => {
    let location = document.getElementById('location')
    let temp = document.getElementById('temp')
    let country = document.getElementById('country')

    loading = true

    const city = document.getElementById('city').value
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APPID}`)
    loading = false

    location.innerText = data.name
    temp.innerText = Math.round(data.main.temp)
    country.innerHTML = data.sys.country
})
console.log(loading)
if(loading){
    document.getElementById('card').display = 'none'
}



