# API REST

## Visão Geral

A API do Sistema de Extensão Universitária foi desenvolvida seguindo o padrão REST, permitindo o gerenciamento de professores, alunos, projetos de extensão, atividades, inscrições e registros de presença.

Todas as requisições e respostas utilizam o formato JSON.

---

# URL Base

```
http://localhost:3000
```

---

# Formato das Requisições

As requisições enviam e recebem dados no formato JSON.

Exemplo:

```json
{
    "nome": "João",
    "email": "joao@email.com"
}
```

---

# Autenticação

O sistema utiliza:

- JWT
- Cookies HTTP Only
- bcrypt

Após o login, um cookie contendo o token JWT é enviado ao navegador.

As rotas protegidas exigem autenticação.

---

# Métodos HTTP

| Método | Finalidade |
|---------|------------|
| GET | Consultar recursos |
| POST | Criar recursos |
| PUT | Atualizar recursos |
| DELETE | Exclusão lógica |

---

# Códigos HTTP

| Código | Significado |
|---------|-------------|
|200|Sucesso|
|201|Criado|
|400|Dados inválidos|
|401|Não autenticado|
|403|Sem permissão|
|404|Recurso não encontrado|
|409|Conflito|
|500|Erro interno|

---

# Organização da API

A documentação completa encontra-se dividida por módulos:

- PROFESSORES_API.md
- ALUNOS_API.md
- PROJETOS_API.md
- ATIVIDADES_API.md
- INSCRICOES_API.md
- PRESENCAS_API.md