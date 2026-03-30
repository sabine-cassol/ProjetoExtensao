

export default ( ...tiposPermitidos) => {
    return (req, res, next) => {
        const tipo = req.usuario?.tipo;

        if (!tiposPermitidos.includes(tipo)) {
            return res.status(403).json({ erro: "Acesso negado"});
        }

        next();
    };
};