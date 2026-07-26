# Front-end 
<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-orange?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/pnpm-9.x-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
</p>
  Esse arquivo apresentará informações sobre o frontend do projeto de gestão de horas/ponto online dos projetos de extensão

# Tecnologias utilizadas
  - React
  - Tailwind
  - TypeScript
  - ShadcnUi
  - Tanstack/React query para requisições
  - TipTap para editor de texto rico
  - browser-image-compression para tratamento de imagens
  - lucide-react para icones
  - react-router para tratar as rotas 
  - Swiper para criação do carrosel 
  - Zod para validação de campos

# Estrutura de pastas
```
src/
├── assets/
├── components/
├── context/
├── data/
├── hooks/
├── lib/
├── pages/
├── schemas/
├── services/
```

- assets para arquvivos de imagem e outros
- components, componentes utilizados no projeto
- context arquivo de contexto do projeto para acesso a dados em toda a aplicação, utilizado para funções de login e outras relacionadas ao usuário
- data interfaces de tipos e dados estáticos
- hooks funções utilitárias
- pages páginas do projeto
- schemas validações com zod
- services arquivos para tratar chamadas da api

  # Instalação 
  - Para instalar a aplicação é necessário clonar o repositório

  ```bash
    git clone -b dev-eduardo-2 https://github.com/sabine-cassol/ProjetoExtensao/
  ```
  
  - É preciso criar um arquivo .env na raíz do projeto nesse formato
  
  ```env
  VITE_API_URL=<Link para a api>
  ```
  
  - Em seguida rodar os seguintes comandos 
  
  ```bash
    cd site_extensao
  ```
  
  ```bash
    pnpm install
  ```
  
  - E para rodar
  ```bash
    pnpm run dev
  ```
  
