# Sistema de Extensão Universitária

Plataforma para gerenciamento e divulgação de atividades de extensão universitária, com controle de presença e horas. Visitantes conhecem os projetos e se inscrevem via formulário externo, alunos registram presença e acompanham suas horas, e professores administram atividades, geram relatórios e publicam notícias.

## 👤 Tipos de usuário

* **Visitante** — conhece os projetos publicamente; inscrição feita via Google Forms vinculado a cada projeto
* **Aluno** — participa dos projetos, registra presença, acompanha suas horas
* **Professor** — coordena projetos e atividades, administra notícias, gera relatórios

## 🎯 Objetivos

* Divulgação dos projetos de extensão dos cursos
* Controle de presença e horas de alunos participantes (check-in/check-out)
* Emissão de relatórios e ficha de frequência
* Upload de fotos das atividades

## 📱 Stack técnica

**Backend** — Node.js + Express, Sequelize sobre MySQL, autenticação JWT via cookie httpOnly, senhas com hash bcrypt. Arquitetura em camadas: Repository → Service → Controller → Routes, com injeção de dependência manual via factory functions.

**Frontend** — React 19 + TypeScript, Vite, Tailwind CSS 4, componentes Radix UI/shadcn, React Router para navegação, Swiper para carrosséis.

**Banco de dados** — MySQL.

**Infraestrutura** — backend e banco dockerizados via Docker Compose para facilitar o setup de ambiente entre os desenvolvedores. Veja [COMO_RODAR_DOCKER_BACKEND.md](./COMO_RODAR_DOCKER_BACKEND.md) para subir o ambiente localmente.

## ⚙ Funcionalidades

### Como professor:
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

## Requisitos

| ID |	Requisito |	Tipo | Prioridade | Usuário |
| --|----------|-----|-----------|--------| 
| RF01 | Cadastro e autenticação de professores e alunos	| Funcional |	Alta | Professor, Aluno |
| RF02 | CRUD de atividades de extensão |	Funcional	| Alta | Professor |
| RF03 | Visualização de projetos e inscrição via formulário externo |	Funcional |	Alta | Visitante |
| RF04 | Sistema de presença via check-in/check-out |	Funcional |	Alta | Aluno |
| RF05 | Controle e acompanhamento de horas por atividade |	Funcional |	Alta | Aluno, Professor|
| RF06 | CRUD de notícias	| Funcional |	Média	| Professor |
| RF07 | Geração de relatórios e ficha de frequência |	Funcional |	Média	| Professor |
| RF08 | Assinatura online de ficha de frequência	| Funcional	| Média	| Professor |
| RF09 | Upload de fotos das atividades	| Funcional	| Baixa	| Professor, Aluno |
| RNF01 |	Autenticação via JWT com proteção de rotas |	Não funcional |	Alta | Sistema |
| RNF02 |	Senhas armazenadas com hash bcrypt	| Não funcional |	Alta | Sistema |
| RNF03 |	API REST com Node.js e banco de dados MySQL	| Não funcional |	Alta | Sistema |

---

## Roadmap de desenvolvimento

### Fundação

- [x] Model — Aluno
- [x] Model — Professor
- [x] Model — Atividade
- [x] Model — Presença
- [x] Model — Projeto

### Autenticação

- [x] Repository, Service e Controller de Professor
- [x] Repository, Service e Controller de Aluno
- [x] Rota de cadastro e login (Professor e Aluno)
- [x] Middleware JWT para proteger rotas
- [x] Middleware de autorização por tipo de usuário (professor vs aluno)

### Projetos

- [x] Repository, Service e Controller de Projeto
- [x] Rota pública para visitantes visualizarem projetos
- [x] Rota protegida para professor criar, editar e deletar projetos

### Atividades

- [x] Repository, Service e Controller de Atividade
- [x] Atividade sempre vinculada a um `projetoId`
- [x] Listagem de atividades por projeto

### Inscrições (alunos)

- [x] Rota para aluno se inscrever em um projeto
- [x] Rota para professor visualizar alunos inscritos
- [x] Validação: aluno só pode fazer check-in se estiver inscrito no projeto

### Presença

- [x] Rota de check-in — cria Presença com `atividadeId` e `alunoId`
- [x] Rota de check-out — preenche `dataHoraCheckOut` e `localizacaoCheckOut`
- [x] Validação: não permitir check-in duplo na mesma atividade
- [x] Validação: não permitir check-out sem check-in aberto

### Controle de horas

- [x] Calcular horas ao fazer check-out
- [x] Atualizar `horasExtensao` no model Aluno
- [x] Rota para aluno consultar histórico de horas por projeto

### Inscrição de visitantes

- [ ] Campo de link do Google Forms vinculado a cada projeto
- [ ] Exibição do link na página pública do projeto

### Notícias

- [ ] Repository, Service e Controller de Notícia
- [ ] Rota pública para leitura
- [ ] Rota protegida para professor criar e editar notícias

### Relatórios

- [ ] Relatório de presenças por atividade
- [ ] Ficha de frequência por aluno com total de horas
- [ ] Exportação em PDF

### Upload de fotos

- [ ] Integração com serviço externo (S3 ou Cloudinary)
- [ ] Rota de upload vinculada a um projeto ou atividade

### Infraestrutura

- [x] Dockerização do backend e do banco de dados
- [x] Documentação de setup para novos colaboradores

---

## Tipos de usuários e permissões

| Tipo | Permissões |
|---|---|
| Visitante | Visualizar projetos e atividades; inscrição via link externo |
| Aluno | Inscrição em projetos, check-in/check-out, histórico de horas |
| Professor | CRUD de projetos e atividades, relatórios, notícias |

---

## Como rodar o projeto

O backend e o banco de dados rodam via Docker. Veja o passo a passo completo em [COMO_RODAR_DOCKER_BACKEND.md](./COMO_RODAR_DOCKER_BACKEND.md).

O frontend roda separadamente com Vite:

```bash
cd frontend
npm install
npm run dev
```

---

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

| Testes  | Documentação |
| -------|------|
| 1 Felipe Guimarães     | 1 Matheus da Silva |
| 2      | 2    |
| 3      | 3    |
