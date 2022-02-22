// node.js server

let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');

const studentRoute = require('../backend/routes/student.routes')

//connecting the db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db).then(()=> {
    console.log('DB connected')
},
    error =>{
        console.log('could not connect to db : ' + error)
    }
)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(cors());
app.use('/students',studentRoute)

// port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('connect to port ' + port)
})

// 404 error
app.use((req,res,next) => {
    res.status(404).send('Error 404 lol')
});

app.use(function (err,req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode  = 500;
    res.status(err.statusCode).send(err.message)
});