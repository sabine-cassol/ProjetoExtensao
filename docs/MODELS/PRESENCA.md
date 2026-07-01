\# Módulo Presença



\## Visão Geral



O módulo \*\*Presença\*\* é responsável pelo controle de participação dos alunos nas atividades de extensão universitária. É através dele que o sistema registra os horários de entrada e saída dos participantes, calcula automaticamente a carga horária realizada e mantém o histórico de participação em cada atividade.



Este módulo garante que apenas alunos devidamente inscritos em um projeto possam registrar presença nas atividades correspondentes, assegurando a consistência das informações e a integridade do controle de horas de extensão.



\---



\# Objetivos



O módulo possui como principais objetivos:



\- Registrar o check-in dos alunos;

\- Registrar o check-out dos alunos;

\- Calcular automaticamente a carga horária realizada;

\- Armazenar o histórico de presenças;

\- Permitir consultas de frequência;

\- Atualizar as horas de extensão do aluno.



\---



\# Estrutura do Módulo



```

Presença

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

models/presenca.js

```



\## Responsabilidade



Representa os registros de presença dos alunos nas atividades.



Cada registro corresponde à participação de um aluno em uma atividade específica.



O Model define:



\- estrutura da tabela;

\- horários de entrada e saída;

\- carga horária realizada;

\- relacionamentos;

\- restrições de integridade.



\## Principais atributos



| Campo | Descrição |

|--------|-----------|

| id | Identificador da presença |

| alunoId | Aluno participante |

| atividadeId | Atividade realizada |

| dataHoraCheckIn | Horário de entrada |

| dataHoraCheckOut | Horário de saída |

| horasRealizadas | Total de horas calculadas |

| localizacaoCheckIn | Localização registrada no check-in |

| localizacaoCheckOut | Localização registrada no check-out |

| createdAt | Data de criação |

| updatedAt | Última atualização |



> \*\*Observação:\*\* Os atributos apresentados devem refletir exatamente aqueles definidos no Model Sequelize.



\## Relacionamentos



```

Aluno (1)

&#x20;   │

&#x20;   ▼

Presença (N)



Atividade (1)

&#x20;   │

&#x20;   ▼

Presença (N)

```



Cada registro de presença pertence simultaneamente a um único aluno e a uma única atividade.



\---



\# Repository



Arquivo



```

repositories/presencaRepository.js

```



\## Responsabilidade



Responsável pela comunicação entre a aplicação e o banco de dados referente aos registros de presença.



As principais operações realizadas incluem:



\- registrar check-in;

\- registrar check-out;

\- buscar presença por ID;

\- buscar presença aberta;

\- listar presenças de um aluno;

\- listar presenças por atividade;

\- atualizar registro de presença.



\### Fluxo



```

Service



↓



PresencaRepository



↓



Banco de Dados

```



Esta camada não implementa regras de negócio, sendo responsável apenas pela persistência dos dados.



\---



\# Service



Arquivo



```

services/presencaService.js

```



\## Responsabilidade



Implementa toda a lógica de negócio relacionada ao controle de presença.



Entre suas responsabilidades estão:



\- validar se o aluno está inscrito no projeto;

\- verificar se a atividade existe;

\- impedir check-in duplicado;

\- impedir check-out sem check-in;

\- calcular automaticamente as horas realizadas;

\- atualizar as horas de extensão do aluno;

\- validar permissões de acesso.



Além disso, esta camada integra informações provenientes dos módulos de Aluno, Projeto, Atividade e Inscrição.



\### Fluxo



```

Controller



↓



PresencaService



↓



Repository

```



Toda regra de negócio relacionada à presença permanece concentrada nesta camada.



\---



\# Controller



Arquivo



```

controllers/presencaController.js

```



\## Responsabilidade



Receber requisições HTTP relacionadas ao controle de presença e encaminhá-las para a camada de Service.



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

routes/presencaRoutes.js

```



\## Responsabilidade



Define todos os endpoints responsáveis pelo controle de presença.



As principais operações disponibilizadas são:



| Método | Finalidade |

|---------|------------|

| POST | Registrar check-in |

| PUT | Registrar check-out |

| GET | Consultar minhas presenças |

| GET | Consultar presenças por aluno |

| GET | Consultar carga horária |



Cada rota encaminha a requisição para o método correspondente do Controller.



\---



\# Fluxo Completo



Toda requisição relacionada ao módulo Presença percorre as seguintes camadas:



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



\- Apenas alunos autenticados podem registrar presença.

\- O aluno deve estar inscrito no projeto ao qual a atividade pertence.

\- Não é permitido realizar dois check-ins simultâneos para a mesma atividade.

\- O check-out somente pode ser realizado após um check-in válido.

\- O horário de saída deve ser posterior ao horário de entrada.

\- A carga horária é calculada automaticamente no momento do check-out.

\- Após o cálculo da carga horária, o total de horas do aluno é atualizado automaticamente.

\- O histórico de presença permanece armazenado para futuras consultas e emissão de relatórios.



\---



\# Segurança



O módulo utiliza os seguintes mecanismos de segurança:



\- autenticação via JWT;

\- autorização baseada no perfil do usuário;

\- validação da identidade do aluno autenticado;

\- proteção contra registros duplicados;

\- validação das permissões de acesso às informações de presença.



Esses mecanismos garantem a confiabilidade dos registros de frequência.



\---



\# Dependências



O módulo Presença possui integração direta com diversos componentes do sistema.



```

Presença



├── Aluno



├── Projeto



├── Atividade



├── Inscrição



├── JWT



└── Banco de Dados

```



Esses módulos trabalham em conjunto para garantir que apenas participantes autorizados registrem presença nas atividades.



\---



\# Responsabilidades do Módulo



| Camada | Responsabilidade |

|---------|------------------|

| Model | Representar os registros de presença |

| Repository | Persistência dos dados |

| Service | Implementação das regras de negócio |

| Controller | Tratamento das requisições HTTP |

| Routes | Definição dos endpoints da API |



\---



\# Integração com Outros Módulos



O módulo Presença mantém relacionamento com diversos componentes da aplicação.



| Módulo | Finalidade |

|---------|------------|

| Aluno | Identificação do participante |

| Projeto | Validação da inscrição |

| Atividade | Registro da participação |

| Inscrição | Verificação de vínculo com o projeto |



Essa integração garante que somente alunos autorizados possam registrar presença e que todas as horas sejam contabilizadas corretamente.



\---



\# Melhorias Futuras



As seguintes funcionalidades podem ser incorporadas futuramente ao módulo:



\- check-in por QR Code;

\- validação por geolocalização;

\- registro por reconhecimento facial;

\- assinatura digital de presença;

\- notificações automáticas;

\- exportação do histórico em PDF;

\- dashboards de frequência por projeto e atividade.



\---



\# Considerações Finais



O módulo \*\*Presença\*\* é responsável pelo controle de frequência e pela contabilização das horas de extensão dos alunos. Ele desempenha um papel central no funcionamento do sistema, garantindo que a participação dos estudantes seja registrada de forma segura e consistente.



Sua implementação segue a arquitetura em camadas adotada pelo projeto, separando responsabilidades entre Model, Repository, Service, Controller e Routes. Essa organização facilita a manutenção, melhora a escalabilidade e assegura a aplicação consistente das regras de negócio.

