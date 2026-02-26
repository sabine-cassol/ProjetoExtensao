import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3306;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir os arquivos estáticos do React (dist)
app.use(express.static(path.join(__dirname, "../frontend/Projext_front/dist")));

// Qualquer rota não reconhecida pelo backend cai no React
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/Projext_front/index.html"));
});


import { sequelize } from "./models/index.js";

sequelize.sync()
  .then(() => {
    console.log("Tabelas sincronizadas!!");
  }).catch( err => {
    console.error("Erro ao sincronizar " + err);
  });


export default app;