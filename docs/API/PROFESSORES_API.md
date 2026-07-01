# API - Professores

## Visão Geral

Endpoints responsáveis pelo gerenciamento dos professores.

Base URL

```
/professores
```

---

# Endpoints

| Método | Endpoint | Autenticação | Permissão | Descrição |
|---------|----------|--------------|------------|-----------|
| POST | / | Não | Pública | Cadastrar professor |
| POST | /login | Não | Pública | Login |
| POST | /logout | Não | Pública | Logout |
| GET | /me | Sim | Professor | Perfil autenticado |
| GET | /todos | Sim | Professor | Listar professores |
| GET | /id/:id | Sim | Professor | Buscar professor |
| PUT | /atualizar | Sim | Professor | Atualizar perfil |
| PUT | /ativar/:id | Sim | Professor | Ativar professor |
| DELETE | /desativar/:id | Sim | Professor | Desativar professor |

---

# POST /

Cadastra um professor.

### Exemplo

```json
{
    "nome":"Maria",
    "email":"maria@email.com",
    "senha":"123456"
}
```

---

# POST /login

Autentica um professor.

### Exemplo

```json
{
    "email":"maria@email.com",
    "senha":"123456"
}
```

---

# POST /logout

Remove o cookie JWT.

---

# GET /me

Retorna o perfil do professor autenticado.

---

# GET /todos

Lista todos os professores.

---

# GET /id/:id

Busca um professor pelo ID.

---

# PUT /atualizar

Atualiza os dados do professor autenticado.

---

# PUT /ativar/:id

Reativa um professor.

---

# DELETE /desativar/:id

Realiza exclusão lógica.