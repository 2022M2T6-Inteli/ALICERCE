const express = require("express");
const db = require('../utils/db');

const router = express.Router();

// rota principal para detalhes da oportunidade
router.all("/", (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 

	let id_oportunidade = req.query.id_oportunidade // pegando parametro da url
	let sql
    if (Object.keys(req.query).length > 0) { 
        sql = `SELECT *, op.id_oportunidade, op.nome_oportunidade, op.id_endereco, op.image, op.titulo, op.resumo, op.id_especialidade, op.id_obra, op.data_inicio, op.data_fim, en.cidade, ob.nome_obra, es.nome_especialidade FROM oportunidades op LEFT JOIN obras ob ON op.id_obra = ob.id_obra LEFT JOIN especialidades es ON op.id_especialidade = es.id_especialidade LEFT JOIN enderecos en ON op.id_endereco = en.id_endereco WHERE op.id_oportunidade = ?;`; 
	} 	// sql para rodar no banco de dados

	db.get(sql, [id_oportunidade], (err, row) => { // rodando o sql no banco de dados
		if (err) {
			console.error(err.message);
			res.send("Erro: " + err.message);
			return;
		}
		res.render("detalhesOportunidades/index", {response: row}); // renderizando a view e passando os dados
	});

	
});

// // rota para acessar a pagina de pesquisa
// router.all("/", (req, res) => {
// 	res.statusCode = 200;
// 	res.setHeader('Access-Control-Allow-Origin', '*'); 

//     let sql
//     if (Object.keys(req.query).length == 0 && Object.keys(req.body).length == 0) { 
//         sql = "SELECT *, op.id_oportunidade, op.nome_oportunidade, op.id_endereco, op.image, op.titulo, op.resumo, op.id_especialidade, op.id_obra, op.data_inicio, op.data_fim, en.cidade, ob.nome_obra, es.nome_especialidade FROM oportunidades op LEFT JOIN obras ob ON op.id_obra = ob.id_obra LEFT JOIN especialidades es ON op.id_especialidade = es.id_especialidade LEFT JOIN enderecos en ON op.id_endereco = en.id_endereco"; 
//     }  else if (Object.keys(req.query).length == 0 && req.body.especialidadeInput == "" && req.body.localidadeInput == "") {
// 		sql = `SELECT *, op.id_oportunidade, op.nome_oportunidade, op.id_endereco, op.image, op.titulo, op.resumo, op.id_especialidade, op.id_obra, op.data_inicio, op.data_fim, en.cidade, ob.nome_obra, es.nome_especialidade FROM oportunidades op LEFT JOIN obras ob ON op.id_obra = ob.id_obra LEFT JOIN especialidades es ON op.id_especialidade = es.id_especialidade LEFT JOIN enderecos en ON op.id_endereco = en.id_endereco`;
// 	}else if (Object.keys(req.query).length == 0 && req.body.especialidadeInput != "" && req.body.localidadeInput != "") {
// 		sql = `SELECT *, op.id_oportunidade, op.nome_oportunidade, op.id_endereco, op.image, op.titulo, op.resumo, op.id_especialidade, op.id_obra, op.data_inicio, op.data_fim, en.cidade, ob.nome_obra, es.nome_especialidade FROM oportunidades op LEFT JOIN obras ob ON op.id_obra = ob.id_obra LEFT JOIN especialidades es ON op.id_especialidade = es.id_especialidade LEFT JOIN enderecos en ON op.id_endereco = en.id_endereco WHERE LOWER(es.nome_especialidade) LIKE LOWER('%${req.body.especialidadeInput}%') AND LOWER(en.cidade) LIKE LOWER('%${req.body.localidadeInput}%')`;
// 	} else if (Object.keys(req.query).length == 0 && req.body.especialidadeInput != "") {
// 		sql = `SELECT *, op.id_oportunidade, op.nome_oportunidade, op.id_endereco, op.image, op.titulo, op.resumo, op.id_especialidade, op.id_obra, op.data_inicio, op.data_fim, en.cidade, ob.nome_obra, es.nome_especialidade FROM oportunidades op LEFT JOIN obras ob ON op.id_obra = ob.id_obra LEFT JOIN especialidades es ON op.id_especialidade = es.id_especialidade LEFT JOIN enderecos en ON op.id_endereco = en.id_endereco WHERE LOWER(es.nome_especialidade) LIKE LOWER('%${req.body.especialidadeInput}%')`;
// 	} else if (Object.keys(req.query).length == 0 && req.body.localidadeInput != "") {
// 		sql = `SELECT *, op.id_oportunidade, op.nome_oportunidade, op.id_endereco, op.image, op.titulo, op.resumo, op.id_especialidade, op.id_obra, op.data_inicio, op.data_fim, en.cidade, ob.nome_obra, es.nome_especialidade FROM oportunidades op LEFT JOIN obras ob ON op.id_obra = ob.id_obra LEFT JOIN especialidades es ON op.id_especialidade = es.id_especialidade LEFT JOIN enderecos en ON op.id_endereco = en.id_endereco WHERE LOWER(en.cidade) LIKE LOWER('%${req.body.localidadeInput}%')`;
// 	}  else if (Object.keys(req.query).length != 0) {
// 		if (req.query.filtro == "cidade") {
// 		sql = `SELECT *, op.id_oportunidade, op.nome_oportunidade, op.id_endereco, op.image, op.titulo, op.resumo, op.id_especialidade, op.id_obra, op.data_inicio, op.data_fim, en.cidade, ob.nome_obra, es.nome_especialidade FROM oportunidades op LEFT JOIN obras ob ON op.id_obra = ob.id_obra LEFT JOIN especialidades es ON op.id_especialidade = es.id_especialidade LEFT JOIN enderecos en ON op.id_endereco = en.id_endereco WHERE LOWER(en.cidade) LIKE LOWER('%${req.query.cidade}%')`;
// 		} else if (req.query.filtro == "especialidade") {
// 		sql = `SELECT *, op.id_oportunidade, op.nome_oportunidade, op.id_endereco, op.image, op.titulo, op.resumo, op.id_especialidade, op.id_obra, op.data_inicio, op.data_fim, en.cidade, ob.nome_obra, es.nome_especialidade FROM oportunidades op LEFT JOIN obras ob ON op.id_obra = ob.id_obra LEFT JOIN especialidades es ON op.id_especialidade = es.id_especialidade LEFT JOIN enderecos en ON op.id_endereco = en.id_endereco WHERE LOWER(es.nome_especialidade) LIKE LOWER('%${req.query.especialidade}%')`;
// 		}}

// 		console.log(sql)
// 	db.all(sql, (err, row) => {
// 		if (err) {
// 			console.error(err.message);
// 			res.send("Erro: " + err.message);
			
// 			return;
// 		}		// console.log(row)
// 		res.render("pesquisa/index", {response: row});
// 	});
	
	
// });


module.exports = router;
