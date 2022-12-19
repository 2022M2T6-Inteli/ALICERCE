const express = require("express");
const db = require('../utils/db');

const router = express.Router();

// rota principal da aplicação
router.all("/", (req, res) => {
	res.render("../views/index/index"); // renderizando a view
});


module.exports = router;
