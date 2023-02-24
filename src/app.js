const conf = require('dotenv').config().parsed;
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const conn = require('./db')

const routes = require('./router');
const app = express();
const port = conf.HTTPPORT || 3000;


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

app.set('index', 'ejs');
app.set('index', path.join(__dirname, '/thing'));

app.get('/thing', async (req, res) => {
    
    const [rows] = await conn.query("SELECT * FROM users WHERE ustatus = 'on' ORDER BY uname");
    
    res.render('index', { dadosDaView: req.body });
});
app.listen(port, ()=>{
    console.log(`Servidor rodando em: http://localhost:${port}`);
})

