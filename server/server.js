const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

//=========================
//          DATABASE

const databaseConfig = require('./database/DB');
const routerComputer = require('./expressRoutes/routerComputer');
mongoose.Promise = global.Promise;
mongoose.connect(databaseConfig.DB).then(
    ()=>{ console.log('database is connected'); },
    err => { console.log('Can not connect to the database' + err) }
);

//=========================

const app = express();
app.use(morgan('combine'));
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 3000);

app.get('/', (request,response) => {
    response.send({message:'hello world'});
})