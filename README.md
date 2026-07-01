# Sistema de Gerenciamento de Projetos de Extensão Universitária

<p align="center">

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-orange?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

</p>

---

# Sobre o Projeto

O **Sistema de Gerenciamento de Projetos de Extensão Universitária** é uma plataforma desenvolvida para auxiliar instituições de ensino no gerenciamento de projetos de extensão, centralizando o cadastro de professores, alunos, projetos, atividades e registros de participação.

O sistema busca facilitar o acompanhamento das atividades extensionistas, automatizando processos como inscrições, controle de presença e contabilização da carga horária dos alunos.

O projeto está sendo desenvolvido como parte da disciplina de **Engenharia de Software**, aplicando conceitos de arquitetura de software, desenvolvimento web, modelagem de banco de dados, autenticação e documentação técnica.

---

# Objetivos

O sistema tem como objetivo:

- Gerenciar professores e alunos;
- Gerenciar projetos de extensão;
- Organizar atividades extensionistas;
- Controlar inscrições dos alunos;
- Registrar presença nas atividades;
- Calcular automaticamente as horas de extensão;
- Centralizar as informações dos projetos em uma única plataforma.

---

# Funcionalidades

## Professores

- Cadastro e autenticação
- Gerenciamento de projetos
- Gerenciamento de atividades
- Consulta de alunos inscritos
- Consulta de presenças

## Alunos

- Cadastro e autenticação
- Atualização de perfil
- Inscrição em projetos
- Registro de presença
- Consulta da carga horária
- Visualização das inscrições realizadas

---

# Tecnologias Utilizadas

## Frontend

- React
- JavaScript
- HTML5
- CSS3

## Backend

- Node.js
- Express.js
- Sequelize ORM
- JWT
- bcrypt

## Banco de Dados

- MySQL

## Ferramentas

- Git
- GitHub
- Docker
- Postman
- Swagger (em desenvolvimento)

---

# Arquitetura Geral

O sistema é dividido em duas aplicações principais:

```
Frontend

↓

API REST

↓

Banco de Dados
```

A comunicação entre o frontend e o backend ocorre por meio de uma API REST responsável pelo gerenciamento de todas as regras de negócio da aplicação.

---

# Estrutura do Projeto

```
ProjetoExtensao/

├── frontend/
├── backend/
├── docs/
└── README.md
```

> Atualmente o desenvolvimento ocorre em branches separadas, sendo unificadas posteriormente na branch principal.

---

# Desenvolvimento

O projeto está organizado em diferentes frentes de desenvolvimento.

| Componente | Branch |
|------------|--------|
| Frontend | `dev-eduardo-2` |
| Backend | `dev-ramon` |
| Integração | `dev` |

---

# Executando o Projeto

## Backend

O backend pode ser executado localmente ou utilizando Docker.

A branch de integração (`dev`) contém a configuração necessária para execução utilizando Docker Compose. O Docker Compose permite iniciar todos os serviços da aplicação de forma integrada, simplificando a configuração do ambiente de desenvolvimento. :contentReference[oaicite:0]{index=0}

Consulte a documentação específica do backend para instruções detalhadas.

---

# Documentação

Toda a documentação técnica do backend encontra-se na pasta **docs**.

## Arquitetura

- `docs/arquitetura/ARQUITETURA.md`
- `docs/arquitetura/BANCO_DE_DADOS.md`
- `docs/arquitetura/REGRAS_NEGOCIO.md`

## Autenticação

- `docs/autenticacao/AUTENTICACAO.md`

## Módulos

- `docs/modulos/PROFESSOR.md`
- `docs/modulos/ALUNO.md`
- `docs/modulos/PROJETO.md`
- `docs/modulos/ATIVIDADE.md`
- `docs/modulos/PRESENCA.md`
- `docs/modulos/INSCRICAO.md`

## API REST

- `docs/api/API.md`
- `docs/api/PROFESSORES_API.md`
- `docs/api/ALUNOS_API.md`
- `docs/api/PROJETOS_API.md`
- `docs/api/ATIVIDADES_API.md`
- `docs/api/INSCRICOES_API.md`
- `docs/api/PRESENCAS_API.md`

---

# Equipe

Projeto desenvolvido para a disciplina de **Engenharia de Software**.

**Integrantes**

- Professora Sabine Cassol
- Ramon Albini Vieira
- Eduardo Henrique

---

# Licença

Este projeto possui finalidade exclusivamente acadêmica e foi desenvolvido para fins de estudo e aprendizagem.
