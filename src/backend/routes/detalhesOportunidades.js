const express = require("express");
const db = require('../utils/db');

const router = express.Router();

// rota principal para detalhes da oportunidade
router.all("/", (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	console.log(Object.keys(req.query).length)
    let sql
    if (Object.keys(req.query).length == 0) { 
        sql = "SELECT *, op.id_oportunidade, op.nome_oportunidade, op.id_endereco, op.image, op.titulo, op.resumo, op.id_especialidade, op.id_obra, op.data_inicio, op.data_fim, en.cidade, ob.nome_obra FROM oportunidades op LEFT JOIN obras ob ON op.id_obra = ob.id_obra LEFT JOIN especialidades es ON op.id_especialidade = es.id_especialidade LEFT JOIN enderecos en ON op.id_endereco = en.id_endereco"; 
		
		// empreiteiras_certificados B ON A.id_empreiteira = B.id_empreiteira";
    } 
	// else if (){
    //     sql = "SELECT * FROM empreiteiras A LEFT JOIN empreiteiras_certificados B ON A.id_empreiteira = B.id_empreiteira WHERE A.id_empreiteira = " + req.query.id;
    // }

	db.get(sql, [id], (err, row) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}});

	res.render("detalhesOportunidades/index");
});

router.get("/alterar", (req, res) => {
	let id = req.query["id"];

	if (!id) {
		res.send("Id faltando");
		return;
	}

	const sql = "SELECT id, nome, email FROM pessoa WHERE id=?";

	console.log(sql);

	db.get(sql, [id], (err, row) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("projetos/form", { funcionario: row });
	});
});

router.post("/alterar", (req, res) => {
	let msg;
	let id = req.body["id"];
	let nome = req.body["nome"];
	let email = req.body["email"];

	if (!id) {
		res.send("Id faltando");
		return;
	}

	if (!nome) {
		res.send("Nome faltando");
		return;
	}

	if (!email) {
		res.send("E-mail faltando");
		return;
	}

	const sql = "UPDATE pessoa SET nome=?, email=? WHERE id=?";

	console.log(sql);

	db.run(sql, [nome, email, id], (err, rows) => {
		if (err)
			msg = "Erro: " + err.message;
		else
			msg = "Usuário Alterado!";

		res.render("projetos/alterar", { mensagem: msg });
	});
});

router.all("/listar", (req, res) => {
	let pessoas;
	let ordenar = req.query["ordenar"];
	let params;

	if (!ordenar) {
		ordenar = "";
		params = [];
	} else {
		ordenar = "ORDER BY ? COLLATE NOCASE ASC";
		params = [ordenar];
	}

	const sql = "SELECT id, nome, email FROM pessoa " + ordenar;
	console.log(sql);

	db.all(sql, params, (err, rows) => {
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}

		res.render("projetos/listar", { model: rows });
	});
});

router.get("/remover", (req, res) => {
	let msg;
	let id = req.query["id"];

	const sql = "DELETE FROM pessoa WHERE id=?";
	console.log(sql);

	db.all(sql, [id], (err, rows) => {
		if (err)
			msg = err.message;
		else
			msg = "Usuário Removido!";

		res.render("funcionarios/remover", { mensagem: msg });
	});
});

router.all("/inserir", (req, res) => {
	const id = req.query["id"];
	const nome = req.query["nome"];
	const email = req.query["email"];

	if (!nome) {
		res.send("Nome faltando");
		return;
	}

	if (!email) {
		res.send("E-mail faltando");
		return;
	}

	const sql = "INSERT INTO pessoa (nome, email) VALUES (?, ?)";
	console.log(sql);

	db.run(sql, [nome, email], (err, rows) => {
		if (err) {
			res.send("Erro: " + err.message);
			console.error(err.message);
			return;
		}

		res.render("funcionarios/inserir", { msg: mensagem });
	});
});

module.exports = router;
