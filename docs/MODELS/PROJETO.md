\# Módulo Projeto



\## Visão Geral



O módulo \*\*Projeto\*\* é responsável pelo gerenciamento dos projetos de extensão universitária. Ele representa o núcleo da aplicação, pois concentra as informações necessárias para organizar as ações extensionistas, relacionando professores, alunos e atividades.



Cada projeto é coordenado por um professor e pode possuir diversas atividades e alunos participantes. Além disso, serve como base para o controle de presenças, carga horária e futuras funcionalidades, como geração de relatórios, notícias e certificados.



\---



\# Objetivos



O módulo possui como principais objetivos:



\- Cadastrar projetos de extensão;

\- Atualizar informações dos projetos;

\- Consultar projetos cadastrados;

\- Ativar e desativar projetos;

\- Vincular projetos aos professores responsáveis;

\- Organizar atividades relacionadas ao projeto;

\- Permitir a inscrição de alunos.



\---



\# Estrutura do Módulo



```

Projeto

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

models/projeto\_extensao.js

```



\## Responsabilidade



Representa a entidade \*\*Projeto\*\* no banco de dados.



O Model define:



\- estrutura da tabela;

\- atributos do projeto;

\- tipos de dados;

\- relacionamentos;

\- restrições de integridade.



\## Principais atributos



| Campo | Descrição |

|--------|-----------|

| id | Identificador do projeto |

| titulo | Nome do projeto |

| descricao | Descrição detalhada |

| curso | Curso responsável |

| ativo | Situação do projeto |

| professorId | Professor coordenador |

| createdAt | Data de criação |

| updatedAt | Última atualização |



> \*\*Observação:\*\* Os atributos apresentados devem corresponder exatamente aos definidos no Model Sequelize.



\## Relacionamentos



```

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



Cada projeto pertence a um único professor, pode possuir diversas atividades e aceitar vários alunos inscritos.



\---



\# Repository



Arquivo



```

repositories/projetoRepository.js

```



\## Responsabilidade



Responsável por toda comunicação entre o sistema e o banco de dados referente aos projetos.



As principais operações incluem:



\- cadastrar projeto;

\- buscar projeto por ID;

\- listar todos os projetos;

\- listar projetos por professor;

\- atualizar projeto;

\- ativar projeto;

\- desativar projeto.



\### Fluxo



```

Service



↓



ProjetoRepository



↓



Banco de Dados

```



Nenhuma regra de negócio deve ser implementada nesta camada.



\---



\# Service



Arquivo



```

services/projetoService.js

```



\## Responsabilidade



Implementa todas as regras de negócio relacionadas aos projetos de extensão.



Entre suas responsabilidades estão:



\- validar dados obrigatórios;

\- verificar a existência do professor responsável;

\- validar permissões de acesso;

\- impedir alterações em projetos inexistentes;

\- controlar ativação e desativação;

\- integrar projetos com atividades e inscrições.



A camada Service centraliza toda a lógica relacionada ao funcionamento dos projetos.



\### Fluxo



```

Controller



↓



ProjetoService



↓



Repository

```



\---



\# Controller



Arquivo



```

controllers/projetoController.js

```



\## Responsabilidade



Receber requisições HTTP relacionadas aos projetos e encaminhá-las para a camada de Service.



Suas responsabilidades incluem:



\- receber parâmetros da requisição;

\- validar dados básicos;

\- chamar os métodos do Service;

\- retornar respostas HTTP adequadas.



O Controller não realiza acesso direto ao banco de dados.



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

routes/projetoRoutes.js

```



\## Responsabilidade



Define todos os endpoints responsáveis pelo gerenciamento dos projetos de extensão.



As principais operações disponibilizadas são:



| Método | Finalidade |

|---------|------------|

| POST | Criar projeto |

| GET | Listar projetos |

| GET | Buscar projeto por ID |

| GET | Buscar projetos de um professor |

| PUT | Atualizar projeto |

| PUT | Ativar projeto |

| DELETE | Desativar projeto |



Cada rota encaminha a requisição para o método correspondente do Controller.



\---



\# Fluxo Completo



Toda requisição relacionada aos projetos percorre as seguintes camadas:



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



\- Apenas professores autenticados podem criar projetos.

\- Todo projeto deve possuir um professor responsável.

\- Não é permitido atualizar projetos inexistentes.

\- Projetos desativados deixam de ser disponibilizados para novas inscrições.

\- Um projeto pode possuir diversas atividades.

\- Um projeto pode possuir diversos alunos inscritos.

\- A exclusão é realizada de forma lógica através da alteração do status do projeto.



\---



\# Segurança



O módulo utiliza os seguintes mecanismos de segurança:



\- autenticação via JWT;

\- autorização baseada no perfil do usuário;

\- validação das permissões do professor;

\- proteção das rotas administrativas.



Esses mecanismos garantem que apenas usuários autorizados possam realizar alterações nos projetos.



\---



\# Dependências



O módulo Projeto possui integração direta com diversos componentes do sistema.



```

Projeto



├── Professor



├── Atividade



├── Inscrição



├── Aluno



├── JWT



└── Banco de Dados

```



Cada um desses módulos participa do gerenciamento completo dos projetos de extensão.



\---



\# Responsabilidades do Módulo



| Camada | Responsabilidade |

|---------|------------------|

| Model | Representar a entidade Projeto |

| Repository | Persistência dos dados |

| Service | Implementação das regras de negócio |

| Controller | Tratamento das requisições HTTP |

| Routes | Definição dos endpoints da API |



\---



\# Integração com Outros Módulos



O módulo Projeto mantém relacionamento com diversos componentes do sistema.



| Módulo | Finalidade |

|---------|------------|

| Professor | Responsável pelo projeto |

| Atividade | Organização das atividades |

| Aluno | Participantes do projeto |

| Inscrição | Controle das inscrições |

| Presença | Controle da participação nas atividades |



Essa integração permite que o projeto funcione como o elemento central do sistema.



\---



\# Melhorias Futuras



As seguintes funcionalidades podem ser incorporadas futuramente ao módulo:



\- upload de imagens do projeto;

\- cronograma detalhado;

\- notícias vinculadas ao projeto;

\- certificados automáticos;

\- integração com Google Forms;

\- geração de relatórios em PDF;

\- painel de estatísticas do projeto.



\---



\# Considerações Finais



O módulo \*\*Projeto\*\* representa o núcleo do Sistema de Extensão Universitária. É por meio dele que professores organizam suas ações extensionistas, alunos participam das atividades e o sistema controla toda a estrutura dos projetos.



Sua implementação segue a arquitetura em camadas adotada pelo sistema, separando responsabilidades entre Model, Repository, Service, Controller e Routes. Essa organização facilita a manutenção, promove maior reutilização de código e torna o sistema preparado para futuras expansões.

