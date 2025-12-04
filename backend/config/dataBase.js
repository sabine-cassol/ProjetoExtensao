import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); 

const sequelize =  new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
);

sequelize.authenticate().then((function() {
    console.log("Banco de dados conectado com sucesso!");
})).catch(function(erro){
    console.log("Banco de dados não conectado =>" + erro);
}); 

export { Sequelize, sequelize };