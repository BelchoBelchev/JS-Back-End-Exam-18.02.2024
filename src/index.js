const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = 3000;
const mongoose = require('mongoose');
const { auth } = require('./middlewares/authMiddleware');

const routes = require('./routes');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(auth);

app.use(routes);

// Change DB name
mongoose.connect('mongodb://localhost:27017/earth-treasure-vaul')
    .then(() => {
        console.log('DB Connected');
        app.listen(PORT, () => {
            console.log(`Server is listening on ${PORT}`);
        });
    });