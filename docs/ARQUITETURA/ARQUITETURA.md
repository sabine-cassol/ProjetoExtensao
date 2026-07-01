\# Arquitetura do Sistema



\## 1. Visão Geral



O Sistema de Extensão Universitária é uma aplicação web desenvolvida para gerenciar projetos de extensão, alunos, professores, atividades e o controle de presença dos participantes.



O sistema segue o padrão de arquitetura em camadas (\*Layered Architecture\*), separando responsabilidades entre acesso à API, regras de negócio e persistência de dados. Essa divisão torna o código mais organizado, reutilizável e fácil de manter.



A comunicação entre o cliente e o servidor ocorre por meio de uma API REST desenvolvida em Node.js com Express. Os dados são persistidos em um banco MySQL utilizando o Sequelize como ORM.



\---



\# 2. Tecnologias Utilizadas



| Tecnologia   | Finalidade                            |

| ------------ | ------------------------------------- |

| Node.js      | Ambiente de execução JavaScript       |

| Express      | Framework para construção da API REST |

| Sequelize    | ORM para comunicação com o banco      |

| MySQL        | Banco de dados relacional             |

| JWT          | Autenticação dos usuários             |

| bcrypt       | Criptografia de senhas                |

| Docker       | Containerização do backend e banco    |

| React + Vite | Interface web do sistema              |



\---



\# 3. Arquitetura em Camadas



O backend foi organizado utilizando uma arquitetura em camadas (\*Layered Architecture\*). Cada camada possui uma responsabilidade específica, reduzindo o acoplamento entre os componentes do sistema.



```text

&#x20;                Cliente (Frontend)



&#x20;                       │

&#x20;                       ▼

&#x20;                Express Router

&#x20;                       │

&#x20;                       ▼

&#x20;                 Controller

&#x20;                       │

&#x20;                       ▼

&#x20;                  Service

&#x20;                       │

&#x20;                       ▼

&#x20;                Repository

&#x20;                       │

&#x20;                       ▼

&#x20;              Sequelize Models

&#x20;                       │

&#x20;                       ▼

&#x20;                    MySQL

```



Cada requisição percorre esse fluxo até que a resposta seja enviada ao cliente.



\---



\# 4. Estrutura de Pastas



Uma organização semelhante à utilizada no projeto é apresentada a seguir.



```text

src/

│

├── config/

│

├── controllers/

│

├── services/

│

├── repositories/

│

├── models/

│

├── routes/

│

├── middlewares/

│

├── utils/

│

└── app.js

```



Cada diretório possui uma função específica dentro da arquitetura.



\---



\# 5. Camadas da Aplicação



\## 5.1 Routes



As rotas representam a porta de entrada da API.



Sua responsabilidade é:



\* definir as URLs;

\* identificar o método HTTP;

\* aplicar middlewares;

\* encaminhar a requisição ao controller.



Exemplo:



```

POST /professores/login

GET /projetos

PUT /atividades/:id

```



As rotas não contêm regras de negócio.



\---



\## 5.2 Controllers



Os Controllers fazem a comunicação entre o cliente e os serviços da aplicação.



Suas responsabilidades incluem:



\* receber a requisição;

\* validar dados básicos;

\* chamar o Service correspondente;

\* retornar respostas HTTP.



O Controller não deve acessar diretamente o banco de dados.



Fluxo:



```

Request



↓



Controller



↓



Service

```



\---



\## 5.3 Services



A camada de Service concentra todas as regras de negócio do sistema.



Exemplos:



\* impedir check-in duplicado;

\* validar login;

\* calcular horas de extensão;

\* verificar permissões;

\* impedir inscrições inválidas.



É a camada mais importante da aplicação.



\---



\## 5.4 Repository



O Repository é responsável exclusivamente pela comunicação com o banco.



Suas funções incluem:



\* buscar registros;

\* criar registros;

\* atualizar registros;

\* remover registros.



Toda consulta ao banco passa pelo Repository.



\---



\## 5.5 Models



Os Models representam as entidades do banco de dados utilizando o Sequelize.



Cada model define:



\* atributos;

\* tipos de dados;

\* relacionamentos;

\* restrições.



Exemplo:



\* Professor

\* Aluno

\* Projeto

\* Atividade

\* Presença

\* Inscrição



\---



\# 6. Fluxo de uma Requisição



Quando um usuário realiza uma operação, a requisição percorre várias camadas.



Exemplo: cadastro de projeto.



```text

Frontend



↓



POST /projetos



↓



Route



↓



Controller



↓



Service



↓



Repository



↓



Model



↓



MySQL



↓



Repository



↓



Service



↓



Controller



↓



Resposta HTTP

```



Essa separação evita que regras de negócio fiquem espalhadas pelo sistema.



\---



\# 7. Autenticação



O sistema utiliza autenticação baseada em JSON Web Token (JWT).



O processo funciona da seguinte forma:



1\. o usuário envia email e senha;

2\. a senha é validada utilizando bcrypt;

3\. um token JWT é gerado;

4\. o token é armazenado em um cookie HTTP Only;

5\. as rotas protegidas verificam a validade do token por meio de middleware.



Essa abordagem aumenta a segurança da aplicação ao impedir o acesso direto ao token por scripts executados no navegador.



\---



\# 8. Middlewares



Os middlewares executam funções antes que a requisição alcance o Controller.



No projeto, eles são utilizados para:



\* autenticação;

\* autorização;

\* validação de usuários;

\* proteção das rotas.



Fluxo:



```text

Request



↓



Middleware



↓



Controller

```



\---



\# 9. Banco de Dados



A persistência é realizada em um banco MySQL utilizando o Sequelize como ORM.



As principais entidades são:



```text

Professor

│

├── Projeto

│        │

│        ├── Atividade

│        │

│        └── Inscrição

│

Aluno

│

├── Inscrição

│

└── Presença

```



Os relacionamentos completos serão detalhados na documentação específica do banco de dados.



\---



\# 10. Organização do Código



A separação em camadas proporciona diversos benefícios:



\* baixo acoplamento;

\* alta coesão;

\* facilidade para manutenção;

\* reutilização de código;

\* facilidade para testes;

\* maior organização;

\* melhor escalabilidade.



Cada classe possui uma única responsabilidade, seguindo princípios da orientação a objetos e boas práticas de desenvolvimento.



\---



\## 11. Benefícios da Arquitetura Adotada



A arquitetura escolhida torna o sistema mais simples de evoluir. Novas funcionalidades podem ser adicionadas sem alterar significativamente as demais camadas, reduzindo o risco de introduzir erros e facilitando o trabalho em equipe.



Além disso, a divisão entre rotas, controllers, services e repositories melhora a legibilidade do código e favorece a manutenção a longo prazo, especialmente em projetos acadêmicos que tendem a crescer durante o desenvolvimento.





