const conf = require('dotenv').config().parsed;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./router');
const app = express();
const port = conf.HTTPPORT || 3000;


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

app.listen(port, ()=>{
    console.log(`Servidor rodando em: http://localhost:${port}`);
})

