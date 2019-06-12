const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)
const app = express()

// Defining path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.use(express.static(path.join(__dirname, '../public'))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aryan'

    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Aryan'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This page provides help',
        title: 'Help',
        name: 'Aryan' 
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude,location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


    
    // res.send({
    //     forecast: 'cloudy',
    //     location: 'gwalior',
    //     address: req.query.search
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'help 404',
        name: 'andrew',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'general 404',
        name: 'andrew',
        title: '404'
    })
})
// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
