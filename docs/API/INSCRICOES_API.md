# API - Inscrições

## Visão Geral

Endpoints responsáveis pela inscrição dos alunos nos projetos de extensão.

Base URL

```
/inscricoes
```

---

# Endpoints

| Método | Endpoint | Autenticação | Permissão | Descrição |
|---------|----------|--------------|------------|-----------|
| POST | /projetos/:projetoId/inscricoes | Sim | Aluno | Inscrever em projeto |
| GET | /projetos/:projetoId/alunos | Sim | Usuário autenticado | Listar alunos inscritos |
| GET | /alunos/me/inscricoes | Sim | Aluno | Minhas inscrições |
| GET | /alunos/:alunoId/inscricoes | Sim | Usuário autenticado | Inscrições de um aluno |

---

# POST /projetos/:projetoId/inscricoes

Realiza a inscrição do aluno autenticado.

### Parâmetros

| Nome | Tipo |
|------|------|
| projetoId | Integer |

---

# GET /projetos/:projetoId/alunos

Lista os alunos inscritos em um projeto.

---

# GET /alunos/me/inscricoes

Lista todos os projetos do aluno autenticado.

---

# GET /alunos/:alunoId/inscricoes

Lista todas as inscrições de um aluno específico.

### Respostas

| Código | Descrição |
|---------|-----------|
|200|Consulta realizada|
|401|Não autenticado|
|404|Aluno ou projeto não encontrado|