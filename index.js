

const express = require('express');
const app = express();

const conf = require('dotenv').config().parsed;

const port = conf.HTTPPORT;

// Objeto que será executado quando houver uma requisição.
const controller = {
    resJson: async (req, res) => {
        // Lista com alguns atributos úteis da requisição (req) HTTP
        data = {
            "method": req.method,
            "url": req.url,
            "baseURL": req.baseURL,
            "query": res.query,
            "params": req.params,
            "body": req.body,
            "headers": req.headers
        }

        // Envia JSON com os dados acima para o cliente, como texto plano.
        // res.send(data);

        // Envia JSON com os dados acima para o cliente, como texto plano JSON.
        res.json(data);

    }
}

// Recebe os dados do body HTTP e valida em JSON.
const bodyParser = require('body-parser').json();

// Rota para GET -> getAll() -> Recebe, por exemplo, todos os registros.
app.get('/', controller.resJson)

// Rota para GET -> get(id) -> Recebe apenas o registro identificado.
// app.get('/:id', controller.resJson);

// Rota para POST -> post() -> Cria um registro -> bodyParser é usado para garantir a chegada de um JSON. Cria um registro 
app.post('/', bodyParser, controller.resJson)

// Rota para PUT -> put() -> Modifica apenas o registro especifico
app.put('/:id', bodyParser, controller.resJson)

// Rota para DELETE -> delete(id) -> Deleta apenas o registro identificado.
app.delete('/:id', controller.resJson);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

