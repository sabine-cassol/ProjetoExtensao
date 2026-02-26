import { sequelize } from "../config/dataBase.js";
import Alunos from "./aluno.js";
import Presencas from "./presenca.js";


const Aluno = Alunos(sequelize);
const Presenca = Presencas(sequelize);

Aluno.hasMany(Presenca, {
    foreignKey: "alunoId",
    as: "presencas"
});

Presenca.belongsTo(Aluno, {
    foreignKey: "alunoId",
    as: "aluno"
});


export {sequelize, Aluno, Presenca}