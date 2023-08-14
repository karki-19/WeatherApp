const showForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const img  = document.querySelector('.time')
const icon = document.querySelector('.icon img')


const updateUI = (data)=>{
     console.log(data)
    // const citydata = data.citydata
    // const weatherdata = data.weatherdata
    // we will destructure the above code

    const {citydata,weatherdata} = data

    details.innerHTML = `
    <div class="text-muted text-uppercase text-center details">
    <h5 class="my-3">${citydata.EnglishName}</h5>
    <div class="my-3">${weatherdata.WeatherText}</div>
    <div class="display-4 my-4">
    <span>${weatherdata.Temperature.Metric.Value}</span>
    <span>&deg;C</span>`

    if(card.classList.contains('d-none'))
      card.classList.remove('d-none');

    // update the image here
    // if(weatherdata.IsDayTime){
    //   img.setAttribute('src','img/day.svg')
    // }
    // else{
    //     img.setAttribute('src','img/night.svg')
    // } 
    // will use the ternary operator this time

    let weatherData = weatherdata.IsDayTime ? 'img/day.svg':'img/night.svg'
    img.setAttribute('src',weatherData)

    const abc = `img/icons/${weatherdata.WeatherIcon}.svg`
    icon.setAttribute('src',abc)
}

const cityUpdate = async city=>{
    const citydata = await getData(city)
    // console.log(city.Key);
    const weatherdata = await weatherUpdate(citydata.Key)

    return {
        citydata:citydata,
        weatherdata :weatherdata
    }

}

showForm.addEventListener('submit', e =>{
    e.preventDefault();
    const city = showForm.city.value.trim();
    showForm.reset();
    cityUpdate(city)
     .then(data => updateUI(data))
     .catch(err => console.log(err)) 
    
    localStorage.setItem('city',city)

})

let check =localStorage.getItem('city')

if(check){
    cityUpdate(check)
    .then(data => updateUI(data))
    .catch(err=> console.log(err))
}