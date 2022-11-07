
import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
app.use(express.json())

const DBPATH = path.join('C:/Users/Inteli/Documents/inteli/modulo2/api_temporaria/src/data/data_alicerce.db')

const hostname = '127.0.0.1';
const port = 3000;



 // READ empreiteiras + certificados (JOIN)
 app.get('/empreiteiras_certificados', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM empreiteiras A LEFT JOIN empreiteiras_certificados B ON A.id_empreiteira = B.id_empreiteira";
    } else {
        sql = "SELECT * FROM empreiteiras A LEFT JOIN empreiteiras_certificados B ON A.id_empreiteira = B.id_empreiteira WHERE A.id_empreiteira = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});


 // CRUD - Create, Read, Update, Delete - para ADMINISTRADORES
 // READ admin
app.get('/admin', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM admin";
    } else {
        sql = "SELECT * FROM admin WHERE id = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

 // CREATE admin
app.post('/admin', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO admin (nome, email, senha, regional, telefone) VALUES ('${req.body.nome}', '${req.body.email}', '${req.body.senha}', '${req.body.regional}', '${req.body.telefone}')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})

// UPDATE admin
app.put('/admin', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `UPDATE admin SET nome = '${req.body.nome}', email = '${req.body.email}', senha = '${req.body.senha}', regional = '${req.body.regional}', telefone = '${req.body.telefone}' WHERE id_funcionario_mrv = ${req.body.id}`;
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário atualizado com sucesso!");
})

// DELETE admin
app.delete('/admin', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `DELETE FROM admin WHERE id_funcionario_mrv = ${req.body.id}`
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário deletado com sucesso!");
})
  

 // CRUD - Create, Read, Update, Delete - para os certificados
 // READ certificados
 app.get('/certificados', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM certificados";
    } else {
        sql = "SELECT * FROM certificados WHERE id_certificado = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

 // CREATE certificados
app.post('/certificados', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO certificados (nome_certificado) VALUES ('${req.body.nome}')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})

// UPDATE certificados
app.put('/certificados', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `UPDATE certificados SET nome_certificado = '${req.body.nome}' WHERE id_certificado = ${req.body.id}`;
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário atualizado com sucesso!");
})

// DELETE certificados
app.delete('/certificados', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `DELETE FROM certificados WHERE id_certificado = ${req.body.id}`
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário deletado com sucesso!");
})

 // CRUD - Create, Read, Update, Delete - para os contratos
 // READ contratos
 app.get('/contratos', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM contratos";
    } else {
        sql = "SELECT * FROM contratos WHERE id_contrato = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

 // CREATE contratos
app.post('/contratos', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO contratos (id_oportunidade, id_empreiteira, contrato, quantidade_funcionarios, pendencias, status_contrato, observacoes) VALUES ('${req.body.id_oportunidade}', '${req.body.id_empreiteira}', '${req.body.contrato}', '${req.body.quantidade_funcionarios}', '${req.body.pendencias}', '${req.body.status_contrato}', '${req.body.observacoes}')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})

// UPDATE contratos
app.put('/contratos', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `UPDATE contratos SET id_oportunidade = '${req.body.id_oportunidade}', id_empreiteira = '${req.body.id_empreiteira}', contrato = '${req.body.contrato}', quantidade_funcionarios = '${req.body.quantidade_funcionarios}', pendencias = '${req.body.pendencias}', status_contrato = '${req.body.status_contrato}', observacoes = '${req.body.observacoes}' WHERE id_contrato = ${req.body.id}`;
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário atualizado com sucesso!");
})

// DELETE contratos
app.delete('/contratos', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `DELETE FROM contratos WHERE id_contrato = ${req.body.id}`
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário deletado com sucesso!");
})

 // CRUD - Create, Read, Update, Delete - para os empreiteira_historico_obras
 // READ empreiteira_historico_obras
 app.get('/empreiteira_historico_obras', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM empreiteira_historico_obras";
    } else {
        sql = "SELECT * FROM empreiteira_historico_obras WHERE id_historico_obra = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

 // CREATE empreiteira_historico_obras
app.post('/empreiteira_historico_obras', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO empreiteira_historico_obras (id_empreiteira, id_obra, id_oportunidade) VALUES ('${req.body.id_empreiteira}', '${req.body.id_obra}', '${req.body.id_oportunidade}'')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})

// UPDATE empreiteira_historico_obras
app.put('/empreiteira_historico_obras', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `UPDATE empreiteira_historico_obras SET id_empreiteira = '${req.body.id_empreiteira}', id_obra = '${req.body.id_obra}', id_oportunidade = '${req.body.id_oportunidade}' WHERE id_historico_obra = ${req.body.id}`;
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário atualizado com sucesso!");
})

// DELETE empreiteira_historico_obras
app.delete('/empreiteira_historico_obras', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `DELETE FROM empreiteira_historico_obras WHERE id_historico_obra = ${req.body.id}`
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário deletado com sucesso!");
})

 // CRUD - Create, Read, Update, Delete - para os empreiteiras
 // READ empreiteiras
 app.get('/empreiteiras', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM empreiteiras";
    } else {
        sql = "SELECT * FROM empreiteiras WHERE id_empreiteira = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

 // CREATE empreiteiras
app.post('/empreiteiras', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO empreiteiras (CNPJ, razao_social, nome_fantasia, quantidade_funcionarios, avaliacao, email, telefone, trabalhou_com_mrv, status_documentacao, id_endereco) VALUES ('${req.body.CNPJ}', '${req.body.razao_social}', '${req.body.nome_fantasia}', '${req.body.quantidade_funcionarios}', '${req.body.avaliacao}', '${req.body.email}', '${req.body.trabalhou_com_mrv}', '${req.body.status_documentacao}', '${req.body.id_endereco}')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})

// UPDATE empreiteiras
app.put('/empreiteiras', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `UPDATE empreiteiras SET CNPJ = '${req.body.CNPJ}', razao_social = '${req.body.razao_social}', nome_fantasia = '${req.body.nome_fantasia}' = '${req.body.telefone}', quantidade_funcionarios = '${req.body.quantidade_funcionarios}', avaliacao = '${req.body.avaliacao}', email = '${req.body.email}', telefone = '${req.body.telefone}', trabalhou_com_mrv = '${req.body.trabalhou_com_mrv}', status_documentacao = '${req.body.status_documentacao}', id_endereco = '${req.body.id_endereco}'
    , telefone = '${req.body.telefone}' WHERE id_empreiteira = ${req.body.id}`;
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário atualizado com sucesso!");
})

// DELETE empreiteiras
app.delete('/empreiteiras', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `DELETE FROM empreiteiras WHERE id_empreiteira = ${req.body.id}`
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário deletado com sucesso!");
})

 // CRUD - Create, Read, Update, Delete - para os empreiteiras_certificados
 // READ empreiteiras_certificados
 app.get('/empreiteiras_certificados', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM empreiteiras_certificados";
    } else {
        sql = "SELECT * FROM empreiteiras_certificados WHERE id_empreiteira_certificado = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

 // CREATE empreiteiras_certificados
app.post('/empreiteiras_certificados', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO empreiteiras_certificados (id_empreiteira, id_certificado) VALUES ('${req.body.id_empreiteira}', '${req.body.id_certificado}')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})

// UPDATE empreiteiras_certificados
app.put('/empreiteiras_certificados', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `UPDATE empreiteiras_certificados SET id_empreiteira = '${req.body.id_empreiteira}', id_certificado = '${req.body.id_certificado}' WHERE id_empreiteira_certificado = ${req.body.id}`;
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário atualizado com sucesso!");
})

// DELETE empreiteiras_certificados
app.delete('/empreiteiras_certificados', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `DELETE FROM empreiteiras_certificados WHERE id_empreiteira_certificado = ${req.body.id}`
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário deletado com sucesso!");
})

 // CRUD - Create, Read, Update, Delete - para os empreiteiras_especialidades
 // READ empreiteiras_especialidades
 app.get('/empreiteiras_especialidades', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM empreiteiras_especialidades";
    } else {
        sql = "SELECT * FROM empreiteiras_especialidades WHERE id_empreiteiras_especialidades = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

 // CREATE empreiteiras_especialidades
app.post('/empreiteiras_especialidades', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO empreiteiras_especialidades (id_empreiteira, id_especialidade) VALUES ('${req.body.id_empreiteira}', '${req.body.id_especialidade}')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})

// UPDATE empreiteiras_especialidades
app.put('/empreiteiras_especialidades', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `UPDATE empreiteiras_especialidades SET id_empreiteira = '${req.body.id_empreiteira}', id_especialidade = '${req.body.id_especialidade}'`;
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário atualizado com sucesso!");
})

// DELETE empreiteiras_especialidades
app.delete('/empreiteiras_especialidades', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `DELETE FROM empreiteiras_especialidades WHERE id_empreiteiras_especialidades = ${req.body.id}`
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário deletado com sucesso!");
})

 // CRUD - Create, Read, Update, Delete - para os enderecos
 // READ enderecos
 app.get('/enderecos', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM enderecos";
    } else {
        sql = "SELECT * FROM enderecos WHERE id_endereco = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

 // CREATE enderecos
app.post('/enderecos', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO enderecos (cep, logradouro, bairro, cidade, estado, numero, complemento) VALUES ('${req.body.cep}', '${req.body.logradouro}', '${req.body.bairro}', '${req.body.cidade}', '${req.body.estado}', '${req.body.numero}', '${req.body.complemento}')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})

// UPDATE enderecos
app.put('/enderecos', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `UPDATE enderecos SET cep = '${req.body.cep}', logradouro = '${req.body.logradouro}', bairro = '${req.body.bairro}', cidade = '${req.body.cidade}', estado = '${req.body.estado}', numero = '${req.body.numero}', complemento = '${req.body.complemento}' WHERE id_endereco = ${req.body.id}`;
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário atualizado com sucesso!");
})

// DELETE enderecos
app.delete('/enderecos', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `DELETE FROM enderecos WHERE id_endereco = ${req.body.id}`
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário deletado com sucesso!");
})

 // CRUD - Create, Read, Update, Delete - para os especialidades
 // READ especialidades
 app.get('/especialidades', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM especialidades";
    } else {
        sql = "SELECT * FROM especialidades WHERE id_especialidade = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

 // CREATE especialidades
app.post('/especialidades', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO especialidades (nome_especialidade, imagem) VALUES ('${req.body.nome_especialidade}', '${req.body.imagem}')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})

// UPDATE especialidades
app.put('/especialidades', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `UPDATE especialidades SET nome_especialidade = '${req.body.nome_especialidade}', imagem = '${req.body.imagem}' WHERE id_especialidade = ${req.body.id}`;
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário atualizado com sucesso!");
})

// DELETE especialidades
app.delete('/especialidades', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `DELETE FROM especialidades WHERE id_especialidade = ${req.body.id}`
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário deletado com sucesso!");
})

 // CRUD - Create, Read, Update, Delete - para os favoritos
 // READ favoritos
 app.get('/favoritos', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM favoritos";
    } else {
        sql = "SELECT * FROM favoritos WHERE id_favorito = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

 // CREATE favoritos
app.post('/favoritos', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO favoritos (id_empreiteira, id_oportunidade) VALUES ('${req.body.id_empreiteira}', '${req.body.id_oportunidade}')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})

// UPDATE favoritos
app.put('/favoritos', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `UPDATE favoritos SET id_empreiteira = '${req.body.id_empreiteira}', id_oportunidade = '${req.body.id_oportunidade}' WHERE id_favorito = ${req.body.id}`;
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário atualizado com sucesso!");
})

// DELETE favoritos
app.delete('/favoritos', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `DELETE FROM favoritos WHERE id_favorito = ${req.body.id}`
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário deletado com sucesso!");
})

 // CRUD - Create, Read, Update, Delete - para os feedbacks
 // READ feedbacks
 app.get('/feedbacks', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM feedbacks";
    } else {
        sql = "SELECT * FROM feedbacks WHERE id_feedback = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

 // CREATE feedbacks
app.post('/feedbacks', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO feedbacks (descricao_feedback, id_empreiteira, id_oportunidade) VALUES ('${req.body.descricao_feedback}', '${req.body.id_empreiteira}', '${req.body.id_oportunidade}')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})

// UPDATE feedbacks
app.put('/feedbacks', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `UPDATE feedbacks SET descricao_feedback = '${req.body.descricao_feedback}', id_empreiteira = '${req.body.id_empreiteira}', id_oportunidade = '${req.body.id_oportunidade}' WHERE id_feedback = ${req.body.id}`;
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário atualizado com sucesso!");
})

// DELETE feedbacks
app.delete('/feedbacks', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `DELETE FROM feedbacks WHERE id_feedback = ${req.body.id}`
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário deletado com sucesso!");
})

 // CRUD - Create, Read, Update, Delete - para os funcionarios_empreiteiras
 // READ funcionarios_empreiteiras
 app.get('/funcionarios_empreiteiras', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM funcionarios_empreiteiras";
    } else {
        sql = "SELECT * FROM funcionarios_empreiteiras WHERE id_funcionario = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

 // CREATE funcionarios_empreiteiras
app.post('/funcionarios_empreiteiras', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO funcionarios_empreiteiras (id_empreiteira, nome_funcionario, responsavel, sexo, cpf, email, senha, departamento, cargo, telefone, ultima_atualizacao, pendencias, status) VALUES ('${req.body.id_empreiteira}', '${req.body.nome_funcionario}', '${req.body.responsavel}', '${req.body.sexo}', '${req.body.cpf}', '${req.body.email}', '${req.body.senha}', '${req.body.departamento}', '${req.body.cargo}', '${req.body.telefone}', '${req.body.ultima_atualizacao}', '${req.body.pendencias}', '${req.body.status}')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})

// UPDATE funcionarios_empreiteiras
app.put('/funcionarios_empreiteiras', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `UPDATE funcionarios_empreiteiras SET id_empreiteira = '${req.body.id_empreiteira}', nome_funcionario = '${req.body.nome_funcionario}', responsavel = '${req.body.responsavel}', sexo = '${req.body.sexo}', cpf = '${req.body.cpf}', email = '${req.body.email}', senha = '${req.body.senha}', departamento = '${req.body.departamento}', cargo = '${req.body.cargo}', telefone = '${req.body.telefone}', ultima_atualizacao = '${req.body.ultima_atualizacao}', pendencias = '${req.body.pendencias}', status = '${req.body.status}' WHERE id_funcionario = ${req.body.id}`;
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário atualizado com sucesso!");
})

// DELETE funcionarios_empreiteiras
app.delete('/funcionarios_empreiteiras', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `DELETE FROM funcionarios_empreiteiras WHERE id_funcionario = ${req.body.id}`
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário deletado com sucesso!");
})

 // CRUD - Create, Read, Update, Delete - para os obras
 // READ obras
 app.get('/obras', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM obras";
    } else {
        sql = "SELECT * FROM obras WHERE id_obra = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

 // CREATE obras
app.post('/obras', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO obras (nome_obra, id_endereco, image) VALUES ('${req.body.nome_obra}', '${req.body.id_endereco}', '${req.body.image}')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})

// UPDATE obras
app.put('/obras', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `UPDATE obras SET nome_obra = '${req.body.nome_obra}', id_endereco = '${req.body.id_endereco}', image = '${req.body.image}' WHERE id_obra = ${req.body.id}`;
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário atualizado com sucesso!");
})

// DELETE obras
app.delete('/obras', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `DELETE FROM obras WHERE id_obra = ${req.body.id}`
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário deletado com sucesso!");
})

 // CRUD - Create, Read, Update, Delete - para os oportunidades
 // READ oportunidades
 app.get('/oportunidades', (req, res) => { 
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql
    if (Object.keys(req.body).length == 0) { 
        sql = "SELECT * FROM oportunidades";
    } else {
        sql = "SELECT * FROM oportunidades WHERE id_oportunidade = " + req.id;
    }

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

 // CREATE oportunidades
app.post('/oportunidades', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `INSERT INTO oportunidades (nome_oportunidade, id_endereco, image, titulo, descricao, resumo, quantidade_pessoas_desejadas, id_especialidade, id_obra, data_inicio, data_fim) VALUES ('${req.body.nome_oportunidade}', '${req.body.id_endereco}', '${req.body.image}', '${req.body.titulo}', '${req.body.descricao}', '${req.body.resumo}', '${req.body.quantidade_pessoas_desejadas}', '${req.body.id_especialidade}', '${req.body.id_obra}', '${req.body.data_inicio}', '${req.body.data_fim}')`;

    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário cadastrado com sucesso!");
})

// UPDATE oportunidades
app.put('/oportunidades', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `UPDATE oportunidades SET nome_oportunidade = '${req.body.nome_oportunidade}', id_endereco = '${req.body.id_endereco}', image = '${req.body.image}', titulo = '${req.body.titulo}', descricao = '${req.body.descricao}', resumo = '${req.body.resumo}', quantidade_pessoas_desejadas = '${req.body.quantidade_pessoas_desejadas}', id_especialidade = '${req.body.id_especialidade}', id_obra = '${req.body.id_obra}', data_inicio = '${req.body.data_inicio}', data_fim = '${req.body.data_fim}' WHERE id_oportunidade = ${req.body.id}`;
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário atualizado com sucesso!");
})

// DELETE oportunidades
app.delete('/oportunidades', urlencodedParser, (req, res) => {
    res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
    let sql = `DELETE FROM oportunidades WHERE id_oportunidade = ${req.body.id}`
    // open the database
    let db = new sqlite3.Database(DBPATH);
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
    });
    db.close();
    res.send("Usuário deletado com sucesso!");
})


app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
  });