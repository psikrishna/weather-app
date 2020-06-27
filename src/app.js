const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const log = console.log;

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

// set-up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

// set-up static directory
app.use(express.static(publicDirectoryPath));

// root page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sai Krishna',
    })
});

// about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sai Krishna',
        githubLink: 'github.com/psikrishna',
    })
});

// help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sai Krishna',
        descriptionTitle: 'How to use this application?',
        description: "Just search for the location you want to know the weather details of, that's it. It's that simple!",
    })
});

// weather page 
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.render('404', {
            title: 'OOPS',
            name: 'Sai Krishna',
            errorMessage: 'Please enter an address to look for the weather.',
            messageText: 'ERROR',
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            // return res.render('404', {
            //     title: 'OOPS',
            //     name: 'Sai Krishna',
            //     errorMessage: 'Please enter a valid address to look for the weather.',
            //     messageText: 'ERROR',
            // });
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.render('404', {
                    title: 'OOPS',
                    name: 'Sai Krishna',
                    errorMessage: 'Please enter a valid address to look for the weather.',
                    messageText: 'ERROR',
                })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address,
            });
        })
    });
});

// error 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Sai Krishna',
        errorMessage: 'Page not found.',
        messageText: '404',
    })
});

// for the dev
app.listen(port, () => {
    log('server up on port ' + port)
});