BEGIN TRANSACTION;

DROP TABLE IF EXISTS `enderecos`;
DROP TABLE IF EXISTS `especialidades`;
DROP TABLE IF EXISTS `certificados`;
DROP TABLE IF EXISTS `empreiteiras`;
DROP TABLE IF EXISTS `obras`;
DROP TABLE IF EXISTS `funcionarios_empreiteiras`;
DROP TABLE IF EXISTS `empreiteiras_certificados`;
DROP TABLE IF EXISTS `admin`;
DROP TABLE IF EXISTS `oportunidades`;
DROP TABLE IF EXISTS `empreiteiras_especialidades`;
DROP TABLE IF EXISTS `feedbacks`;
DROP TABLE IF EXISTS `empreiteira_historico_obras`;
DROP TABLE IF EXISTS `favoritos`;
DROP TABLE IF EXISTS `contratos`;


CREATE TABLE
IF NOT EXISTS "enderecos"
(
    "id_endereco" INTEGER PRIMARY KEY AUTOINCREMENT,
    "cep" VARCHAR
(8),
    "logradouro" VARCHAR
(100),
    "bairro" VARCHAR
(50),
    "cidade" VARCHAR
(50),
    "estado" VARCHAR
(2),
    "numero" INTEGER,
    "complemento" VARCHAR
(50)
);

CREATE TABLE
IF NOT EXISTS "especialidades"
(
    "id_especialidade" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome_especialidade" VARCHAR
(50),
    "imagem" VARCHAR
(50)
);

CREATE TABLE
IF NOT EXISTS "certificados"
(
    "id_certificado" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome_certificado" VARCHAR
(50)
);

CREATE TABLE
IF NOT EXISTS "empreiteiras"
(
	"id_empreiteira" INTEGER PRIMARY KEY AUTOINCREMENT,
    "CNPJ" VARCHAR
(14) ,
    "razao_social" VARCHAR
(100) ,
    "nome_fantasia" VARCHAR
(100) ,
    "quantidade_funcionarios" INTEGER,
    "avaliacao" INTEGER,
    "email" VARCHAR
(50) ,
    "telefone" VARCHAR
(11) ,
	"trabalhou_com_mrv" BOOLEAN,
    "status_documentacao" VARCHAR
(50),
    "id_endereco" INTEGER ,
    FOREIGN KEY
(id_endereco) REFERENCES enderecos
(id_endereco)
);

CREATE TABLE
IF NOT EXISTS "obras"
(
    "id_obra" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome_obra" VARCHAR
(50),
    "id_endereco" INTEGER,
    "image" VARCHAR
(250),
    FOREIGN KEY
(id_endereco) REFERENCES enderecos
(id_endereco)
);

CREATE TABLE
IF NOT EXISTS "funcionarios_empreiteiras"
(
    "id_funcionario" INTEGER PRIMARY KEY AUTOINCREMENT,
    "id_empreiteira" INTEGER,
    "nome_funcionario" INTEGER,
    "responsavel" BOOLEAN,
    "sexo" VARCHAR
(1),
    "cpf" VARCHAR
(11),
    "email" VARCHAR
(50),
    "senha" VARCHAR
(50),
    "departamento" VARCHAR
(50),
    "cargo" VARCHAR
(50),
    "telefone" VARCHAR
(11),
    "ultima_atualizacao" DATE,
    "pendencias" BOOLEAN,
    "status" VARCHAR
(50),
    FOREIGN KEY
(id_empreiteira) REFERENCES empreiteiras
(id_empreiteira)
);

CREATE TABLE
IF NOT EXISTS "empreiteiras_certificados"
(
    "id_empreiteira_certificado" INTEGER PRIMARY KEY AUTOINCREMENT,
    "id_empreiteira" INTEGER,
    "id_certificado" INTEGER,
    FOREIGN KEY
(id_empreiteira) REFERENCES empreiteiras
(id_empreiteira),
    FOREIGN KEY
(id_certificado) REFERENCES certificados
(id_certificado)
);

CREATE TABLE
IF NOT EXISTS "admin"
(
    "id_funcionario_mrv" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" VARCHAR
(50),
    "email" VARCHAR
(50),
    "senha" VARCHAR
(50),
    "regional" VARCHAR
(50),
    "telefone" VARCHAR
(11),
    "ultima_atualizacao" DATE
);

CREATE TABLE
IF NOT EXISTS "oportunidades"
(
    "id_oportunidade" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome_oportunidade" VARCHAR
(50),
    "id_endereco" INTEGER,
    "image" VARCHAR
(250),
    "titulo" VARCHAR
(50),
    "descricao" TEXT,
    "resumo" TEXT,
    "quantidade_pessoas_desejadas" INTEGER,
    "id_especialidade" INTEGER,
    "id_obra" INTEGER,
    "data_inicio" DATE,
    "data_fim" DATE,
    FOREIGN KEY
(id_endereco) REFERENCES enderecos
(id_endereco),
    FOREIGN KEY
(id_especialidade) REFERENCES especialidades
(id_especialidade),
    FOREIGN KEY
(id_obra) REFERENCES obras
(id_obra)
);

CREATE TABLE
IF NOT EXISTS "empreiteiras_especialidades"
(
    "id_empreiteiras_especialidades" INTEGER PRIMARY KEY AUTOINCREMENT,
	"id_empreiteira" INTEGER,
    "id_especialidade" INTEGER,
    FOREIGN KEY
(id_empreiteira) REFERENCES empreiteiras
(id_empreiteira),
    FOREIGN KEY
(id_especialidade) REFERENCES especialidades
(id_especialidade)
);

CREATE TABLE
IF NOT EXISTS "feedbacks"
(
    "id_feedback" INTEGER PRIMARY KEY AUTOINCREMENT,
    "descricao_feedback" TEXT,
    "id_empreiteira" INTEGER,
    "id_oportunidade" INTEGER,
    FOREIGN KEY
(id_empreiteira) REFERENCES empreiteiras
(id_empreiteira),
    FOREIGN KEY
(id_oportunidade) REFERENCES oportunidades
(id_oportunidade)
);

CREATE TABLE
IF NOT EXISTS "empreiteira_historico_obras"
(
    "id_historico_obra" INTEGER PRIMARY KEY AUTOINCREMENT,
    "id_empreiteira" INTEGER,
    "id_obra" INTEGER,
    "id_oportunidade" INTEGER,
    FOREIGN KEY
(id_empreiteira) REFERENCES empreiteiras
(id_empreiteira),
    FOREIGN KEY
(id_oportunidade) REFERENCES oportunidades
(id_oportunidade),
    FOREIGN KEY
(id_obra) REFERENCES obras
(id_obra)
);

CREATE TABLE
IF NOT EXISTS "favoritos"
(
    "id_favorito" INTEGER PRIMARY KEY AUTOINCREMENT,
    "id_empreiteira" INTEGER,
    "id_oportunidade" INTEGER,
    FOREIGN KEY
(id_empreiteira) REFERENCES empreiteiras
(id_empreiteira),
    FOREIGN KEY
(id_oportunidade) REFERENCES oportunidades
(id_oportunidade)
);

CREATE TABLE
IF NOT EXISTS "contratos"
(
    "id_contrato" INTEGER PRIMARY KEY AUTOINCREMENT,
    "id_oportunidade" INTEGER,
    "id_empreiteira" INTEGER,
    "contrato" VARCHAR
(150),
    "quantidade_funcionarios" INTEGER,
    "pendencias" BOOLEAN,
    "status_contrato" VARCHAR
(50),
    "observacoes" TEXT,
    FOREIGN KEY
(id_oportunidade) REFERENCES oportunidades
(id_oportunidade),
    FOREIGN KEY
(id_empreiteira) REFERENCES empreiteiras
(id_empreiteira)
);

COMMIT;
