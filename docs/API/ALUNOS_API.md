# API - Alunos

## Visão Geral

Este documento descreve todos os endpoints relacionados ao gerenciamento de alunos do Sistema de Extensão Universitária.

Base URL:

```
/alunos
```

---

# Endpoints

| Método | Endpoint | Autenticação | Permissão | Descrição |
|---------|----------|--------------|------------|-----------|
| POST | / | Não | Pública | Cadastrar aluno |
| POST | /login | Não | Pública | Realizar login |
| POST | /logout | Não | Pública | Realizar logout |
| GET | /me | Sim | Aluno | Buscar perfil do aluno autenticado |
| GET | /todos | Sim | Professor | Listar todos os alunos |
| GET | /ra/:ra | Sim | Aluno | Buscar aluno pelo RA |
| GET | /id/:id | Sim | Professor | Buscar aluno pelo ID |
| PUT | /atualizar | Sim | Aluno | Atualizar perfil |
| PUT | /ativar/:id | Sim | Professor | Ativar aluno |
| DELETE | /desativar/:id | Sim | Professor | Desativar aluno |

---

# POST /

## Descrição

Realiza o cadastro de um novo aluno.

### Autenticação

Não necessária.

### Body

```json
{
    "nome": "João da Silva",
    "email": "joao@email.com",
    "senha": "123456",
    "ra": "123456"
}
```

### Respostas

| Código | Descrição |
|---------|-----------|
|201|Aluno cadastrado|
|400|Dados inválidos|
|409|Aluno já cadastrado|

---

# POST /login

Realiza a autenticação do aluno.

### Body

```json
{
    "email":"joao@email.com",
    "senha":"123456"
}
```

### Resposta

```json
{
    "message":"Login realizado com sucesso."
}
```

Após o login é criado um cookie HTTP Only contendo o JWT.

---

# POST /logout

Remove o cookie de autenticação.

---

# GET /me

Retorna os dados do aluno autenticado.

---

# GET /todos

Lista todos os alunos cadastrados.

Permissão:

Professor.

---

# GET /ra/:ra

Busca um aluno através do RA.

Permissão:

Aluno autenticado.

---

# GET /id/:id

Busca um aluno pelo identificador.

Permissão:

Professor.

---

# PUT /atualizar

Atualiza os dados do aluno autenticado.

---

# PUT /ativar/:id

Reativa um aluno previamente desativado.

Permissão:

Professor.

---

# DELETE /desativar/:id

Realiza a exclusão lógica de um aluno.

Permissão:

Professor.