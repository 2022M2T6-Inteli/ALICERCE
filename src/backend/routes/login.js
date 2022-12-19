const express = require("express");
const db = require('../utils/db');

const router = express.Router();

// rota principal para acessar a pagina de login
router.all("/", (req, res) => {
	res.render("login/index"); // renderizando a view
});

// rota para logar
router.all("/logar", (req, res) => {
	let pessoas;
	let ordenar = req.query["ordenar"]; // pegando parametro da url
	let params;

	if (!ordenar) {
		ordenar = "";
		params = [];
	} else {
		ordenar = "ORDER BY ? COLLATE NOCASE ASC";
		params = [ordenar];
	}

		// sql para rodar no banco de dados
	const sql = "SELECT id, nome, email FROM pessoa " + ordenar;
	console.log(sql);
 
	db.all(sql, params, (err, rows) => { // rodando o sql no banco de dados
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("funcionarios/listar", { model: rows }); // renderizando a view e passando os dados
	});
});

// exportando o objeto router
module.exports = router;
