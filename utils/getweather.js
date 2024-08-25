const requestPkg = require('request')

const getweather = (city2, callback)=>{

    const APIkey = '8f8eeb2c3914ae43f833bc2d7bbf76ba'
    const endpoint = 'http://api.openweathermap.org/'
    const APIver = 'data/2.5/'
    const units = 'imperial' //options: standard(default), metric, imperial.
    const location = city2 + ',us'   // const location = city + ',uk'
    const urlWeather = endpoint + APIver + 'weather?q=' + location + '&units=' + units + '&APPID=' + APIkey    

    requestPkg({url: urlWeather, json: true}, (error, responseObj)=> {
        // console.log(responseObj.body.main)
        // console.log(responseObj.body)
        if (error) {
            // console.log('Unable to connect to Weather service!')
            const errorReturn = 'Unable to connect to Weather service!'
            const dataReturn = []
            callback(errorReturn, dataReturn)
        } else if (responseObj.body.message) {
            // console.log(responseObj.body.message)
            const errorReturn = responseObj.body.message
            const dataReturn = []
            callback(errorReturn, dataReturn)
        } else {
            // console.log(responseObj.body.name)
            // notesPkg.addNote('weather.json', responseObj.body.name, responseObj.body)
            // console.log(responseObj.body)
            const errorReturn = []
            const dataReturn = responseObj.body //entire body, including main
            callback(errorReturn, dataReturn)
        }
    })
}

module.exports = getweather