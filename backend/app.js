import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from "./models/index.js";
import professorRoutes from "./routes/professorRoutes.js";
import alunoRoutes from "./routes/alunoRoutes.js"
import projetoRoutes from "./routes/projetoRoutes.js";
import atividadeRoutes from "./routes/atividadeRoutes.js";
import presencaRoutes from "./routes/presencaRoutes.js";
import inscricaoProjetoRoutes from "./routes/inscricaoProjetoRoutes.js";
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(cookieParser());

app.use("/professores", professorRoutes);
app.use("/alunos", alunoRoutes);
app.use("/projetos", projetoRoutes);
app.use("/atividades", atividadeRoutes);
app.use("/presencas", presencaRoutes);
app.use("/inscricoes", inscricaoProjetoRoutes);

// Servir os arquivos estáticos do React (dist)
app.use(express.static(path.join(__dirname, "../frontend/Projext_front/dist")));

// Qualquer rota não reconhecida pelo backend cai no React
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/Projext_front/index.html"));
});

sequelize.sync()
  .then(() => {
    console.log("Tabelas sincronizadas!!");
  }).catch(err => {
    console.error("Erro ao sincronizar " + err);
  });



export default app;