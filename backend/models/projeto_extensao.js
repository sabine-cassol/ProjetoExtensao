import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
    class Projeto_extensao extends Model {};

    Projeto_extensao.init({
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            type: DataTypes.STRING
        },
        justificativa: {
            type: DataTypes.STRING
        },
        pretensao: {
            type: DataTypes.STRING
        },
        requisitos: {
            type: DataTypes.STRING
        },
        cargaHoraria: {
            type: DataTypes.STRING
        },
        tipo: {
            type: DataTypes.STRING
        },
        unidade: {
            type: DataTypes.STRING
        },
        cursosVinculados: {
            type: DataTypes.STRING
        },
        parceiros: {
            type: DataTypes.STRING
        },
        colaboradores: {
            type: DataTypes.STRING
        },
        comunidadeParticipante: {
            type: DataTypes.STRING
        },
        semestre: {
            type: DataTypes.STRING
        },
        vagas: {
            type: DataTypes.STRING
        },
        ods: {
            type: DataTypes.STRING
        },
        competencia: {
            type: DataTypes.STRING
        },
        eixo: {
            type: DataTypes.STRING
        },
        ciclo: {
            type: DataTypes.STRING
        },
        numEncontros: {
            type: DataTypes.STRING
        },
        periodoInscricao: {
            type: DataTypes.STRING
        },
        periodoExecucao: {
            type: DataTypes.STRING
        },
        professorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: "ProjetosDeExtensao"
    });

    return Projeto_extensao;
}