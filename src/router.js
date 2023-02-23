const express = require('express');
const router = express.Router();

const thing = require('./controllers/thingControl');
const user = require('./controllers/userControl');

router.get('/',(req, res)=>{
    res.json({
        status: "error",
        message: "Bad request"
    })
})

// Rota para coisas/thing
router.get('/thing', thing.getAll)
router.get('/thing/:id', thing.getOne);
router.post('/thing', thing.post)
router.put('/thing/:id', thing.put);
router.delete('/thing/:id', thing.delete);


// Rotas para o usuário
router.get('/user/:id', user.getOne);
router.get('/user', user.getAll);
router.post('/user', user.post);
router.put('/user/:id', user.put);
router.delete('/user/:id', user.delete);


module.exports = router