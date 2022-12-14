const express = require("express")
const port = 3000
const db = require('../utils/db');
const app = express()


app.use(express.json())
app.use(express.urlencoded())


app.get("/inserir",(req,res)=>{
  res.sendFile(__dirname + "/index.html")
})


app.post("/inserirObra",(req,res)=>{
    const endereco = req.body.endereco
    const titulo = req.body.titulo
    const descricao = req.body.descricao
    const resumo = req.body.resumo
    const data_inicio = req.body.data_inicio

    sql = `INSERT INTO oportunidades (endereco,titulo, descricao, resumo, data_inicio) values(${endereco},${titulo},${descricao},${resumo},${data_inicio})`
    if (err) {
        res.send("Erro: " + err.message);
        console.error(err.message);
    }
})