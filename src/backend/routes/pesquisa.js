const express = require("express");
const db = require('../utils/db');

const router = express.Router();

// rota para acessar a pagina de pesquisa
router.all("/", (req, res) => {
	res.render("pesquisa/index");
});
 

module.exports = router;
