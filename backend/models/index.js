import { sequelize } from "../config/dataBase.js";
import AlunoModel from "./aluno.js";
import AtividadeModel from "./atividade.js";
import PresencaModel from "./presenca.js";
import ProfessoreModel from "./professor.js";
import ProjetoExtensaoModel from "./projeto_extensao.js";
import ParticipacaoAtividade from "./participacao_atividade.js";


const Aluno = AlunoModel(sequelize);
const Presenca = PresencaModel(sequelize);
const Professor = ProfessoreModel(sequelize);
const Atividade = AtividadeModel(sequelize);
const Projeto_extensao = ProjetoExtensaoModel(sequelize);
const Participacao_atividade = ParticipacaoAtividade(sequelize); 


//relacionamento 1 para muitos de aluno e presença
Aluno.hasMany(Presenca, {
    foreignKey: "alunoId",
    as: "presencas"
});
Presenca.belongsTo(Aluno, {
    foreignKey: "alunoId",
    as: "aluno"
});

Professor.hasMany(Projeto_extensao, {
    foreignKey: "professorId",
    as: "projetos"
});
Projeto_extensao.belongsTo(Professor, {
    foreignKey: "professorId", 
    as: "professor"
});

Projeto_extensao.hasMany(Atividade, {
    foreignKey: "projetoId",
    as: "atividades"
});
Atividade.belongsTo(Projeto_extensao, {
    foreignKey: "projetoId",
    as: "projeto"
})

//relacionamento muitos para muitos de alunos e atividades
Aluno.hasMany(Participacao_atividade, {
    foreignKey: "alunoId",
    as: "participacoesEmAtividades"
});
Participacao_atividade.belongsTo(Aluno, {
    foreignKey: "alunoId",
    as: "aluno"
});

Atividade.hasMany(Participacao_atividade, {
    foreignKey: "atividadeId",
    as: "participacoesEmAtividades"
});
Participacao_atividade.belongsTo(Atividade, {
    foreignKey: "atividadeId",
    as: "atividade"
});





export {sequelize, Aluno, Presenca, Professor, Atividade, Projeto_extensao, Participacao_atividade};