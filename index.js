const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const config = require('./startup/config');
const winston = require('winston');

var expressSession = require('express-session')

const err = require('./middleware/errors');

const mainRoutes = require('./routes/main-routes');

const app = express();

require('./startup/logging')();

app.set('trust proxy', 1)

app.use(expressSession({
    secret: 'x159951A!',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 }
}))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(mainRoutes.routes);
app.use(err);


app.listen(config.port, () => winston.info('App is listening on url http://localhost:' + config.port));