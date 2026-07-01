# API - Presenças

## Visão Geral

Endpoints responsáveis pelo registro de frequência dos alunos nas atividades.

Base URL

```
/presencas
```

---

# Endpoints

| Método | Endpoint | Autenticação | Permissão | Descrição |
|---------|----------|--------------|------------|-----------|
| POST | /checkin | Sim | Aluno | Registrar check-in |
| PUT | /checkout | Sim | Aluno | Registrar check-out |
| GET | /aluno/:id | Sim | Professor | Presenças de um aluno |
| GET | /me | Sim | Aluno | Minhas presenças |
| GET | /me/horas/:projetoId | Sim | Aluno | Horas de extensão por projeto |

---

# POST /checkin

Registra o início da participação do aluno em uma atividade.

### Exemplo

```json
{
    "atividadeId":1,
    "localizacao":"-25.45,-49.27"
}
```

---

# PUT /checkout

Finaliza a presença do aluno e calcula automaticamente sua carga horária.

### Exemplo

```json
{
    "atividadeId":1,
    "localizacao":"-25.45,-49.27"
}
```

---

# GET /aluno/:id

Retorna todas as presenças de um aluno.

Permissão:

Professor.

---

# GET /me

Retorna o histórico de presenças do aluno autenticado.

---

# GET /me/horas/:projetoId

Retorna a quantidade de horas de extensão acumuladas pelo aluno em um projeto específico.

### Parâmetros

| Nome | Tipo |
|------|------|
| projetoId | Integer |

---

### Respostas

| Código | Descrição |
|---------|-----------|
|200|Consulta realizada|
|401|Não autenticado|
|404|Aluno ou projeto não encontrado|