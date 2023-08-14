const key = 'cv0YIPBQJB764CnqO4vnLm3YdQPIWTtg'

const weatherUpdate = async id =>{
    const url = 'http://dataservice.accuweather.com/currentconditions/v1/'
    const base = `${id}?apikey=${key}`

    const response = await fetch(url+base)
    const data = await response.json();
   
    return data[0]

}

// we are getting the data for the city 
const getData = async city => {
const url = 'http://dataservice.accuweather.com/locations/v1/cities/search'
const base =`?apikey=${key}&q=${city}`

const response = await fetch(url+base)
const data = await response.json();

return data[0]

}
