export default (inscricaoProjetoRepository, projetoRepository, alunoRepository) => {
    return {
        async criarInscricao(dados) {
            const { alunoId, projetoId } = dados;
            dados.dataCadastro = new Date();

            const aluno = await alunoRepository.buscarPorId(alunoId);
            if (!aluno) {
                throw new Error("Aluno não encontrado");
            }
            if (!aluno.curso || !aluno.periodo) {
                throw new Error("Complete seu cadastro (curso e período) antes de se inscrever em um projeto");
            }

            const projeto = await projetoRepository.buscarPorId(projetoId);
            if (!projeto) {
                throw new Error("Projeto não encontrado");
            }

            // Validação de curso vinculado
            if (projeto.cursosVinculados) {
                const cursosAceitos = projeto.cursosVinculados
                    .split(',')
                    .map((c) => normalizarTexto(c));

                const cursoDoAluno = normalizarTexto(aluno.curso);

                if (!cursosAceitos.includes(cursoDoAluno)) {
                    throw new Error("Seu curso não está entre os cursos vinculados a este projeto");
                }
            }

            if (projeto.semestre) {
                const periodosAceitos = projeto.semestre
                    .split(',')
                    .map((p) => Number(p.trim().replace('º', '')))
                    .filter((n) => !isNaN(n));

                const periodoDoAluno = Number(aluno.periodo);

                if (!periodosAceitos.includes(periodoDoAluno)) {
                    throw new Error(
                        `Este projeto aceita apenas alunos dos períodos: ${projeto.semestre}`
                    );
                }
            }

            if (!projeto.periodoInscricaoInicio || !projeto.periodoInscricaoFim) {
                throw new Error("Este projeto não tem período de inscrição definido");
            }
            const hoje = obterDataLocalHoje();

            if (hoje < projeto.periodoInscricaoInicio) {
                throw new Error(
                    `As inscrições ainda não abriram. Início: ${formatarDataBR(projeto.periodoInscricaoInicio)}`
                );
            }

            if (hoje > projeto.periodoInscricaoFim) {
                throw new Error(
                    `O período de inscrições já encerrou. Encerrou em: ${formatarDataBR(projeto.periodoInscricaoFim)}`
                );
            }

            const inscricaoExistente = await inscricaoProjetoRepository.buscarInscricao(alunoId, projetoId);
            if (inscricaoExistente) {
                throw new Error("Aluno já inscrito nesse projeto");
            }

            return inscricaoProjetoRepository.criarInscricao(dados);
        },
        async listarAlunosPorProjeto(projetoId) {
            return inscricaoProjetoRepository.listarAlunosPorProjeto(projetoId);
        },
        async listarInscricoesPorAluno(alunoId) {
            return inscricaoProjetoRepository.listarInscricoesPorAluno(alunoId);
        }
    }
}

function normalizarTexto(texto) {
    return texto
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function obterDataLocalHoje() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

function formatarDataBR(dataISO) {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}