document.querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault()
  const city = document.querySelector('#searchInput').value
  if(city !== ''){
    hideInfo()
    showWarning('Carregando as informações...')    
    
    const apikey = '<OPENWEATHER_API_KEY>'
    const units = 'metric'
    const lang = 'pt_br'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=${apikey}&units=${units}&lang=${lang}`

    const result = await fetch(url)
    const jsonResult = await result.json()
    
    if(jsonResult.cod == '200'){
      //console.log(jsonResult)
      showInfo({
        name: jsonResult.name,
        country: jsonResult.sys.country,
        temp: jsonResult.main.temp,
        temp_icon: jsonResult.weather[0].icon,
        windDirection: jsonResult.wind.deg,
        windSpeed: jsonResult.wind.speed
      })
    } else {
      hideInfo()
      showWarning('Cidade não encontrada. Tente novamente!')
    }
  }  
})

function showWarning(message){
  document.querySelector('.aviso').innerHTML = message
}

function showInfo(obj){
  showWarning('')
  document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`
  document.querySelector('.tempInfo').innerHTML = `${obj.temp} <sup>ºC</sup>`
  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${obj.temp_icon}@2x.png`)
  document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`
  document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windDirection - 90}deg)`
  document.querySelector('.resultado').style.display = 'block'
}

function hideInfo(){
  document.querySelector('.resultado').style.display = 'none'
}
