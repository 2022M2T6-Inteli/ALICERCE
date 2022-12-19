const express = require("express");
const db = require("../utils/db");
const router = express.Router();
const app = express()



app.use(express.json())





app.use(express.urlencoded())
// rota principal de cadastro
router.all("/", (req, res) => {
	res.render("cadastro/cadastro"); // renderizando a view
});

// rota da parte 2 de cadastro
router.all("/continuacao", (req, res) => {
	res.render("cadastro/continuacao"); // renderizando a view
});

// rota da parte 3 de cadastro
router.all("/completar", (req, res) => {
	res.render("cadastro/completar");// renderizando a view
});

// rota principal para retornar os dados do cadastro
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


// exportnado objeto router
module.exports = router;


router.get('/cadastro2', (req, res)=>{

	res.sendFile(__dirname + 'src/frontend/views/cadastro/index.ejs') // renderizando a view

})

//adicionando dados do cadastro 1
router.post('/cadastro1Post',(req,res)=>{
	
	const cnpj = req.body.cnpj
	const email = req.body.email
	const telefone = req.body.telefone
	
	console.log(req.body)
	// sql para rodar no banco de dados
	let sql = `INSERT INTO empreiteiras (CNPJ, email , telefone) VALUES ("${cnpj}","${email}","${telefone}")`
	res.redirect("/cadastro/completar")
	console.log(sql)
	db.run(sql) // rodando o sql no banco de dados
})

//adicionando dados do cadastro 2
router.post('/completarCadastro',(req,res)=>{
	const trabalhouComMrv = req.body.trabalhouComMrv
	const razao_social = req.body.razaoSocial
	const nome_fantasia = req.body.nomeFantasia
	const cep = req.body.cep
	const numero = req.body.numero

	console.log(req.body)
	// sql para rodar no banco de dados
	let sql = `INSERT INTO empreiteiras (razao_social , nome_fantasia) values ("${razao_social}","${nome_fantasia}")`
	let sql_2 = `INSERT INTO enderecos (cep, numero) values ("${cep}","${numero}")`
	db.run(sql)
	db.run(sql_2) // rodando o sql no banco de dados
	res.redirect("/cadastro/continuacao") // renderizando a view 

})

// rota para inserção de dados de cadastro
router.post("/continuacaoCadastro",(req,res)=>{
	const cpf = req.body.cpf
	const nome = req.body.nome
	const genero = req.body.genero
	const departamento = req.body.departamento
	const cargo = req.body.funcao
	
	console.log(req.body)
		// sql para rodar no banco de dados
	let sql = `INSERT INTO funcionarios_empreiteiras (cpf, nome_funcionario, sexo, departamento, cargo) values("${cpf}","${nome}","${genero}","${departamento}","${cargo}")`
	
	db.run(sql) // rodando o sql no banco de dados

	res.redirect("/") // redirecionando para a rota principal
	
})

// rota para retornar dados de obra
router.get("/obra",(req,res)=>{
	res.render("cadastro/obra") // renderizando a view
  })

  // rota para inserção de dados de obra
router.post("/inserirObra",(req,res)=>{
    
	
    const titulo = req.body.titulo
    const descricao = req.body.descricao
    const resumo = req.body.resumo
    const data_inicio = req.body.data_inicio
	const especialidade = req.body.especialidade
	const nome_oportunidade = req.body.nome_oportunidade
	const endereco = req.body.endereco	
	const qtde = req.body.quantidade_pessoas_desejadas
	const id_obra = req.body.obra


	// sql para rodar no banco de dados
	let sql = `INSERT INTO oportunidades (id_especialidade, nome_oportunidade,id_endereco,image,titulo, descricao, resumo, data_inicio,quantidade_pessoas_desejadas,id_obra) values("${especialidade}","${nome_oportunidade}","${endereco}","imagem_teste","${titulo}","${descricao}","${resumo}","${data_inicio}","${qtde}","${id_obra}")`
	db.run(sql) // rodando o sql no banco de dados
    console.log(sql)
	
	
	res.redirect("/") // redirecionando para a rota principal
})