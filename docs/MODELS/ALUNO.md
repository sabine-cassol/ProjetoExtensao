\# Módulo Aluno



\## Visão Geral



O módulo \*\*Aluno\*\* é responsável pelo gerenciamento dos estudantes participantes dos projetos de extensão universitária. Além da autenticação, este módulo controla as inscrições em projetos, o registro de presenças e o acompanhamento da carga horária de extensão realizada por cada aluno.



Por meio deste módulo, o aluno consegue acessar o sistema, participar das atividades e acompanhar sua evolução dentro dos projetos de extensão.



\---



\# Objetivos



O módulo possui como principais objetivos:



\- Realizar cadastro de alunos;

\- Autenticar usuários;

\- Atualizar informações cadastrais;

\- Consultar dados do aluno;

\- Ativar e desativar registros;

\- Permitir participação em projetos de extensão;

\- Controlar horas de extensão realizadas.



\---



\# Estrutura do Módulo



```

Aluno

│

├── Model

├── Repository

├── Service

├── Controller

└── Routes

```



Cada camada possui uma responsabilidade específica dentro da arquitetura do sistema.



\---



\# Model



Arquivo:



```

models/aluno.js

```



\## Responsabilidade



Representa a entidade \*\*Aluno\*\* no banco de dados.



O Model define:



\- estrutura da tabela;

\- atributos do aluno;

\- tipos de dados;

\- relacionamentos com outras entidades;

\- restrições de integridade.



\## Principais atributos



| Campo | Descrição |

|--------|-----------|

| id | Identificador do aluno |

| nome | Nome completo |

| email | Email institucional |

| ra | Registro Acadêmico |

| senha | Senha criptografada |

| horasExtensao | Total de horas de extensão |

| ativo | Situação do cadastro |

| createdAt | Data de criação |

| updatedAt | Última atualização |



> \*\*Observação:\*\* Os nomes apresentados devem refletir exatamente os atributos definidos no Model Sequelize.



\## Relacionamentos



```

Aluno (N)

&#x20;   │

&#x20;   │

&#x20;   ▼

Projeto (N)



Aluno (1)

&#x20;   │

&#x20;   ▼

Presença (N)

```



Um aluno pode participar de diversos projetos e registrar diversas presenças.



\---



\# Repository



Arquivo



```

repositories/alunoRepository.js

```



\## Responsabilidade



A camada Repository é responsável pela persistência dos dados relacionados aos alunos.



Todas as operações de acesso ao banco são centralizadas nesta camada.



As principais operações realizadas incluem:



\- cadastrar aluno;

\- buscar aluno por ID;

\- buscar aluno por RA;

\- buscar aluno por email;

\- listar alunos;

\- atualizar cadastro;

\- ativar aluno;

\- desativar aluno;

\- atualizar carga horária.



\### Fluxo



```

Service



↓



AlunoRepository



↓



Banco de Dados

```



Nenhuma regra de negócio deve ser implementada nesta camada.



\---



\# Service



Arquivo



```

services/alunoService.js

```



\## Responsabilidade



A camada Service implementa toda a lógica de negócio relacionada aos alunos.



Entre suas responsabilidades estão:



\- validar dados obrigatórios;

\- verificar duplicidade de email ou RA;

\- criptografar senha utilizando bcrypt;

\- autenticar usuários;

\- gerar token JWT;

\- controlar horas de extensão;

\- validar permissões do aluno;

\- impedir login de usuários desativados.



Além disso, esta camada realiza integrações com os módulos de Presença e Inscrição para manter a consistência dos dados.



\### Fluxo



```

Controller



↓



AlunoService



↓



Repository

```



Toda regra de negócio deve permanecer centralizada nesta camada.



\---



\# Controller



Arquivo



```

controllers/alunoController.js

```



\## Responsabilidade



Receber requisições HTTP relacionadas aos alunos e encaminhá-las para a camada de Service.



Suas responsabilidades incluem:



\- receber parâmetros da requisição;

\- validar dados básicos;

\- chamar os métodos do Service;

\- retornar respostas HTTP adequadas.



O Controller não realiza consultas diretamente ao banco de dados.



\### Fluxo



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

routes/alunoRoutes.js

```



\## Responsabilidade



Define todos os endpoints relacionados ao gerenciamento dos alunos.



As rotas encaminham as requisições para o Controller correspondente.



As principais operações disponibilizadas são:



| Método | Finalidade |

|---------|------------|

| POST | Cadastro de aluno |

| POST | Login |

| POST | Logout |

| GET | Buscar perfil |

| GET | Buscar aluno por ID |

| GET | Buscar aluno por RA |

| GET | Listar alunos |

| PUT | Atualizar cadastro |

| PUT | Ativar aluno |

| DELETE | Desativar aluno |



\---



\# Fluxo Completo



Toda requisição relacionada ao módulo Aluno percorre as seguintes camadas:



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



Resposta HTTP

```



\---



\# Regras de Negócio



As principais regras implementadas pelo módulo são:



\- O email deve ser único.

\- O RA deve ser único para cada aluno.

\- A senha é armazenada utilizando hash bcrypt.

\- Apenas alunos ativos podem realizar login.

\- O aluno deve estar autenticado para acessar recursos protegidos.

\- As horas de extensão são atualizadas automaticamente após o check-out de uma atividade.

\- Um aluno pode participar de vários projetos simultaneamente.

\- O aluno somente pode registrar presença em atividades de projetos nos quais esteja inscrito.



\---



\# Segurança



O módulo utiliza os seguintes mecanismos de segurança:



\- autenticação por JWT;

\- armazenamento do token em cookie HTTP Only;

\- criptografia de senhas utilizando bcrypt;

\- middleware de autenticação;

\- middleware de autorização.



Esses mecanismos garantem maior segurança na autenticação e no controle de acesso às funcionalidades do sistema.



\---



\# Dependências



O módulo Aluno possui integração direta com diversos componentes do sistema.



```

Aluno



├── Projeto



├── Presença



├── Inscrição



├── JWT



└── Banco de Dados

```



Cada um desses módulos participa do ciclo de vida do aluno dentro da plataforma.



\---



\# Responsabilidades do Módulo



| Camada | Responsabilidade |

|---------|------------------|

| Model | Representar a entidade Aluno |

| Repository | Persistência dos dados |

| Service | Implementação das regras de negócio |

| Controller | Tratamento das requisições HTTP |

| Routes | Definição dos endpoints da API |



\---



\# Integração com Outros Módulos



O módulo Aluno mantém relacionamento com outros módulos da aplicação.



| Módulo | Finalidade |

|---------|------------|

| Projeto | Participação em projetos de extensão |

| Inscrição | Controle das inscrições do aluno |

| Presença | Registro de check-in e check-out |

| Atividade | Participação nas atividades |

| Autenticação | Login e autorização |



Essa integração garante que todas as informações do aluno permaneçam consistentes durante a utilização do sistema.



\---



\# Melhorias Futuras



As seguintes funcionalidades podem ser incorporadas futuramente ao módulo:



\- recuperação de senha;

\- alteração de senha;

\- upload de foto do aluno;

\- emissão de certificado de extensão;

\- histórico completo de atividades realizadas;

\- exportação das horas de extensão em PDF;

\- notificações sobre novas atividades e projetos.



\---



\# Considerações Finais



O módulo \*\*Aluno\*\* representa o principal perfil de usuário participante do Sistema de Extensão Universitária. Sua implementação concentra funcionalidades relacionadas ao acesso, participação em projetos, controle de presença e acompanhamento das horas de extensão.



A separação entre Model, Repository, Service, Controller e Routes proporciona maior organização do código, facilita a manutenção e permite que novas funcionalidades sejam adicionadas com menor impacto sobre os demais componentes da aplicação.

