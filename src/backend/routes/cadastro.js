const express = require("express");
const db = require('data_alicerce.db');
const router = express.Router();
const app = express()



app.use(express.json())





app.use(express.urlencoded())
// rota principal de cadastro
router.all("/", (req, res) => {
	res.render("cadastro/index");
});

// rota principal para retornar os dados do cadastro
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
		res.render("funcionarios/form", { funcionario: row });
	});
});

// rota para alterar o cadastro
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

		res.render("funcionarios/alterar", { mensagem: msg });
	});
});

// rota para remover cadastro
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

// rota para inserir cadastro
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

// exportnado objeto router
module.exports = router;


router.get('/cadastro2', (req, res)=>{

	res.sendFile(__dirname + 'src/frontend/views/cadastro/index.ejs')

})

//adicionando dados do cadastro 1
app.post('/cadastro1Post',(req,res)=>{
	
	const cnpj = req.body.cnpj
	const email = req.body.email
	const telefone = req.body.telefone

	db.run('INSERT INTO empreiteiras (CNPJ, email , telefone) VALUES (?, ?, ?)', [cnpj, email, telefone], function(err) {
		if (err) {
		  return console.error(err.message);
		}
	  });
})

app.post('/cadastro2Post',(req,res)=>{
	
	const cnpj = req.body.cnpj
	const email = req.body.email
	const telefone = req.body.telefone

	db.run('INSERT INTO empreiteiras (CNPJ, email , telefone) VALUES (?, ?, ?)', [cnpj, email, telefone], function(err) {
		if (err) {
		  return console.error(err.message);
		}
	  });
})


app.post('/cadastro2Post', (req,res)=>{
	const cpf = req.body.cpf
	const nome = req.body.nome
	const departamento = req.body.departamento

	db.run(`INSERT INTO funcionarios_empreiteiras (nome,cpf, departamento) VALUES(?,?)`),[nome, cpf,departamento ]
	
})


router.get("/obra",(req,res)=>{
	res.render("cadastro/obra")
  })

router.post("/inserirObra",(req,res)=>{
    
	
    const titulo = req.body.titulo
	
    const descricao = req.body.descricao
    const resumo = req.body.resumo
    const data_inicio = req.body.data_inicio
	
	
   let sql = `INSERT INTO oportunidades (titulo, descricao, resumo, data_inicio) values(${titulo},${descricao},${resumo},${data_inicio})`
   console.log(sql)
    db.run(sql)
   if (err) {
        res.send("Erro: " + err.message);
        console.error(err.message);
    }
})