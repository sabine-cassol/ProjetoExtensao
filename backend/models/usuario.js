class Usuario {
    constructor(id, nome, email, senha){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    //método temporário, depende de como será feita a autenticação
    login(email, senha ) {
        return email === this.email && senha === this.senha ? true : false;
    }
}