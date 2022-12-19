const express = require("express");
const db = require('../utils/db');

const router = express.Router();

// rota principal para acessar a pagina de perfil
router.all("/", (req, res) => {

	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 

	let id_oportunidade = req.query.id_oportunidade // pegando parametro da url
	let sql
    if (Object.keys(req.query).length > 0) {  // rodando o sql no banco de dados
        sql = `SELECT *, op.id_oportunidade, op.nome_oportunidade, op.id_endereco, op.image, op.titulo, op.resumo, op.id_especialidade, op.id_obra, op.data_inicio, op.data_fim, en.cidade, ob.nome_obra, es.nome_especialidade FROM oportunidades op LEFT JOIN obras ob ON op.id_obra = ob.id_obra LEFT JOIN especialidades es ON op.id_especialidade = es.id_especialidade LEFT JOIN enderecos en ON op.id_endereco = en.id_endereco;`; 
	} 	// sql para rodar no banco de dados

	// db.get(sql, [id_oportunidade], (err, row) => {
	// 	if (err) {
	// 		console.error(err.message);
	// 		res.send("Erro: " + err.message);
	// 		return;
	// 	}
		
	// });

	res.render("perfil/index"); // renderizando a view
});
	

// rota para obter informaçoes do usuario na pagina de perfil
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


module.exports = router;
