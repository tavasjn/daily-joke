// Index for the server

require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
// const bodyParser = require('body-parser');




// these are the imports for my controllers //



// connect the server using heroku // 
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const app = express();


app.use(express.json());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Connect to the data base //
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('DB Connected')
});

// Cookie Session Below //
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));


app.use( express.static( `${__dirname}/../build` ) );

const port = SERVER_PORT;
app.listen(port, () => console.log(`Magic on Port: ${port}`));