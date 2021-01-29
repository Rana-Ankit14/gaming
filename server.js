const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const routes = require('./routes/indexRoute')
const path = require('path');
//Load Config
dotenv.config({path: "./config/config.env"})


// connecting Database
connectDB();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//Serving static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}


const PORT = process.env.PORT || 5000;


// use routes
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
})
