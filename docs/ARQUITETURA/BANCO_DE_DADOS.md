\# Banco de Dados



\## 1. Visão Geral



O Sistema de Extensão Universitária utiliza um banco de dados relacional \*\*MySQL\*\*, acessado por meio do ORM \*\*Sequelize\*\*. O banco foi modelado para representar professores, alunos, projetos de extensão, atividades, inscrições e presenças, preservando a integridade dos dados através de relacionamentos entre as tabelas.



Cada entidade do sistema representa um conceito do domínio da aplicação e possui responsabilidades bem definidas.



\---



\# 2. Modelo Conceitual



A estrutura geral do banco pode ser representada da seguinte forma:



```text

Professor

&#x20;   │

&#x20;   │ 1:N

&#x20;   ▼

Projeto

&#x20;   │

&#x20;   ├──────────────┐

&#x20;   │              │

&#x20;   │1:N           │N:N

&#x20;   ▼              ▼

Atividade      Aluno

&#x20;   │              │

&#x20;   │1:N           │

&#x20;   ▼              │

&#x20;Presença ◄────────┘

```



\---



\# 3. Entidade Professor



Representa os professores responsáveis pelos projetos de extensão.



\## Finalidade



\* autenticação do professor;

\* gerenciamento dos projetos;

\* gerenciamento das atividades.



\## Atributos



| Campo     | Tipo    | Descrição                       |

| --------- | ------- | ------------------------------- |

| id        | Integer | Identificador único             |

| nome      | String  | Nome completo                   |

| email     | String  | Email institucional             |

| senha     | String  | Senha criptografada com bcrypt  |

| ativo     | Boolean | Indica se o cadastro está ativo |

| createdAt | Date    | Data de criação                 |

| updatedAt | Date    | Última atualização              |



\## Relacionamentos



Um professor pode coordenar vários projetos.



```text

Professor (1)

&#x20;     │

&#x20;     │

&#x20;     ▼

Projeto (N)

```



\---



\# 4. Entidade Aluno



Representa os estudantes participantes dos projetos.



\## Finalidade



\* autenticação;

\* inscrição em projetos;

\* registro de presença;

\* acompanhamento das horas de extensão.



\## Atributos



| Campo         | Tipo    | Descrição                 |

| ------------- | ------- | ------------------------- |

| id            | Integer | Identificador             |

| nome          | String  | Nome completo             |

| email         | String  | Email                     |

| RA            | String  | Registro acadêmico        |

| senha         | String  | Senha criptografada       |

| horasExtensao | Decimal | Total de horas acumuladas |

| ativo         | Boolean | Situação do cadastro      |

| createdAt     | Date    | Cadastro                  |

| updatedAt     | Date    | Atualização               |



\---



\# 5. Entidade Projeto



Representa um projeto de extensão desenvolvido pela universidade.



\## Finalidade



Agrupar atividades e alunos participantes.



\## Atributos



| Campo       | Tipo    |

| ----------- | ------- |

| id          | Integer |

| titulo      | String  |

| descricao   | Text    |

| curso       | String  |

| ativo       | Boolean |

| professorId | Integer |



\## Relacionamentos



```text

Professor (1)

&#x20;     │

&#x20;     ▼

Projeto (N)



Projeto (1)

&#x20;     │

&#x20;     ▼

Atividade (N)



Projeto (N)

&#x20;     │

&#x20;     ▼

Aluno (N)

```



\---



\# 6. Entidade Atividade



Cada projeto possui diversas atividades.



\## Finalidade



Registrar encontros, eventos ou ações realizadas dentro de um projeto.



\## Atributos



| Campo        | Tipo    |

| ------------ | ------- |

| id           | Integer |

| titulo       | String  |

| descricao    | Text    |

| data         | Date    |

| cargaHoraria | Decimal |

| ativo        | Boolean |

| projetoId    | Integer |



\## Relacionamentos



```text

Projeto



1



↓



Atividade



1



↓



Presença

```



\---



\# 7. Entidade Presença



Representa a participação do aluno em determinada atividade.



\## Finalidade



Controlar entrada, saída e carga horária.



\## Atributos



| Campo               | Tipo     |

| ------------------- | -------- |

| id                  | Integer  |

| alunoId             | Integer  |

| atividadeId         | Integer  |

| dataHoraCheckIn     | DateTime |

| dataHoraCheckOut    | DateTime |

| horasRealizadas     | Decimal  |

| localizacaoCheckIn  | String   |

| localizacaoCheckOut | String   |



\## Regras



\* somente um check-in aberto por atividade;

\* check-out obrigatório para finalizar a presença;

\* horas calculadas automaticamente.



\---



\# 8. Entidade Inscrição



Representa a participação de um aluno em um projeto.



Essa tabela resolve o relacionamento \*\*muitos para muitos\*\* entre alunos e projetos.



```text

Aluno



N



↓



Inscrição



↑



N



Projeto

```



\## Atributos



| Campo     | Tipo    |

| --------- | ------- |

| alunoId   | Integer |

| projetoId | Integer |

| createdAt | Date    |

| updatedAt | Date    |



\---



\# 9. Relacionamentos



\## Professor → Projeto



Um professor pode coordenar diversos projetos.



Cardinalidade:



```text

1 : N

```



\---



\## Projeto → Atividade



Cada projeto pode possuir diversas atividades.



Cardinalidade:



```text

1 : N

```



\---



\## Projeto → Aluno



Um projeto possui vários alunos inscritos.



Um aluno pode participar de diversos projetos.



Cardinalidade:



```text

N : N

```



A implementação é feita por meio da tabela \*\*Inscrição\*\*.



\---



\## Atividade → Presença



Cada atividade possui vários registros de presença.



Cada presença pertence a apenas uma atividade.



Cardinalidade:



```text

1 : N

```



\---



\## Aluno → Presença



Cada aluno pode registrar diversas presenças.



Cada presença pertence a um único aluno.



Cardinalidade:



```text

1 : N

```



\---



\# 10. Regras de Integridade



O banco de dados segue algumas regras para garantir consistência:



\* Um professor deve existir antes da criação de um projeto.

\* Um projeto deve existir antes da criação de uma atividade.

\* Um aluno deve estar inscrito em um projeto para registrar presença em suas atividades.

\* Uma presença sempre pertence simultaneamente a um aluno e a uma atividade.

\* A exclusão lógica (ativação/desativação) preserva o histórico dos registros.



\---



\# 11. Fluxo dos Dados



O ciclo de funcionamento do banco ocorre da seguinte maneira:



```text

Professor

&#x20;     │

&#x20;     ▼

Cria Projeto

&#x20;     │

&#x20;     ▼

Projeto recebe Atividades

&#x20;     │

&#x20;     ▼

Aluno realiza Inscrição

&#x20;     │

&#x20;     ▼

Aluno faz Check-in

&#x20;     │

&#x20;     ▼

Registro de Presença

&#x20;     │

&#x20;     ▼

Check-out

&#x20;     │

&#x20;     ▼

Horas de Extensão Atualizadas

```



\---



\# 12. Considerações



A modelagem adotada foi projetada para atender aos requisitos do sistema de extensão universitária, permitindo controlar projetos, atividades, participantes e carga horária de maneira organizada. O uso de relacionamentos bem definidos reduz a redundância de dados e facilita futuras expansões do sistema, como inclusão de notícias, certificados, relatórios e upload de arquivos.



