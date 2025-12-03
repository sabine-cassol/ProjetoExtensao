class Aluno extends Usuario {
    constructor(id, nome, email, senha, ra, curso, periodo, horas_extensao) {
        super(id, nome, email, senha); 
        this.ra = ra;
        this.curso = curso;
        this.periodo = periodo;
        this.horas_extensao = horas_extensao;
    }
}''