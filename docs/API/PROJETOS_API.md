# API - Projetos

## Visão Geral

Este documento descreve todos os endpoints responsáveis pelo gerenciamento dos projetos de extensão.

Base URL:

```
/projetos
```

---

# Endpoints

| Método | Endpoint | Autenticação | Permissão | Descrição |
|---------|----------|--------------|------------|-----------|
| POST | / | Sim | Professor | Criar projeto |
| GET | /todos | Sim | Usuário autenticado | Listar todos os projetos |
| GET | /professor/:professorId | Sim | Usuário autenticado | Listar projetos de um professor |
| GET | /id/:id | Sim | Usuário autenticado | Buscar projeto por ID |
| PUT | /id/:id | Sim | Professor | Atualizar projeto |
| PUT | /ativar/:id | Sim | Professor | Ativar projeto |
| DELETE | /desativar/:id | Sim | Professor | Desativar projeto |

---

# POST /

Cria um novo projeto de extensão.

### Permissão

Professor.

### Exemplo

```json
{
    "titulo":"Projeto de Extensão",
    "descricao":"Descrição do projeto",
    "curso":"Engenharia de Software"
}
```

### Respostas

| Código | Descrição |
|---------|-----------|
|201|Projeto criado|
|400|Dados inválidos|
|401|Não autenticado|

---

# GET /todos

Lista todos os projetos cadastrados.

---

# GET /professor/:professorId

Lista todos os projetos pertencentes a um professor.

Parâmetro

| Nome | Tipo |
|------|------|
| professorId | Integer |

---

# GET /id/:id

Busca um projeto específico.

---

# PUT /id/:id

Atualiza um projeto.

Permissão:

Professor.

---

# PUT /ativar/:id

Ativa novamente um projeto.

---

# DELETE /desativar/:id

Realiza exclusão lógica do projeto.