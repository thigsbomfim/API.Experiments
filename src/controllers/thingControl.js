
const conn = require('../db');

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

    // quando for fazer o post, coloque o nome da tabela como você declarou a variavel aqui
    post: async (req, res) => {
        try { 

            // Extrai os campos do req.body
            const {user, name, photo, description, location, options} = req.body;
            
            // Query
            const sql = "INSERT INTO things( tuser, tname, tphoto, tdescription, tlocation, toptions ) VALUES ( ?, ?, ?, ?, ?, ? );";
            const [atributos] = await conn.query(sql, [user, name, photo, description, location, options])
            
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
            res.json({ coisa: id, status: 'success'});
        }
        catch (error) {
            console.error(`Erro ao atualizar a coisa ${id}: ${error.message}`);
            res.status(500).json({ status: 'error', message: 'Erro ao atualizar a coisa.' });
        }
    }
}

module.exports = thing;