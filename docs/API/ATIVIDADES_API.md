# API - Atividades

## Visão Geral

Este documento descreve todos os endpoints responsáveis pelo gerenciamento das atividades dos projetos de extensão.

Base URL:

```
/atividades
```

---

# Endpoints

| Método | Endpoint | Autenticação | Permissão | Descrição |
|---------|----------|--------------|------------|-----------|
| POST | / | Sim | Professor | Criar atividade |
| GET | /todos | Sim | Usuário autenticado | Listar atividades |
| GET | /projeto/:projetoId | Sim | Usuário autenticado | Listar atividades de um projeto |
| GET | /id/:id | Sim | Usuário autenticado | Buscar atividade por ID |
| PUT | /ativar/:id | Sim | Professor | Ativar atividade |
| PUT | /id/:id | Sim | Professor | Atualizar atividade |
| DELETE | /desativar/:id | Sim | Professor | Desativar atividade |

---

# POST /

## Descrição

Cria uma nova atividade para um projeto de extensão.

### Permissão

Professor.

### Body

```json
{
    "titulo":"Oficina de Robótica",
    "descricao":"Introdução à robótica.",
    "data":"2026-07-01",
    "cargaHoraria":4,
    "projetoId":1
}
```

### Respostas

| Código | Descrição |
|---------|-----------|
|201|Atividade criada|
|400|Dados inválidos|
|404|Projeto não encontrado|

---

# GET /todos

Retorna todas as atividades cadastradas.

Necessário estar autenticado.

---

# GET /projeto/:projetoId

Lista todas as atividades pertencentes a um determinado projeto.

Parâmetro:

| Nome | Tipo |
|------|------|
| projetoId | Integer |

---

# GET /id/:id

Busca uma atividade pelo seu identificador.

---

# PUT /id/:id

Atualiza uma atividade existente.

Permissão:

Professor.

---

# PUT /ativar/:id

Reativa uma atividade.

Permissão:

Professor.

---

# DELETE /desativar/:id

Realiza a exclusão lógica de uma atividade.

Permissão:

Professor.