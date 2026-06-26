# Como rodar o backend localmente

> Você só precisa do **Docker** instalado. Não precisa instalar Node.js nem MySQL.

---

## 1. Instalar o Docker

Baixe e instale o Docker Desktop:
👉 https://www.docker.com/products/docker-desktop/

Após instalar, abra o Docker Desktop e deixe ele rodando em segundo plano.

---

## 2. Clonar o repositório

Abra o terminal e rode:

```bash
git clone <URL_DO_REPOSITORIO> -b dev
cd <NOME_DA_PASTA>
```

> Substitua `<URL_DO_REPOSITORIO>` pela URL do GitHub e `<NOME_DA_PASTA>` pelo nome que aparecer.

---

## 3. Criar o arquivo de variáveis de ambiente

Na raiz do projeto, copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Abra o `.env` e preencha com qualquer valor — é só pra desenvolvimento local:

```
DB_NAME=projetoextensao
DB_USER=eduardo
DB_PASS=suasenha123
DB_HOST=db
DB_ROOT_PASS=rootsenha123
JWT_SECRET=qualquercoisa
```

> ⚠️ Não compartilhe esse arquivo com ninguém e não suba ele pro Git.

---

## 4. Subir o backend

```bash
docker compose up --build
```

Na primeira vez demora alguns minutos — ele vai baixar as imagens do Node e do MySQL.

Quando aparecer isso no terminal, está pronto:

```
backend-1  | Servidor rodando na porta 3000
backend-1  | Banco de dados conectado com sucesso!
backend-1  | Tabelas sincronizadas!!
```

O backend estará disponível em: **http://localhost:3000**

---

## 5. Parar o backend

Para parar, pressione `Ctrl + C` no terminal, depois:

```bash
docker compose down
```

---

## Próximas vezes

Não precisa de `--build` toda vez. Use só:

```bash
docker compose up
```

Use `--build` novamente apenas se o Ramon avisar que adicionou alguma dependência nova no `package.json`.

---

## Problemas comuns

**Porta 3000 ocupada**
Algum outro processo está usando a porta. Encerre-o ou altere a porta no `docker-compose.yml`.

**`docker compose` não reconhecido**
Tente `docker-compose` (com hífen) — versões antigas do Docker usam esse formato.

**Banco não conecta**
Espere alguns segundos e tente novamente. O MySQL demora um pouco pra inicializar na primeira vez.
