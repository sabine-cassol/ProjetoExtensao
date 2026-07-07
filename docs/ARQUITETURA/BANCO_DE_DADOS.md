# Banco de Dados

## 1. Visão Geral

O Sistema de Extensão Universitária utiliza um banco de dados relacional **MySQL**, acessado por meio do ORM **Sequelize**. O banco foi modelado para representar professores, alunos, projetos de extensão, atividades, inscrições e presenças, preservando a integridade dos dados através de relacionamentos entre as tabelas.

Cada entidade do sistema representa um conceito do domínio da aplicação e possui responsabilidades bem definidas.

---

## 2. Modelo Conceitual

A estrutura geral do banco pode ser representada da seguinte forma:

```text
Professor
    │
    │ 1:N
    ▼
Projeto
    │
    ├──────────────┐
    │              │
    │ 1:N          │ N:N
    ▼              ▼
Atividade         Aluno
    │               │
    │ 1:N           │
    ▼               │
Presença ◄──────────┘
```

---

## 3. Entidade Professor

Representa os professores responsáveis pelos projetos de extensão.

### Finalidade

- Autenticação do professor
- Gerenciamento dos projetos
- Gerenciamento das atividades

### Atributos

| Campo     | Tipo    | Descrição                       |
|-----------|---------|----------------------------------|
| id        | Integer | Identificador único              |
| nome      | String  | Nome completo                    |
| email     | String  | Email institucional               |
| senha     | String  | Senha criptografada com bcrypt   |
| matricula | String  | Matrícula de identificação        |
| curso     | String  | Curso que o professor leciona     |
| ativo     | Boolean | Indica se o cadastro está ativo   |
| createdAt | Date    | Data de criação                   |
| updatedAt | Date    | Última atualização                |

### Relacionamentos

```text
Professor (1)
    │
    ▼
Projeto (N)
```

---

## 4. Entidade Aluno

Representa os estudantes participantes dos projetos.

### Finalidade

- Autenticação
- Inscrição em projetos
- Registro de presença
- Acompanhamento das horas de extensão

### Atributos

| Campo         | Tipo    | Descrição                  |
|---------------|---------|------------------------------|
| id            | Integer | Identificador                |
| nome          | String  | Nome completo                |
| email         | String  | Email                        |
| RA            | String  | Registro acadêmico           |
| senha         | String  | Senha criptografada          |
| horasExtensao | Integer | Total de horas acumuladas    |
| curso         | String  | Curso do aluno                |
| periodo       | String  | Período do aluno              |
| ativo         | Boolean | Situação do cadastro          |
| createdAt     | Date    | Cadastro                      |
| updatedAt     | Date    | Atualização                   |

### Relacionamentos

```text
Projeto (N)
    │
    ▼
Aluno (N)
```

---

## 5. Entidade Projeto

Representa um projeto de extensão desenvolvido pela universidade.

### Finalidade

Agrupar atividades e alunos participantes.

### Atributos

| Campo       | Tipo    | Descrição             |
|-------------|---------|-------------------------|
| id          | Integer | Identificador           |
| titulo      | String  | Título do projeto       |
| descricao   | Text    | Descrição do projeto    |
| ativo       | Boolean | Situação do cadastro    |
| professorId | Integer | Professor responsável   |

### Relacionamentos

```text
Professor (1)
    │
    ▼
Projeto (N)
    │
    ├──────────────┐
    │               │
    ▼               ▼
Atividade (N)     Aluno (N)
```

---

## 6. Entidade Atividade

Cada projeto possui diversas atividades.

### Finalidade

Registrar encontros, eventos ou ações realizadas dentro de um projeto.

### Atributos

| Campo          | Tipo    | Descrição                  |
|----------------|---------|------------------------------|
| id             | Integer | Identificador                |
| titulo         | String  | Título da atividade          |
| descricao      | Text    | Descrição da atividade       |
| dataHoraInicio | Date    | Início da atividade          |
| dataHoraFim    | Date    | Fim da atividade             |
| ativo          | Boolean | Situação do cadastro         |
| projetoId      | Integer | Projeto ao qual pertence     |

### Relacionamentos

```text
Projeto (1)
    │
    ▼
Atividade (N)
    │
    ▼
Presença (N)
```

---

## 7. Entidade Presença

Representa a participação do aluno em determinada atividade.

### Finalidade

Controlar entrada, saída e carga horária.

### Atributos

| Campo               | Tipo     | Descrição                       |
|----------------------|----------|-----------------------------------|
| id                  | Integer  | Identificador                     |
| alunoId             | Integer  | Aluno vinculado (via associação)  |
| atividadeId         | Integer  | Atividade vinculada (via associação) |
| dataHoraCheckIn     | DateTime | Início da presença                |
| localizacaoCheckIn  | String   | Localização no check-in           |
| dataHoraCheckOut    | DateTime | Fim da presença                   |
| localizacaoCheckOut | String   | Localização no check-out          |
| ativo               | Boolean  | Situação do registro              |

> **Nota:** `alunoId` e `atividadeId` são definidos via associações (`hasMany`/`belongsTo`) em `models/index.js`, não diretamente no `init()` do model. As horas realizadas são calculadas dinamicamente a partir do check-in/check-out — não existe uma coluna `horasRealizadas` armazenada.

### Regras

- Somente um check-in aberto por atividade.
- Check-out obrigatório para finalizar a presença.
- Horas calculadas automaticamente.

### Relacionamentos

```text
Atividade (1)
    │
    ▼
Presença (N)

Aluno (1)
    │
    ▼
Presença (N)
```

---

## 8. Entidade Inscrição

Representa a participação de um aluno em um projeto.

Essa tabela resolve o relacionamento **muitos para muitos** entre alunos e projetos.

```text
Aluno (N) ──► Inscrição ◄── (N) Projeto
```

### Atributos

| Campo       | Tipo     | Descrição                      |
|-------------|----------|-----------------------------------|
| alunoId     | Integer  | Aluno inscrito                    |
| projetoId   | Integer  | Projeto associado                 |
| dataCadastro| DateOnly | Data da inscrição (campo próprio, não é o `createdAt` automático) |

> **Nota:** o registro de data usa o campo customizado `dataCadastro`, e não os timestamps padrão do Sequelize.

### Relacionamentos

```text
Aluno (1)
    │
    ▼
Inscrição (N)
    ▲
    │
Projeto (1)
```

---

## 9. Relacionamentos Gerais

| Relação              | Cardinalidade | Implementação                          |
|-----------------------|----------------|-------------------------------------------|
| Professor → Projeto   | 1 : N          | FK `professorId` em Projeto               |
| Projeto → Atividade   | 1 : N          | FK `projetoId` em Atividade               |
| Projeto → Aluno       | N : N          | Tabela `Inscrição`                        |
| Atividade → Presença  | 1 : N          | FK `atividadeId` (via associação)         |
| Aluno → Presença      | 1 : N          | FK `alunoId` (via associação)             |

---

## 10. Regras de Integridade

O banco de dados segue algumas regras para garantir consistência:

- Um professor deve existir antes da criação de um projeto.
- Um projeto deve existir antes da criação de uma atividade.
- Um aluno deve estar inscrito em um projeto para registrar presença em suas atividades.
- Uma presença sempre pertence simultaneamente a um aluno e a uma atividade.
- A exclusão lógica (ativação/desativação) preserva o histórico dos registros.

---

## 11. Fluxo dos Dados

O ciclo de funcionamento do banco ocorre da seguinte maneira:

```text
Professor
    │
    ▼
Cria Projeto
    │
    ▼
Projeto recebe Atividades
    │
    ▼
Aluno realiza Inscrição
    │
    ▼
Aluno faz Check-in
    │
    ▼
Registro de Presença
    │
    ▼
Check-out
    │
    ▼
Horas de Extensão Atualizadas
```

---

## 12. Considerações

A modelagem adotada foi projetada para atender aos requisitos do sistema de extensão universitária, permitindo controlar projetos, atividades, participantes e carga horária de maneira organizada. O uso de relacionamentos bem definidos reduz a redundância de dados e facilita futuras expansões do sistema, como inclusão de notícias, certificados, relatórios e upload de arquivos.
