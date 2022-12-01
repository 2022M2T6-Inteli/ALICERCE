const express = require("express")
const db = require('../../data/data_alicerce.db')
const router = express.Router()

//inserir usuario na base de dados

app.post('/empreiteiras', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO empreiteiras (CNPJ, razao_social, nome_fantasia, quantidade_funcionarios, avaliacao, email, telefone, trabalhou_com_mrv, status_documentacao, id_endereco) VALUES ('${req.query.cnpj}', '${req.body.razao_social}', '${req.body.nome_fantasia}', '${req.body.quantidade_funcionarios}', '${req.body.avaliacao}', '${req.body.email}', '${req.body.trabalhou_com_mrv}', '${req.body.status_documentacao}', '${req.body.id_endereco}')`;

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