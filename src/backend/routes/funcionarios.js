const express = require("express")
const db = require('../../data/data_alicerce.db')
const router = express.Router()

//inserir usuario na base de dados

app.post('/empreiteiras', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO empreiteiras (CNPJ, email, telefone, ) VALUES ('${req.body.cnpj}', '${req.body.email}', '${req.body.celular}')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})