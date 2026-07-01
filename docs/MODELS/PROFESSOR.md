\# Módulo Professor



\## Visão Geral



O módulo \*\*Professor\*\* é responsável pelo gerenciamento dos usuários do tipo professor dentro do Sistema de Extensão Universitária.



Além da autenticação, este módulo fornece as funcionalidades necessárias para administração dos projetos de extensão, permitindo que professores realizem o gerenciamento dos projetos e das atividades sob sua responsabilidade.



\---



\# Objetivos



O módulo possui como principais objetivos:



\- Realizar cadastro de professores;

\- Autenticar usuários;

\- Atualizar informações cadastrais;

\- Consultar professores;

\- Ativar e desativar registros;

\- Servir como entidade responsável pelos projetos de extensão.



\---



\# Estrutura do Módulo



```

Professor

│

├── Model

├── Repository

├── Service

├── Controller

└── Routes

```



Cada camada possui uma responsabilidade específica.



\---



\# Model



Arquivo:



```

models/professor.js

```



\## Responsabilidade



Representa a entidade \*\*Professor\*\* dentro do banco de dados.



O Model define:



\- estrutura da tabela;

\- tipos dos atributos;

\- restrições;

\- relacionamentos com outras entidades.



\## Principais atributos



| Campo | Descrição |

|--------|-----------|

| id | Identificador do professor |

| nome | Nome completo |

| email | Email institucional |

| senha | Senha criptografada |

| ativo | Situação do cadastro |

| createdAt | Data de criação |

| updatedAt | Data da última atualização |



\## Relacionamentos



```

Professor (1)



↓



Projeto (N)

```



Um professor pode coordenar diversos projetos de extensão.



\---



\# Repository



Arquivo



```

repositories/professorRepository.js

```



\## Responsabilidade



A camada Repository é responsável exclusivamente pela comunicação com o banco de dados.



Nenhuma regra de negócio deve ser implementada nesta camada.



As operações normalmente implementadas incluem:



\- criar professor;

\- buscar por ID;

\- buscar por email;

\- listar professores;

\- atualizar cadastro;

\- ativar professor;

\- desativar professor.



\### Fluxo



```

Service



↓



ProfessorRepository



↓



Banco de Dados

```



\---



\# Service



Arquivo



```

services/professorService.js

```



\## Responsabilidade



Implementa todas as regras de negócio relacionadas aos professores.



Entre elas:



\- validar dados obrigatórios;

\- verificar email duplicado;

\- criptografar senha;

\- autenticar usuário;

\- gerar token JWT;

\- validar permissões;

\- impedir login de usuário desativado.



\### Fluxo



```

Controller



↓



ProfessorService



↓



Repository

```



A camada Service concentra toda a lógica da aplicação.



\---



\# Controller



Arquivo



```

controllers/professorController.js

```



\## Responsabilidade



Receber as requisições HTTP e retornar respostas ao cliente.



O Controller possui como funções:



\- receber parâmetros da requisição;

\- validar informações básicas;

\- chamar o Service correspondente;

\- devolver códigos HTTP apropriados.



O Controller não realiza acesso direto ao banco de dados.



Fluxo:



```

Request



↓



Controller



↓



Service



↓



Response

```



\---



\# Routes



Arquivo



```

routes/professorRoutes.js

```



\## Responsabilidade



Define todos os endpoints relacionados aos professores.



Cada rota aponta para um método do Controller correspondente.



Exemplo de organização:



| Método | Finalidade |

|---------|------------|

| POST | Cadastro |

| POST | Login |

| POST | Logout |

| GET | Buscar professor |

| GET | Listar professores |

| PUT | Atualizar professor |

| PUT | Ativar professor |

| DELETE | Desativar professor |



\---



\# Fluxo Completo



Uma requisição percorre todas as camadas do sistema.



```

Cliente



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



Resposta

```



\---



\# Regras de Negócio



As principais regras implementadas pelo módulo são:



\- o email deve ser único;

\- a senha é armazenada utilizando bcrypt;

\- apenas professores autenticados podem acessar recursos protegidos;

\- usuários desativados não podem realizar login;

\- somente professores podem criar projetos.



\---



\# Segurança



O módulo utiliza os seguintes mecanismos de segurança:



\- autenticação por JWT;

\- armazenamento do token em cookie HTTP Only;

\- hash de senha utilizando bcrypt;

\- middleware de autenticação;

\- middleware de autorização.



\---



\# Dependências



O módulo Professor possui integração direta com:



\- Projeto

\- Autenticação

\- JWT

\- Banco de Dados



```

Professor



├── Projeto



├── JWT



└── Banco

```



\---



\# Responsabilidades do Módulo



| Camada | Responsabilidade |

|---------|------------------|

| Model | Representar a tabela Professor |

| Repository | Comunicação com o banco |

| Service | Regras de negócio |

| Controller | Requisições HTTP |

| Routes | Endpoints da API |



\---



\# Melhorias Futuras



As seguintes melhorias podem ser incorporadas futuramente ao módulo:



\- recuperação de senha;

\- alteração de senha;

\- autenticação em dois fatores;

\- upload de foto de perfil;

\- registro de auditoria das ações realizadas pelos professores.



\---



\# Considerações Finais



O módulo Professor constitui um dos principais componentes do sistema, sendo responsável pela administração dos projetos de extensão. Sua implementação segue a arquitetura em camadas adotada pelo projeto, garantindo separação de responsabilidades, facilidade de manutenção e escalabilidade.

