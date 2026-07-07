# Autenticação



## Visão Geral



O Sistema de Extensão Universitária utiliza autenticação baseada em **JSON Web Token (JWT)** para identificar usuários autenticados e controlar o acesso aos recursos protegidos da aplicação.



Após uma autenticação bem-sucedida, o sistema gera um token JWT, que é armazenado em um **cookie HTTP Only**. Esse token acompanha automaticamente as requisições subsequentes realizadas pelo navegador, permitindo que o servidor identifique o usuário sem a necessidade de reenviar suas credenciais.



Além da autenticação, o sistema implementa um mecanismo de autorização baseado em perfis de usuário, garantindo que apenas usuários com as permissões adequadas possam acessar determinadas funcionalidades.



---



# Objetivos da Autenticação



O sistema de autenticação possui os seguintes objetivos:



- Identificar usuários autenticados;

- Garantir acesso apenas a usuários autorizados;

- Proteger rotas sensíveis da aplicação;

- Impedir acesso não autorizado aos recursos;

- Diferenciar permissões entre professores e alunos;

- Garantir maior segurança no armazenamento do token.



---



# Tecnologias Utilizadas



| Tecnologia | Finalidade |
|---|---|
| JWT (JSON Web Token) | Identificação do usuário autenticado |
| Cookies HTTP Only | Armazenamento seguro do token |
| bcrypt | Criptografia das senhas |
| Middleware `autenticar` | Validação da autenticação |
| Middleware `autorizar` | Controle de permissões |



---



# Fluxo Geral da Autenticação



O processo completo de autenticação ocorre conforme o fluxo abaixo.



```

Usuário
↓
Login
↓
Controller
↓
Service
↓
Validação do usuário
↓
Comparação da senha (bcrypt)
↓
JWT criado
↓
Cookie HTTP Only
↓
Resposta HTTP
↓
Requisições autenticadas
↓
Middleware autenticar
↓
Middleware autorizar
↓
Controller

```



---



# JSON Web Token (JWT)



O JWT é utilizado para representar a identidade do usuário autenticado.



Após a validação das credenciais, o servidor gera um token contendo informações necessárias para identificar o usuário durante sua sessão.



De forma geral, o token armazena informações como:



- identificador do usuário;

- tipo de usuário (Professor ou Aluno);

- data de emissão;

- data de expiração.



Essas informações são assinadas digitalmente, impedindo alterações por terceiros.



---



# Estrutura do JWT



Um token JWT é composto por três partes:



```

HEADER
.
PAYLOAD
.
SIGNATURE

```



### Header



Contém informações sobre o algoritmo utilizado para assinatura.



Exemplo:



```json

{

"alg": "HS256",

"typ": "JWT"

}

```



---



### Payload



Contém os dados do usuário autenticado.



Exemplo ilustrativo:



```json

{

"id": 15,

"tipo": "professor"

}

```



---



### Signature



Responsável por garantir a integridade do token.



Caso qualquer informação do token seja alterada, sua assinatura torna-se inválida.



---



# Cookies HTTP Only



Após o login, o JWT não é retornado para ser armazenado manualmente pelo cliente.



Em vez disso, o servidor cria um **cookie HTTP Only** contendo o token.



Essa abordagem apresenta diversas vantagens de segurança.



## Benefícios



- impede acesso ao token via JavaScript;

- reduz riscos de ataques XSS;

- envio automático em cada requisição;

- simplifica o gerenciamento da sessão.



O navegador envia automaticamente esse cookie para todas as requisições destinadas ao servidor.



---



# Processo de Login



O login ocorre em etapas.



```

Usuário
↓
Email e senha
↓
Controller
↓
Service
↓
Busca usuário
↓
bcrypt.compare()
↓
Senha válida
↓
JWT
↓
Cookie HTTP Only
↓
Resposta 200

```



Caso as credenciais estejam incorretas, o sistema retorna erro de autenticação.



---



# Processo de Logout



O logout consiste na remoção do cookie contendo o JWT.



Fluxo:



```

Usuário
↓
POST /logout
↓
Servidor remove cookie
↓
Sessão encerrada

```



Após a remoção do cookie, novas requisições protegidas deixam de ser autenticadas.



---



# Middleware autenticar



Arquivo:



```

middlewares/autenticar.js

```



## Responsabilidade



O middleware **autenticar** verifica se a requisição possui um JWT válido.



Seu funcionamento ocorre na seguinte sequência:



```

Requisição
↓
Ler Cookie
↓
Token encontrado?
↓
Não
↓
401 Unauthorized
↓
Sim
↓
Validar assinatura
↓
Token válido?
↓
Não
↓
401 Unauthorized
↓
Sim
↓
Adicionar usuário em req.user
↓
Próximo middleware

```



Após a validação, as informações do usuário ficam disponíveis durante toda a requisição.



Exemplo:



```javascript

req.user

```



Essas informações são utilizadas pelos Controllers e pelos demais middlewares.



---



# Middleware autorizar



Arquivo:



```

middlewares/autorizar.js

```



## Responsabilidade



O middleware **autorizar** verifica se o usuário autenticado possui permissão para acessar determinado recurso.



O middleware recebe o perfil permitido como parâmetro.



Exemplo conceitual:



```

autorizar("professor")

```



Fluxo:



```

Usuário autenticado
↓
Perfil obtido do JWT
↓
Comparar perfil
↓
Possui permissão?
↓
Sim
↓
Controller
↓
Não
↓
403 Forbidden

```



Esse mecanismo garante que apenas usuários autorizados executem determinadas operações.



---



# Controle de Permissões



O sistema diferencia permissões entre os dois perfis de usuário.



## Professor



Pode acessar funcionalidades administrativas, como:



- cadastro de projetos;

- atualização de projetos;

- gerenciamento de atividades;

- consulta de alunos;

- administração geral do sistema.



---



## Aluno



Pode acessar funcionalidades relacionadas à sua participação nos projetos, como:



- visualizar perfil;

- atualizar cadastro;

- inscrever-se em projetos;

- registrar presença;

- consultar horas de extensão.



---



# Fluxo de uma Requisição Protegida



Uma requisição protegida percorre as seguintes etapas.



```

Cliente
↓
Cookie JWT
↓
Express Router
↓
autenticar
↓
autorizar
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



Caso alguma etapa falhe, a requisição é interrompida e um erro apropriado é retornado ao cliente.



---



# Códigos de Resposta



| Código | Situação |
|---|---|
|200|Autenticação realizada com sucesso|
|400|Dados inválidos|
|401|Usuário não autenticado ou token inválido|
|403|Usuário sem permissão|
|500|Erro interno do servidor|

---



# Boas Práticas Adotadas



O sistema segue algumas práticas para aumentar a segurança da autenticação:



- utilização de senhas criptografadas com bcrypt;

- armazenamento do JWT em cookies HTTP Only;

- validação do token em todas as rotas protegidas;

- separação entre autenticação e autorização;

- controle de permissões por perfil de usuário;

- utilização de middlewares para centralizar as verificações de segurança.



---



# Considerações Finais



O mecanismo de autenticação do Sistema de Extensão Universitária foi desenvolvido utilizando JWT, cookies HTTP Only e middlewares de autenticação e autorização. Essa arquitetura permite controlar o acesso aos recursos protegidos de forma segura, organizada e escalável.



A separação entre autenticação (`autenticar`) e autorização (`autorizar`) torna o código mais modular e facilita a manutenção do sistema, permitindo que novas regras de acesso sejam adicionadas sem impactar a lógica das demais camadas da aplicação.

