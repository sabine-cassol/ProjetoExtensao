\# Regras de Negócio



\## Visão Geral



Este documento descreve as principais regras de negócio implementadas no Sistema de Gerenciamento de Projetos de Extensão Universitária.



As regras de negócio definem como o sistema deve se comportar diante das ações dos usuários, garantindo a consistência dos dados, a segurança da aplicação e o correto funcionamento dos processos acadêmicos.



\---



\# Objetivos



As regras de negócio possuem como objetivos:



\- Garantir a integridade dos dados;

\- Controlar o acesso às funcionalidades do sistema;

\- Validar informações antes da persistência no banco de dados;

\- Evitar operações inconsistentes;

\- Definir o fluxo de utilização da plataforma.



\---



\# Papéis do Sistema



O sistema possui dois perfis principais de usuários.



\## Professor



O professor é responsável pela administração dos projetos de extensão.



Permissões:



\- realizar cadastro;

\- realizar login;

\- atualizar seu perfil;

\- cadastrar projetos;

\- editar projetos;

\- ativar ou desativar projetos;

\- cadastrar atividades;

\- editar atividades;

\- consultar alunos;

\- consultar presenças.



\---



\## Aluno



O aluno é responsável por participar dos projetos de extensão.



Permissões:



\- realizar cadastro;

\- realizar login;

\- atualizar seu perfil;

\- inscrever-se em projetos;

\- registrar presença nas atividades;

\- consultar suas horas de extensão;

\- visualizar suas inscrições.



\---



\# Regras Gerais



\## RG001 - Autenticação obrigatória



Todas as rotas protegidas exigem que o usuário esteja autenticado.



Caso contrário, o sistema retorna:



```

401 Unauthorized

```



\---



\## RG002 - Controle de permissões



Cada rota verifica o perfil do usuário autenticado.



Exemplos:



Professor:



\- cadastrar projeto;

\- cadastrar atividade;

\- listar todos os alunos.



Aluno:



\- registrar presença;

\- realizar inscrição;

\- consultar suas informações.



Caso o usuário não possua permissão:



```

403 Forbidden

```



\---



\## RG003 - Exclusão lógica



Nenhum registro é removido fisicamente do banco de dados.



Ao invés disso, o sistema altera o status para inativo.



Isso preserva o histórico das informações.



\---



\# Regras do Professor



\## RP001 - Cadastro



O professor pode criar apenas uma conta utilizando um e-mail válido.



Não são permitidos e-mails duplicados.



\---



\## RP002 - Login



O login somente é permitido quando:



\- o e-mail existe;

\- a senha está correta;

\- o professor está ativo.



\---



\## RP003 - Atualização



O professor pode alterar apenas seus próprios dados.



\---



\## RP004 - Projetos



Apenas professores autenticados podem criar projetos.



\---



\## RP005 - Atividades



Somente professores podem cadastrar, alterar, ativar ou desativar atividades.



\---



\# Regras do Aluno



\## RA001 - Cadastro



Cada aluno deve possuir um RA único.



Não é permitido cadastrar dois alunos utilizando o mesmo RA.



\---



\## RA002 - Login



O login somente é permitido quando:



\- o RA ou e-mail existir (conforme implementação);

\- a senha estiver correta;

\- o aluno estiver ativo.



\---



\## RA003 - Atualização



O aluno pode atualizar apenas seu próprio perfil.



\---



\# Regras dos Projetos



\## RJ001 - Professor responsável



Todo projeto deve possuir exatamente um professor responsável.



Não é permitido criar projetos sem professor.



\---



\## RJ002 - Projeto ativo



Apenas projetos ativos podem receber novas inscrições.



\---



\## RJ003 - Atualização



Somente professores autorizados podem editar projetos.



\---



\## RJ004 - Exclusão



Projetos são desativados logicamente.



Os registros permanecem armazenados no banco de dados.



\---



\# Regras das Atividades



\## RA001



Toda atividade deve pertencer a um projeto existente.



\---



\## RA002



Não é permitido cadastrar atividades sem projeto.



\---



\## RA003



Somente professores podem criar atividades.



\---



\## RA004



Atividades desativadas não devem aceitar novos registros de presença.



\---



\# Regras das Inscrições



\## RI001



O aluno deve existir.



\---



\## RI002



O projeto deve existir.



\---



\## RI003



O projeto deve estar ativo.



\---



\## RI004



Não é permitido que um aluno realize duas inscrições para o mesmo projeto.



\---



\## RI005



Um aluno pode participar de diversos projetos.



\---



\## RI006



Um projeto pode possuir diversos alunos.



\---



\# Regras das Presenças



\## RP001



O aluno deve estar inscrito no projeto da atividade.



\---



\## RP002



O aluno somente pode realizar check-in em atividades pertencentes aos projetos nos quais está inscrito.



\---



\## RP003



Não é permitido realizar dois check-ins simultaneamente para a mesma atividade.



\---



\## RP004



O check-out somente pode ocorrer após um check-in válido.



\---



\## RP005



O horário de saída deve ser posterior ao horário de entrada.



\---



\## RP006



Após o check-out, o sistema calcula automaticamente a carga horária da atividade.



\---



\## RP007



As horas calculadas são adicionadas automaticamente ao histórico do aluno.



\---



\# Regras de Autenticação



\## RAU001



As senhas são armazenadas utilizando criptografia com bcrypt.



\---



\## RAU002



Após o login, o sistema gera um JWT.



\---



\## RAU003



O JWT é armazenado em um cookie HTTP Only.



\---



\## RAU004



O middleware \*\*autenticar\*\* valida o JWT antes da execução da rota.



\---



\## RAU005



O middleware \*\*autorizar\*\* verifica se o perfil possui permissão para acessar a funcionalidade.



\---



\# Fluxo Geral do Sistema



O funcionamento esperado do sistema pode ser representado pelo seguinte fluxo:



```

Professor



↓



Cadastro



↓



Login



↓



Criar Projeto



↓



Cadastrar Atividades



────────────────────────────



Aluno



↓



Cadastro



↓



Login



↓



Inscrição no Projeto



↓



Check-in



↓



Participação na Atividade



↓



Check-out



↓



Horas Calculadas



↓



Consulta das Horas de Extensão

```



\---



\# Fluxo de Autorização



```

Requisição



↓



Middleware autenticar



↓



Token válido?



├── Não → 401 Unauthorized



└── Sim



↓



Middleware autorizar



↓



Perfil permitido?



├── Não → 403 Forbidden



└── Sim



↓



Controller



↓



Service



↓



Repository



↓



Banco de Dados



↓



Resposta

```



\---



\# Integridade dos Dados



Para garantir a consistência das informações, o sistema aplica as seguintes validações:



\- e-mails únicos para professores;

\- RA único para alunos;

\- projetos vinculados a professores existentes;

\- atividades vinculadas a projetos existentes;

\- inscrições sem duplicidade;

\- presença apenas para alunos inscritos;

\- atualização apenas pelo usuário autorizado;

\- exclusão lógica dos registros.



\---



\# Tratamento de Erros



| Código | Situação |

|---------|----------|

|200|Operação realizada com sucesso|

|201|Recurso criado|

|400|Dados inválidos|

|401|Usuário não autenticado|

|403|Usuário sem permissão|

|404|Recurso não encontrado|

|409|Conflito de dados (duplicidade)|

|500|Erro interno do servidor|



\---



\# Considerações Finais



As regras de negócio apresentadas neste documento representam os comportamentos esperados do Sistema de Gerenciamento de Projetos de Extensão Universitária. Elas garantem que apenas operações válidas sejam executadas, preservando a integridade dos dados, a segurança da aplicação e a correta interação entre professores, alunos, projetos, atividades, inscrições e registros de presença.



Toda nova funcionalidade incorporada ao sistema deverá respeitar essas regras ou ampliar este documento com novas definições, mantendo a consistência da aplicação ao longo de sua evolução.

