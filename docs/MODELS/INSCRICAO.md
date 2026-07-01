\# Módulo Inscrição



\## Visão Geral



O módulo \*\*Inscrição\*\* é responsável por gerenciar o vínculo entre alunos e projetos de extensão universitária. Ele implementa a relação de muitos para muitos (\*\*N:N\*\*) entre essas duas entidades, permitindo que um aluno participe de vários projetos e que um projeto possua diversos alunos inscritos.



Além de registrar as inscrições, este módulo desempenha um papel fundamental na aplicação das regras de negócio do sistema, pois apenas alunos inscritos podem participar das atividades e registrar presença.



\---



\# Objetivos



O módulo possui como principais objetivos:



\- Registrar inscrições de alunos em projetos;

\- Consultar alunos inscritos em um projeto;

\- Consultar projetos nos quais um aluno está inscrito;

\- Impedir inscrições duplicadas;

\- Servir como base para validação de presença nas atividades.



\---



\# Estrutura do Módulo



```

Inscrição

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

models/inscricao\_projeto.js

```



\## Responsabilidade



Representa a relação entre alunos e projetos de extensão.



A entidade Inscrição possui como objetivo armazenar o vínculo entre um aluno e um projeto, permitindo controlar quem pode participar das atividades vinculadas.



O Model define:



\- estrutura da tabela intermediária;

\- chaves estrangeiras;

\- relacionamentos;

\- restrições de integridade.



\## Principais atributos



| Campo | Descrição |

|--------|-----------|

| alunoId | Identificador do aluno |

| projetoId | Identificador do projeto |

| createdAt | Data da inscrição |

| updatedAt | Última atualização |



> \*\*Observação:\*\* Os atributos apresentados devem refletir exatamente aqueles definidos no Model Sequelize.



\## Relacionamentos



```

Aluno (N)

&#x20;    │

&#x20;    ▼

Inscrição

&#x20;    ▲

&#x20;    │

Projeto (N)

```



A entidade Inscrição representa a tabela intermediária responsável pelo relacionamento muitos para muitos entre Aluno e Projeto.



\---



\# Repository



Arquivo



```

repositories/inscricaoRepository.js

```



\## Responsabilidade



Responsável pela comunicação entre a aplicação e o banco de dados referente às inscrições.



As principais operações realizadas incluem:



\- registrar inscrição;

\- verificar inscrição existente;

\- listar alunos inscritos;

\- listar projetos do aluno;

\- remover inscrição (quando aplicável).



\### Fluxo



```

Service



↓



InscricaoRepository



↓



Banco de Dados

```



Esta camada não implementa regras de negócio, sendo responsável apenas pela persistência dos dados.



\---



\# Service



Arquivo



```

services/inscricaoService.js

```



\## Responsabilidade



Implementa toda a lógica de negócio relacionada às inscrições.



Entre suas responsabilidades estão:



\- validar se o aluno existe;

\- validar se o projeto existe;

\- impedir inscrições duplicadas;

\- verificar se o projeto está ativo;

\- validar permissões de acesso;

\- fornecer informações para o módulo de Presença validar o check-in.



Além disso, esta camada integra informações provenientes dos módulos de Aluno e Projeto.



\### Fluxo



```

Controller



↓



InscricaoService



↓



Repository

```



Toda regra de negócio relacionada às inscrições permanece concentrada nesta camada.



\---



\# Controller



Arquivo



```

controllers/inscricaoController.js

```



\## Responsabilidade



Receber requisições HTTP relacionadas às inscrições e encaminhá-las para a camada de Service.



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

routes/inscricaoRoutes.js

```



\## Responsabilidade



Define todos os endpoints responsáveis pelo gerenciamento das inscrições.



As principais operações disponibilizadas são:



| Método | Finalidade |

|---------|------------|

| POST | Inscrever aluno em um projeto |

| GET | Listar alunos inscritos em um projeto |

| GET | Listar projetos do aluno autenticado |

| GET | Listar projetos de um aluno específico |



Cada rota encaminha a requisição para o método correspondente do Controller.



\---



\# Fluxo Completo



Toda requisição relacionada ao módulo Inscrição percorre as seguintes camadas:



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



\- Apenas alunos autenticados podem realizar inscrições.

\- O projeto deve existir e estar ativo.

\- O aluno deve existir e estar ativo.

\- Não é permitido realizar inscrições duplicadas para o mesmo projeto.

\- Um aluno pode participar de diversos projetos.

\- Um projeto pode possuir diversos alunos inscritos.

\- A inscrição é obrigatória para que o aluno possa registrar presença nas atividades do projeto.



\---



\# Segurança



O módulo utiliza os seguintes mecanismos de segurança:



\- autenticação via JWT;

\- autorização baseada no perfil do usuário;

\- validação da identidade do aluno autenticado;

\- proteção contra inscrições duplicadas;

\- validação de acesso às informações das inscrições.



Esses mecanismos garantem que apenas usuários autorizados possam realizar ou consultar inscrições.



\---



\# Dependências



O módulo Inscrição possui integração direta com diversos componentes do sistema.



```

Inscrição



├── Aluno



├── Projeto



├── Presença



├── JWT



└── Banco de Dados

```



Esses módulos trabalham em conjunto para garantir que somente alunos devidamente inscritos possam participar das atividades dos projetos.



\---



\# Responsabilidades do Módulo



| Camada | Responsabilidade |

|---------|------------------|

| Model | Representar o vínculo entre Aluno e Projeto |

| Repository | Persistência dos dados |

| Service | Implementação das regras de negócio |

| Controller | Tratamento das requisições HTTP |

| Routes | Definição dos endpoints da API |



\---



\# Integração com Outros Módulos



O módulo Inscrição mantém relacionamento com diversos componentes da aplicação.



| Módulo | Finalidade |

|---------|------------|

| Aluno | Participante do projeto |

| Projeto | Projeto de extensão |

| Presença | Validação do check-in |

| Atividade | Permitir participação nas atividades |



Essa integração garante que o sistema mantenha consistência entre os participantes dos projetos e as atividades realizadas.



\---



\# Melhorias Futuras



As seguintes funcionalidades podem ser incorporadas futuramente ao módulo:



\- aprovação manual da inscrição pelo professor;

\- lista de espera para projetos com limite de vagas;

\- cancelamento de inscrição pelo aluno;

\- histórico de inscrições concluídas;

\- notificações automáticas de aprovação;

\- geração de certificados de participação;

\- integração com formulários externos.



\---



\# Considerações Finais



O módulo \*\*Inscrição\*\* é responsável por controlar a participação dos alunos nos projetos de extensão e garantir que apenas participantes autorizados tenham acesso às atividades e ao registro de presença.



Sua implementação segue a arquitetura em camadas adotada pelo projeto, separando responsabilidades entre Model, Repository, Service, Controller e Routes. Essa organização melhora a manutenção do código, facilita futuras expansões e assegura a aplicação consistente das regras de negócio relacionadas às inscrições.

