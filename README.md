# Descrição Resumida do Sistema
O Sistema tem como objetivo facilitar o gerenciamento e a divulgação das atividades de extensão universitárias e suas dependências como controle de horas.  
A plataforma permitirá que visitantes conheçam e se inscrevam nos projetos, alunos registrem presença e acompanhem suas horas, e professores administrem atividades, gerem relatórios e façam o upload de fotos dos eventos e de notícias.

## 👤 Tipos de usuários
* Visitantes (interessados nas atividades)
* Alunos (participantes)
* Professores (coordenadores dos projetos e administradores)

## 🎯 Objetivos
* Divulgação dos projetos de extensão dos cursos;
* Controle de presença e horas de alunos participantes (check-in/check-out);
* Emissão de relatórios e ficha de frequência;
* Upload de fotos das atividades.

## ⚙ Funcionalidades
* CRUD de notícias
* Sistema de ponto/chamada 

###  Como professor:
* Cadastrar ativadades:
* Gerar relatórios de alunos participantes;
* Assinatura online de fichas de frequencia.

### Como Aluno
* Marcação de presença por meio de um sistema de check-in/check-out (como sistemas de ponto em empresas);
* Controle de horas e presenças;
* Upload de fotos das atividades.

### Como visitante
* Visualizar os projetos disponíveis;
* Inscrição nos projetos;
* Visualizar horarios dos projetos inscritos.

## 📱Tecnologias previstas
* FrontEnd -> React.js
* BackEnd -> Node.js
* Banco de dados -> MySQL

## Requisitos

| ID |	Requisito |	Tipo | Prioridade | Usuário |
| RF01 | Cadastro e autenticação de professores e alunos	| Funcional |	Alta | Professor, Aluno |
| RF02 | CRUD de atividades de extensão |	Funcional	| Alta | Professor |
| RF03 | Visualização e inscrição em projetos |	Funcional |	Alta | Visitante, Aluno |
| RF04 | Sistema de presença via check-in/check-out |	Funcional |	Alta | Aluno |
| RF05 | Controle e acompanhamento de horas por atividade |	Funcional |	Alta | Aluno, Professor|
| RF06 | CRUD de notícias	| Funcional |	Média	| Professor |
| RF07 | Geração de relatórios e ficha de frequência |	Funcional |	Média	| Professor |
| RF08 | Assinatura online de ficha de frequência	| Funcional	| Média	| Professor |
| RF09 | Upload de fotos das atividades	| Funcional	| Baixa	| Professor, Aluno |
| RNF01 |	Autenticação via JWT com proteção de rotas |	Não funcional |	Alta | Sistema |
| RNF02 |	Senhas armazenadas com hash bcrypt	| Não funcional |	Alta | Sistema |
| RNF03 |	API REST com Node.js e banco de dados MySQL	| Não funcional |	Alta | Sistema |


## Integrantes

| Analista de Requisitos  | UI/UX |
| -------|------|
| 1      | 1 Eduardo H.   |
| 2      | 2    |
| 3      | 3    |


| Frontend  | Backend |
| -------|------|
| 1 Eduardo H.     | 1 Ramon Albini|
| 2      | 2    |
| 3      | 3    |

| Banco de dados  | Documentação |
| -------|------|
| 1  Ramon Albini| 1 Lucas Wessendorf de Araujo |
| 2      | 2    |
| 3      | 3    |
