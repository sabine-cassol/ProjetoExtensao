import express from "express";
import { Inscricao_projeto, Projeto_extensao, Aluno } from "../models/index.js";
import inscricaoProjetoRepository from "../repositories/inscricaoProjetoRepository.js";
import projetoRepository from "../repositories/projetoRepository.js";
import alunoRepository from "../repositories/alunoRepository.js";
import inscricaoProjetoService from "../services/inscricaoProjetoService.js";
import inscricaoProjetoController from "../controllers/inscricaoProjetoController.js";
import autenticar from "../middlewares/autenticar.js";

const repositoryProjeto = projetoRepository(Projeto_extensao);
const repository = inscricaoProjetoRepository(Inscricao_projeto, repositoryProjeto);
const repositoryAluno = alunoRepository(Aluno);
const service = inscricaoProjetoService(repository, repositoryProjeto, repositoryAluno);
const controller = inscricaoProjetoController(service);

const router = express.Router();

router.post("/projetos/:projetoId/inscricoes", autenticar, controller.criarInscricao);
router.get("/projetos/:projetoId/alunos", autenticar, controller.listarAlunosPorProjeto);
router.get("/alunos/me/inscricoes", autenticar, controller.listarMinhasInscricoes);
router.get("/alunos/:alunoId/inscricoes", autenticar, controller.listarInscricoesPorAluno);

export default router;