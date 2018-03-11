const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
// starting a express application
var app = express();

//register partials for templating comman tempolates eg header footer:
hbs.registerPartials(__dirname + "/views/partials");
// to regster event helpers:
hbs.registerHelper('getCurrentDate', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
//We have a html page which needs to be served in express app without having to manually configure it
//which can be done using 'express middleware'
//configues how express work
//app.use is use to add middleware
/////////app.use(express.static(__dirname + '/public'));// moved below
// the above middleware is before the execution of below middle wares, there fore the help.html will still be available even if the maintenance is to be called by second below middleware,
//to solve this, move the above below

//registering a middle ware, which is executed on each request
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} : ${req.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to write to file!');
        }
    });
    //without next the control will not go further
    // if (true) {
         next();
    // } else {
        
    // }

});
// uncomment below to run maintenance page
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         pageTitle:"Maintenance Page",
//         pageContent:"This site is under maintenence"
//     });
// });
app.use(express.static(__dirname + '/public'));
// register route handler
// app.get('/', (req, res) => {
//     // res.send('hello world');
//     res.send({
//         name: 'Deep',
//         likes: [
//             'a',
//             'b'
//         ]
//     });
// });
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        pageContent: 'Welcome'
    });
});
app.get('/about', (req, res) => {
    // res.send('<h1>About Page</h1>');
    res.render("about.hbs", {
        pageTitle: 'About Page'
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad Request'
    });
});
app.listen(3030, () => {
    console.log('Server is up at port 3000');
});
