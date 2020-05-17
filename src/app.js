const path = require('path')
const express = require('express')
const hbs = require('hbs') 
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup HandleBars engine and Views Location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath)) 

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App", 
        name: 'Roberto'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page", 
        name: 'Roberto'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page", 
        message: 'Please call support for help #6969',
        name: "Roberto"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: "You must provide a location."
        })
    } else {
        const location = req.query.location
        geoCode(location, (err, { latitude, longitude, location } = {}) => {
            if (err) {
                return res.send({ error });
            }
            else {
                forecast(latitude, longitude, (error, { location, weatherDesc, currentTemp, feelslike }) => {
                    if (error) {
                        return res.send({ error })
                    }
                    else {                
                        res.send({
                            weather: currentTemp,
                            forecast: weatherDesc,
                            location: location,
                            feelslike: feelslike
                        })
                    }
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        errMsg: "Help Article Not Found",
        name: "Rob Z"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errMsg: "Page Not Found",
        name: "Robby Z"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');    
})