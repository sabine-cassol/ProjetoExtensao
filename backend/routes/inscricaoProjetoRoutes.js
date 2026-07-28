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

router.post("/projeto/:projetoId", autenticar, autorizar("aluno"), (req, res) => controller.criarInscricao(req, res));
router.get("/projetos/:projetoId", autenticar, autorizar("professor"), (req, res) => controller.listarAlunosPorProjeto(req, res));
router.get("/me/inscricoes", autenticar, autorizar("aluno"), (req, res) => controller.listarMinhasInscricoes(req, res));
router.get("/alunos/:alunoId", autenticar, autorizar("professor"), (req, res) => controller.listarInscricoesPorAluno(req, res));

export default router;