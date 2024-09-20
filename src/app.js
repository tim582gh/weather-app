const path = require('path')
const express = require('express')
const hbs = require('hbs')  // use hbs to create partial template for all pages
// hbs needs another folder to keep partial templates
const webUrl = 'https://weather-app-ten-omega-23.vercel.app'


// to make the following modules work =====
// need to: npm i request   ===============
const notesPkg = require('../utils/notes')
const geocode = require('../utils/geocode')
const getweather = require('../utils/getweather')
// ========================================


const app = express()   // using rexpress to run a server


// This is to fix the "Cross-Origin Request Blocked error" encountered on Vercel
// npm install cors, first ======================
// const express = require('express');      //repeated
const cors = require('cors');
// const app = express();       //repeated

// Use CORS to allow cross-origin requests
// app.use(cors());

// If you want to restrict it to specific origins (such as only allowing requests from your live website), you can configure CORS with more options
app.use(cors({
    origin: webUrl  // Replace with your website's URL
  }));
  
// ==============================================


// ========== Define paths for Express config ==========
// publicPathDir is the folder where the index.html is
const publicPathDir = path.join(__dirname, '../public')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// ===== Setup handlebars engine and views location =====
app.set('view engine','hbs')//setup express to use 'hbs' engine
// Templates are saved in the "views" folder (default)
// Customize/Define path for hbs (handlbar rendering), to replace the defaut "views" folder
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// ========== Setup static directory to serve ==========
app.use(express.static(publicPathDir))



// ========== Using handlebars to apply customized items to web pages ==========
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App', 
        name: 'Sophie Hannah'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About the App', 
        name: 'Sophie and Hannah Hsiao'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help page', 
        name: 'Sophie Hannah'
    })
})

// ========== app.com ==========
// req = request, res = request, static contents
app.get('', (req,res)=>{
    res.send('<h1>Weather</h1>')
})

// app.com/weather, send query to search a location
// This is a JSON HTTP endpoint (section 8, #55 )
app.get('/Weather', (req,res)=>{
//    res.send(['<h1>Weather page<h1>', {location: 'San Jose', temperature: 69}])
    if (!req.query.search) {
        return res.send({
            errorMsg: 'you must provide an address'
        })
    }

    // const weatherResult = {}
    const city = req.query.search

    geocode(city, (error, {longitude, latitude, coord, body}={})=>{//object input destructured, if destructure fails, empty object {} will be default
        debugger
        if (error.length!==0) { // Geolocation API didn't find the address
            // return console.log('Location is not found!')
            return res.send({
                // errorMsg: 'Location is not found!'
                error
            })
        }
        
        // notesPkg.addNote('geo.json', body)
    
        getweather(body.features[0].properties.name, (error, APIresponseObj)=>{
            if (error.length!==0) {
                // return console.log(error)
                return res.send({
                    // errorMsg: error
                    error
                })
            }

            // notesPkg.addNote('weather.json', main)

            res.send({  // print to browser for debugging
                query: req.query.search, 
                address: APIresponseObj.name,
                temperature: APIresponseObj.main.temp, 
                forcast: APIresponseObj.weather[0].description, 
                // WeatherReturn: APIresponseObj,
                // GeoReturn: body
            })  //*/
        })
    
    })  // */

/*    res.send({  // print to browser for debugging
        address: req.query.search, 
        forcast: 'Snowing'
    })  //*/
})

// app.com/products, send query to search a product, an example
app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})


// setup 404 page, must be the last after all routes are set up
app.get('/help/*', (req, res)=>{
    // res.send('Help article not found')
    res.render('error', {
        errorText: 'Help article not found.',
        title: 'The 404 page', 
        name: 'Sophie'
    })
})

// setup 404 page, must be the last after all routes are set up
app.get('*', (req, res)=>{
    // res.send('404 page')
    res.render('error', {
        errorText: 'Page not found.',
        title: 'The 404 page', 
        name: 'Hannah'
    })
})

// Start up the server
app.listen(3000, ()=>{
    console.log('Server is up on port')
})    //common development port