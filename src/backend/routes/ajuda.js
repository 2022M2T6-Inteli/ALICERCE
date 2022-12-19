const express = require("express");
const db = require('../utils/db');

// criando um objeto router que instancia a classe Router do express
const router = express.Router();

// rota principal de ajuda
router.all("/", (req, res) => {
	res.render("funcionarios/index"); // renderizando a view
});

// rota para a página de inserção de funcionários
router.get("/alterar", (req, res) => {
	let id = req.query["id"]; // pegando parametro da url

	if (!id) {
		res.send("Id faltando");
		return;
	}
	// sql para rodar no banco de dados
	const sql = "SELECT id, nome, email FROM pessoa WHERE id=?";

	console.log(sql);

	db.get(sql, [id], (err, row) => { // rodando o sql no banco de dados
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}
		res.render("funcionarios/form", { funcionario: row }); // renderizando a view e passando os dados
	});
});

// exportando o objeto router
module.exports = router;
