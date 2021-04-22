const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const EJS = require('ejs');

const app = express();



// importing Routes
const indexRoutes = require('./routes/index');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', EJS.renderFile);

// middlewares express (funcion que se ejecuta antes de llegar a la ruta)
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: true
}));

// Routes
app.use('/', indexRoutes);

// Connecting to db
mongoose.connect('mongodb://localhost/Empleado', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => {
        // Starting the server
        app.listen(app.get('port'), () => {
            console.log(`Server on Port ${app.get('port')}`)
        }),

        console.log('db connected')
    })
    .catch(err => console.log(err))