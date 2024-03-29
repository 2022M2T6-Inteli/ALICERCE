const path = require("path");

// Importa as configurações do app
require("dotenv").config({ encoding: "utf8", path: path.join(__dirname, "../env") });

// Configura o cache da view engine EJS, para armazenar as
// 200 últimas páginas já processadas, por ordem de uso.
const ejs = require("ejs");
const LRU = require("lru-cache");
ejs.cache = new LRU({
	max: 200
});

const express = require("express");
const app = express();


// Configura o diretório de onde tirar as views.
app.set("views", path.join(__dirname, "../frontend/views"));
// Define o view engine como o ejs.
app.set("view engine", "ejs");

// Configura o middleware de arquivos estáticos para responder às rotas iniciadas por "/public", servindo o conteúdo da pasta "../public".
app.use("/public", express.static(path.join(__dirname, "../frontend/public"), {
	cacheControl: false,
	etag: false,
	maxAge: "30d"
}));

// Configura o middleware de arquivos estáticos para responder às rotas iniciadas por "/views", servindo o conteúdo da pasta "../views".
app.use("/views", express.static(path.join(__dirname, "../frontend/views")));

// // Configura o middleware que lê cookies. Ele está aqui, abaixo do middleware de arquivos estáticos, porque não precisamos de cookies para servir arquivos estáticos.
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

// Configura os middlewares responsáveis por fazer o parse do conteúdo do body quando ele for um JSON, ou um form convencional.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Esse middle serve para evitar cache das páginas e api no geral. Ele também fica aqui, depois do middleware de arquivos estáticos, pois os arquivos static devemusar cache em ambiente de produção.
app.use((req, res, next) => {
	res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
	res.header("Expires", "-1");
	res.header("Pragma", "no-cache");
	next();
});

// Especifica quais módulos serão responsáveis por servir cada rota, a partir dos endereços requisitados pelo cliente.
app.use("/", require("./routes/index"));
app.use("/ajuda", require("./routes/ajuda"));  
app.use("/detalhesOportunidades", require("./routes/detalhesOportunidades"));
app.use("/login", require("./routes/login"));
app.use("/cadastro", require("./routes/cadastro"));
app.use("/perfil", require("./routes/perfil"));
app.use("/pesquisa", require("./routes/pesquisa"));


// Configura o middleware de erro. Ele deve ser o último middleware configurado.
app.use((req, res, next) => {
	// Tratador de erro 404.
	const err = new Error("Não encontrado");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	// Se nenhum status foi definido até aqui, definimos o status 500.
	const status = err.status || 500
	res.status(status);

	// Em vez de send, poderíamos ter utilizado render() para devolver uma página de verdade.
	res.send("Erro " + status + " ocorrido: " + (err.message || err.toString()));
});

const server = app.listen(parseInt(process.env.PORT), process.env.IP, () => {
	console.log("Servidor executando na porta " + server.address().port);
});




