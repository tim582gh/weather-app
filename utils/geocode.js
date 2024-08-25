const requestPkg = require('request')

// Make API call for Forward Geocoding
// https://api.mapbox.com/search/geocode/v6/forward?q={search_text}
// https://api.mapbox.com/search/geocode/v6/forward?q=London&country=GB&access_token=pk.eyJ1Ijoic2hvcDY3ZmYiLCJhIjoiY2x4ZnlsanA0MHkzejJscHVwMDJudjUyOSJ9.n5GxghRwBmtMFMXVhbOFxA
const mapboxToken = 'pk.eyJ1Ijoic2hvcDY3ZmYiLCJhIjoiY2x4ZnlsanA0MHkzejJscHVwMDJudjUyOSJ9.n5GxghRwBmtMFMXVhbOFxA'
// const city = 'London'
// const country = 'GB'    //ISO3166 alpha 2, GB for UK, US for US
const city = encodeURIComponent('Santa Clara')
const country = encodeURIComponent('US')    //ISO3166 alpha 2, GB for UK, US for US
const urlMapbox = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + city + '&country=' + country + '&access_token=' + mapboxToken
// const urlMapbox = '// https://api.mapbox.com/search/geocode/v6/forward?q=London&country=GB&access_token=pk.eyJ1Ijoic2hvcDY3ZmYiLCJhIjoiY2x4ZnlsanA0MHkzejJscHVwMDJudjUyOSJ9.n5GxghRwBmtMFMXVhbOFxA'
// console.log(urlMapbox)


const geocode = (city2, callback) => {
    const urlMapbox = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(city2) + '&country=' + country + '&access_token=' + mapboxToken
    requestPkg({url: urlMapbox, json: true}, (error, responseObj)=> {
        // console.log(responseObj.body.features[0])
        // console.log(responseObj.body.features[0].properties.coordinates)
        if (error) {
            const errorReturn = 'Unable to connect to Geolocation service!'
            const dataReturn = []
            callback(errorReturn, dataReturn)
        } else if (responseObj.body.features.length === 0) {
            const errorReturn = 'Location not found'
            const dataReturn = responseObj.body
            callback(errorReturn, dataReturn)
        } else {
            const lat = responseObj.body.features[0].properties.coordinates.latitude
            const lon = responseObj.body.features[0].properties.coordinates.longitude
//            notesPkg.addNote('geo.json', responseObj.body.features[0].properties.name, responseObj.body.features[0].properties.coordinates)
            console.log(lon, lat)
            const errorReturn = []
            const dataReturn = {
                longitude: lon, 
                latitude: lat, 
                body: responseObj.body
            }
            callback(errorReturn, dataReturn)
        }
        
    })
}

module.exports = geocode