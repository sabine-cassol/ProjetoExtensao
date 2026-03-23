import { sequelize } from "../config/dataBase.js";
import AlunoModel from "./aluno.js";
import AtividadeModel from "./atividade.js";
import PresencaModel from "./presenca.js";
import ProfessoreModel from "./professor.js";


const Aluno = AlunoModel(sequelize);
const Presenca = PresencaModel(sequelize);
const Professor = ProfessoreModel(sequelize);
const Atividade = AtividadeModel(sequelize);


//relacionamento 1 para muitos de aluno e presença
Aluno.hasMany(Presenca, {
    foreignKey: "alunoId",
    as: "presencas"
});
Presenca.belongsTo(Aluno, {
    foreignKey: "alunoId",
    as: "aluno"
});

//relacionamento muitos para muitos de alunos e atividades
Aluno.belongsToMany(Atividade, {
    through: "AlunoAtividade",
    foreignKey: "alunoId",
    otherKey: "atividadeId",
    as: "atividades"
});

Atividade.belongsToMany(Aluno, {
    through: "AlunoAtividade", 
    foreignKey: "atividadeId",
    otherKey: "alunoId",
    as: "alunos"
})



export {sequelize, Aluno, Presenca, Professor, Atividade}