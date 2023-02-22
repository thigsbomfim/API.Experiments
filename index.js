const conf = require('dotenv').config().parsed;
const express = require('express');
const mysql = require('mysql2');


const app = express();
const port = conf.HTTPPORT;


const conn = mysql.createPool({
    host: conf.HOSTNAME,
    database: conf.DATABASE,
    user: conf.USERNAME,
    password: conf.PASSWORD,
    port: conf.HOSTPORT
}).promise();

// Objeto que será executado quando houver uma requisição.
const thing = {
    getAll : async (req, res) => {
        try { 
            // Query que obtém os dados do banco de dados
            // prepare, sanitização
            
            const sql = "SELECT *, DATE_FORMAT(tdate, '%d/%m/%Y às %H:%i') AS tdatebr FROM things WHERE tstatus = 'on' ORDER BY tdate DESC";
            const [atributos] = await conn.query(sql)
            
            // views dos dados
            res.json({ data: atributos})
        
        }


        catch (error) {
            res.json({ status: "error", message: error })
        }

    },

    getOne: async (req, res) => {
        const id = req.params.id;
        try { 
            // Query que obtém os dados do banco de dados
            // prepare, sanitização
            
            const sql = "SELECT *, DATE_FORMAT(tdate, '%d/%m/%Y às %H:%i') AS tdatebr FROM things WHERE tid= ? AND tstatus = 'on' ORDER BY tdate DESC";
            const [atributos] = await conn.query(sql, [id])

            // views dos dados
            res.json({ data: atributos})
        
        }
            // Exibe mensagem de erro
        catch (error) {
            res.json({ status: "error", message: error })
        }
    },

    post: async (req, res) => {
        try { 

            // Extrai os campos do req.body
            const {tuser, tname, tphoto, tdescription, tlocation, toptions} = req.body;
            
            // Query
            const sql = "INSERT INTO things( tuser, tname, tphoto, tdescription, tlocation, toptions ) VALUES ( ?, ?, ?, ?, ?, ? );";
            const [atributos] = await conn.query(sql, [tuser, tname, tphoto, tdescription, tlocation, toptions])
            
            // Views dos dados
            res.json({ coisa: atributos.insertId, status: "sucess" })
        
        }
        catch (error) {
            res.json({ status: "error", message: error })
        }
    },

    put: async (req, res) => {
        const id = req.params.id;
        try { 
            // Extrai os campos do req.body.
            const {user, name, photo, description, location, options} = req.body;
            
            // Query
            const sql = "UPDATE things SET tuser = ?, tname = ?, tphoto = ?, tdescription = ?, tlocation = ?, toptions = ? WHERE tid = ?";
            const [atributos] = await conn.query(sql,[user, name, photo, description, location, options, id])
            
            // Views dos dados
            res.json({ coisa: atributos.insertId, status: "sucess" })
        }
        catch (error) {
            res.json({ status: "error", message: error })
        }
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const STATUS_OFF = 'off'
        try { 
            // Extrai os campos do req.body.
            const { status } = req.body;

            // Atualiza o status da coisa com o ID fornecido.
            const sql = "UPDATE things SET tstatus = ? WHERE tid = ?";
            const [atributos] = await conn.query(sql,[status || STATUS_OFF, id])
            
            // Retorna a resposta com os dados atualizados.
            res.json({ coisa: id, status: 'success', rowsAffected: result.affectedRows });
        }
        catch (error) {
            console.error(`Erro ao atualizar a coisa ${id}: ${error.message}`);
            res.status(500).json({ status: 'error', message: 'Erro ao atualizar a coisa.' });
        }
    }
}

const user = {
    getOne: async (req, res) => { },
    post: async (req, res) => { },
    put: async (req, res) => { },
    delete: async (req, res) => { }
}


// Recebe os dados do body HTTP e valida em JSON.
const bodyParser = require('body-parser').json();



/*
// Rota para GET -> getAll() -> Recebe, por exemplo, todos os registros.
app.get('/', controller.resJson)

// Rota para GET -> get(id) -> Recebe apenas o registro identificado.
app.get('/:id', controller.resJson);

// Rota para POST -> post() -> Cria um registro -> bodyParser (no hook) é usado para garantir a chegada de um JSON.Modifica apenas o registro especifico.
app.post('/', bodyParser, controller.resJson)

// Rota para PUT -> put() -> altera todos os registros -> bodyParser (no hook) é usado para garantir a chegada de um JSON.Modifica apenas o registro especifico.
app.put('/:id', bodyParser, controller.resJson)

// Rota para DELETE -> delete(id) -> Deleta apenas o registro identificado.
app.delete('/:id', controller.resJson);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
*/



// Objeto que será executado quando houver uma requisição


// Rota para coisas/thing
app.get('/', thing.getAll)
app.get('/:id', thing.getOne);
app.post('/', bodyParser, thing.post)
app.put('/:id', bodyParser, thing.put);
app.delete('/:id', thing.delete);


// Rotas para o usuário
app.get('/user/:id', user.getOne);
app.put('/user/:id', user.put);
app.delete('/user/:id', user.delete);





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})