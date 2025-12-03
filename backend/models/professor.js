class Professor extends Usuario {
    constructor(id, nome, email, senha, matricula, curso) {
        super(id, nome, email, senha);
        this.matricula = matricula;
        this.curso = curso;
    }
}