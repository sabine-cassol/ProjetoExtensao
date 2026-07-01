# Backend - Sistema de Gerenciamento de Projetos de Extensão Universitária

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-ORM-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Autenticação-black?style=for-the-badge&logo=jsonwebtokens)

</p>

---

# Sobre

Este repositório contém o backend do Sistema de Gerenciamento de Projetos de Extensão Universitária.

A aplicação foi desenvolvida utilizando Node.js, Express e Sequelize, seguindo uma arquitetura em camadas para garantir organização, manutenção simplificada e separação de responsabilidades.

A API é responsável por gerenciar professores, alunos, projetos de extensão, atividades, inscrições e registros de presença, além de controlar autenticação, autorização e cálculo da carga horária extensionista dos alunos.

---

# Objetivos do Backend

- Disponibilizar uma API REST para o sistema;
- Centralizar as regras de negócio da aplicação;
- Gerenciar autenticação e autorização dos usuários;
- Persistir informações no banco de dados;
- Garantir integridade e segurança dos dados;
- Fornecer endpoints para integração com o frontend.

---

# Tecnologias Utilizadas

## Backend

- Node.js
- Express.js
- Sequelize ORM
- MySQL

## Segurança

- JWT (JSON Web Token)
- bcrypt
- Cookies HTTP Only

## Ferramentas

- Docker
- Docker Compose
- Postman
- Git
- GitHub

---

# Arquitetura

O backend segue o padrão de arquitetura em camadas.

```text
Cliente

↓

Routes

↓

Controllers

↓

Services

↓

Repositories

↓

Models

↓

MySQL
```

## Responsabilidades

### Routes

Responsáveis pelo mapeamento dos endpoints da API.

### Controllers

Recebem as requisições HTTP e retornam as respostas adequadas.

### Services

Implementam as regras de negócio da aplicação.

### Repositories

Realizam a comunicação com o banco de dados.

### Models

Representam as entidades do sistema e seus relacionamentos.

---

# Estrutura do Projeto

```text
src/

├── config/
├── controllers/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
├── utils/
│
├── app.js
└── server.js
```

---

# Principais Funcionalidades

## Professores

- Cadastro
- Login
- Logout
- Atualização de perfil
- Gerenciamento de projetos
- Gerenciamento de atividades

## Alunos

- Cadastro
- Login
- Logout
- Atualização de perfil
- Inscrição em projetos

## Projetos

- Cadastro
- Atualização
- Ativação
- Desativação
- Consulta

## Atividades

- Cadastro
- Atualização
- Ativação
- Desativação
- Consulta

## Presenças

- Check-in
- Check-out
- Consulta de horas extensionistas

---

# Banco de Dados

O sistema utiliza MySQL como banco de dados relacional.

Principais entidades:

- Professor
- Aluno
- Projeto
- Atividade
- Presença
- Inscrição

Relacionamentos:

```text
Professor
      │
      │ 1:N
      ▼
Projeto
      │
      │ 1:N
      ▼
Atividade
      │
      │ 1:N
      ▼
Presença
      ▲
      │
Aluno
      │
      └──────────────┐
                     │
                Inscrição
                     │
                     ▼
                  Projeto
```

---

# Autenticação

O sistema utiliza autenticação baseada em JWT.

Fluxo:

```text
Login

↓

Validação das Credenciais

↓

Geração do JWT

↓

Cookie HTTP Only

↓

Middleware autenticar

↓

Middleware autorizar

↓

Acesso ao Recurso
```

Os tokens são armazenados em cookies HTTP Only para aumentar a segurança da aplicação.

---

# API REST

A API disponibiliza recursos para gerenciamento de:

```text
/professores

/alunos

/projetos

/atividades

/inscricoes

/presencas
```

A documentação detalhada dos endpoints encontra-se na pasta:

```text
docs/api
```

---

# Executando o Projeto

## Pré-requisitos

- Node.js 22+
- Docker
- Docker Compose

---

## Clonar o Repositório

```bash
git clone https://github.com/sabine-cassol/ProjetoExtensao.git
```

```bash
cd ProjetoExtensao
```

---

## Instalar Dependências

```bash
npm install
```

---

## Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=projeto_extensao
DB_USER=root
DB_PASSWORD=senha

JWT_SECRET=chave_secreta
JWT_EXPIRES_IN=1d
```

---

## Executar Localmente

```bash
npm run dev
```

ou

```bash
node server.js
```

---

## Executar com Docker

```bash
docker compose up --build
```

O Docker Compose inicializará automaticamente os serviços necessários para execução da aplicação.

---

# Documentação

## Roadmap de desenvolvimento

### Fundação

- [x] Model — Aluno
- [x] Model — Professor
- [x] Model — Atividade
- [x] Model — Presença
- [x] Model — Projeto

### Autenticação

- [x] Repository, Service e Controller de Professor
- [x] Repository, Service e Controller de Aluno
- [x] Rota de cadastro e login (Professor e Aluno)
- [x] Middleware JWT para proteger rotas
- [x] Middleware de autorização por tipo de usuário (professor vs aluno)

### Projetos

- [x] Repository, Service e Controller de Projeto
- [x] Rota pública para visitantes visualizarem projetos
- [x] Rota protegida para professor criar, editar e deletar projetos

### Atividades

- [x] Repository, Service e Controller de Atividade
- [x] Atividade sempre vinculada a um `projetoId`
- [x] Listagem de atividades por projeto

### Inscrições (alunos)

- [x] Rota para aluno se inscrever em um projeto
- [x] Rota para professor visualizar alunos inscritos
- [x] Validação: aluno só pode fazer check-in se estiver inscrito no projeto

### Presença

- [x] Rota de check-in — cria Presença com `atividadeId` e `alunoId`
- [x] Rota de check-out — preenche `dataHoraCheckOut` e `localizacaoCheckOut`
- [x] Validação: não permitir check-in duplo na mesma atividade
- [x] Validação: não permitir check-out sem check-in aberto

### Controle de horas

- [x] Calcular horas ao fazer check-out
- [x] Atualizar `horasExtensao` no model Aluno
- [x] Rota para aluno consultar histórico de horas por projeto

### Visitante

- [ ] Model — Visitante (identificado por número de telefone, sem senha)
- [ ] Rota de cadastro — visitante informa nome e telefone
- [ ] Rota de acesso — visitante informa telefone para acessar seus dados (sem senha)
- [ ] Rota de inscrição em projeto — vincula `visitanteId` a um `projetoId`
- [ ] Rota pública para listar projetos disponíveis (sem autenticação)
- [ ] Rota autenticada para visitante ver seus projetos inscritos e horários das atividades

### Notícias

- [ ] Repository, Service e Controller de Notícia
- [ ] Rota pública para leitura
- [ ] Rota protegida para professor criar e editar notícias

### Relatórios

- [ ] Relatório de presenças por atividade
- [ ] Ficha de frequência por aluno com total de horas
- [ ] Exportação em PDF

### Upload de fotos

- [ ] Integração com serviço externo (S3 ou Cloudinary)
- [ ] Rota de upload vinculada a um projeto ou atividade

### Infraestrutura

- [x] Dockerização do backend e do banco de dados
- [x] Documentação de setup para novos colaboradores

---

Toda a documentação técnica está disponível na pasta `docs`.

## Arquitetura

- ARQUITETURA.md
- BANCO_DE_DADOS.md
- REGRAS_NEGOCIO.md

## Autenticação

- AUTENTICACAO.md

## Módulos

- PROFESSOR.md
- ALUNO.md
- PROJETO.md
- ATIVIDADE.md
- PRESENCA.md
- INSCRICAO.md

## API

- API.md
- PROFESSORES_API.md
- ALUNOS_API.md
- PROJETOS_API.md
- ATIVIDADES_API.md
- INSCRICOES_API.md
- PRESENCAS_API.md

---

# Boas Práticas Utilizadas

- Arquitetura em camadas
- Separação de responsabilidades
- REST API
- Repository Pattern
- Service Layer Pattern
- Middleware de autenticação
- Middleware de autorização
- Exclusão lógica de registros
- Documentação técnica modular

---

# Equipe

Projeto desenvolvido para a disciplina de Engenharia de Software.

**Backend**

- Ramon Albini Vieira

**Projeto Acadêmico**

- Sabine Cassol
- Ramon Albini Vieira
- Eduardo Henrique

---

# Licença

Projeto desenvolvido exclusivamente para fins acadêmicos e educacionais.
