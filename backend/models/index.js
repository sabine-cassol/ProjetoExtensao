import { sequelize } from "../config/dataBase.js";
import AlunoModel from "./aluno.js";
import AtividadeModel from "./atividade.js";
import PresencaModel from "./presenca.js";
import ProfessoreModel from "./professor.js";
import ProjetoExtensaoModel from "./projeto_extensao.js";
import inscricaoProjeto from "./inscricao_projeto.js";


const Aluno = AlunoModel(sequelize);
const Presenca = PresencaModel(sequelize);
const Professor = ProfessoreModel(sequelize);
const Atividade = AtividadeModel(sequelize);
const Projeto_extensao = ProjetoExtensaoModel(sequelize);
const Inscricao_projeto = inscricaoProjeto(sequelize); 


Aluno.hasMany(Presenca, {
    foreignKey: "alunoId",
    as: "presencas"
});
Presenca.belongsTo(Aluno, {
    foreignKey: "alunoId",
    as: "aluno"
});

Atividade.hasMany(Presenca, {
    foreignKey: "atividadeId",
    as: "presencas"
});
Presenca.belongsTo(Atividade, {
    foreignKey: "atividadeId",
    as: "atividade"
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
Aluno.hasMany(Inscricao_projeto, {
    foreignKey: "alunoId",
    as: "inscricoesEmProjetos"
});
Inscricao_projeto.belongsTo(Aluno, {
    foreignKey: "alunoId",
    as: "aluno"
});

Projeto_extensao.hasMany(Inscricao_projeto, {
    foreignKey: "projetoId",
    as: "inscricoesEmProjetos"
});
Inscricao_projeto.belongsTo(Projeto_extensao, {
    foreignKey: "projetoId",
    as: "projeto"
});





export {sequelize, Aluno, Presenca, Professor, Atividade, Projeto_extensao, Inscricao_projeto};