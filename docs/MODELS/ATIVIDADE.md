\# Módulo Atividade



\## Visão Geral



O módulo \*\*Atividade\*\* é responsável pelo gerenciamento das atividades vinculadas aos projetos de extensão universitária. Cada atividade representa uma ação, evento, oficina, palestra ou encontro realizado dentro de um projeto.



Além de organizar as ações extensionistas, este módulo serve como base para o controle de presença dos alunos, cálculo da carga horária e emissão de relatórios.



Toda atividade pertence obrigatoriamente a um projeto de extensão, estabelecendo uma relação direta entre as ações desenvolvidas e o projeto responsável.



\---



\# Objetivos



O módulo possui como principais objetivos:



\- Cadastrar atividades;

\- Atualizar informações das atividades;

\- Consultar atividades;

\- Ativar e desativar atividades;

\- Vincular atividades a um projeto;

\- Disponibilizar atividades para registro de presença;

\- Registrar a carga horária prevista de cada atividade.



\---



\# Estrutura do Módulo



```

Atividade

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

models/atividade.js

```



\## Responsabilidade



Representa a entidade \*\*Atividade\*\* dentro do banco de dados.



O Model define:



\- estrutura da tabela;

\- atributos da atividade;

\- tipos de dados;

\- relacionamentos;

\- restrições de integridade.



\## Principais atributos



| Campo | Descrição |

|--------|-----------|

| id | Identificador da atividade |

| titulo | Nome da atividade |

| descricao | Descrição detalhada |

| data | Data de realização |

| cargaHoraria | Carga horária prevista |

| ativo | Situação da atividade |

| projetoId | Projeto ao qual pertence |

| createdAt | Data de criação |

| updatedAt | Última atualização |



> \*\*Observação:\*\* Os atributos apresentados devem refletir exatamente os definidos no Model Sequelize.



\## Relacionamentos



```

Projeto (1)

&#x20;     │

&#x20;     ▼

Atividade (N)



Atividade (1)

&#x20;     │

&#x20;     ▼

Presença (N)

```



Cada atividade pertence a um único projeto e pode possuir diversos registros de presença.



\---



\# Repository



Arquivo



```

repositories/atividadeRepository.js

```



\## Responsabilidade



Responsável pela comunicação entre a aplicação e o banco de dados referente às atividades.



As principais operações realizadas incluem:



\- cadastrar atividade;

\- buscar atividade por ID;

\- listar atividades;

\- listar atividades por projeto;

\- atualizar atividade;

\- ativar atividade;

\- desativar atividade.



\### Fluxo



```

Service



↓



AtividadeRepository



↓



Banco de Dados

```



Esta camada não implementa regras de negócio, sendo responsável apenas pela persistência dos dados.



\---



\# Service



Arquivo



```

services/atividadeService.js

```



\## Responsabilidade



Implementa toda a lógica de negócio relacionada às atividades.



Entre suas responsabilidades estão:



\- validar dados obrigatórios;

\- verificar se o projeto informado existe;

\- impedir cadastro de atividades sem projeto;

\- validar permissões do professor responsável;

\- controlar ativação e desativação;

\- impedir alterações em atividades inexistentes.



Além disso, esta camada realiza integrações com os módulos de Projeto e Presença.



\### Fluxo



```

Controller



↓



AtividadeService



↓



Repository

```



Toda regra de negócio referente às atividades permanece concentrada nesta camada.



\---



\# Controller



Arquivo



```

controllers/atividadeController.js

```



\## Responsabilidade



Receber requisições HTTP relacionadas às atividades e encaminhá-las para a camada de Service.



Suas responsabilidades incluem:



\- receber parâmetros da requisição;

\- validar informações básicas;

\- chamar os métodos do Service;

\- retornar respostas HTTP apropriadas.



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

routes/atividadeRoutes.js

```



\## Responsabilidade



Define todos os endpoints responsáveis pelo gerenciamento das atividades.



As principais operações disponibilizadas são:



| Método | Finalidade |

|---------|------------|

| POST | Criar atividade |

| GET | Listar atividades |

| GET | Buscar atividade por ID |

| GET | Buscar atividades por projeto |

| PUT | Atualizar atividade |

| PUT | Ativar atividade |

| DELETE | Desativar atividade |



Cada rota encaminha a requisição para o método correspondente do Controller.



\---



\# Fluxo Completo



Toda requisição relacionada às atividades percorre as seguintes camadas:



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



\- Toda atividade deve estar vinculada a um projeto existente.

\- Apenas professores autenticados podem cadastrar ou alterar atividades.

\- Não é permitido cadastrar atividades para projetos inexistentes.

\- Atividades desativadas não devem aceitar novos registros de presença.

\- Cada atividade possui apenas um projeto responsável.

\- Uma atividade pode possuir diversos registros de presença.

\- A exclusão é realizada de forma lógica por meio da alteração do status da atividade.



\---



\# Segurança



O módulo utiliza os seguintes mecanismos de segurança:



\- autenticação por JWT;

\- autorização baseada no perfil do usuário;

\- validação das permissões do professor;

\- proteção das rotas administrativas.



Esses mecanismos garantem que apenas usuários autorizados possam modificar as atividades cadastradas.



\---



\# Dependências



O módulo Atividade possui integração direta com diversos componentes do sistema.



```

Atividade



├── Projeto



├── Presença



├── Professor



├── JWT



└── Banco de Dados

```



Esses módulos trabalham em conjunto para controlar toda a execução das atividades de extensão.



\---



\# Responsabilidades do Módulo



| Camada | Responsabilidade |

|---------|------------------|

| Model | Representar a entidade Atividade |

| Repository | Persistência dos dados |

| Service | Implementação das regras de negócio |

| Controller | Tratamento das requisições HTTP |

| Routes | Definição dos endpoints da API |



\---



\# Integração com Outros Módulos



O módulo Atividade possui relacionamento direto com outros módulos do sistema.



| Módulo | Finalidade |

|---------|------------|

| Projeto | Organização das atividades |

| Professor | Responsável pelo gerenciamento |

| Presença | Registro de participação dos alunos |

| Aluno | Participação nas atividades |



Essa integração permite controlar todo o ciclo de vida de uma atividade, desde seu cadastro até o registro das presenças dos participantes.



\---



\# Melhorias Futuras



As seguintes funcionalidades podem ser incorporadas futuramente ao módulo:



\- upload de materiais da atividade;

\- anexação de fotos;

\- controle de vagas;

\- confirmação de presença antecipada;

\- emissão automática de certificados;

\- integração com calendário institucional;

\- geração de relatórios por atividade.



\---



\# Considerações Finais



O módulo \*\*Atividade\*\* é responsável por organizar e registrar todas as ações desenvolvidas nos projetos de extensão. Ele conecta professores, alunos e projetos, servindo como base para o controle de presença e da carga horária extensionista.



Sua implementação segue a arquitetura em camadas adotada pelo sistema, separando responsabilidades entre Model, Repository, Service, Controller e Routes. Essa organização melhora a manutenção do código, facilita futuras evoluções e garante maior consistência na aplicação das regras de negócio.

