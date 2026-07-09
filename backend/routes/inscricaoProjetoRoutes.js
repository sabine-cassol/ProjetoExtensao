import express from "express";
import {Inscricao_projeto} from "../models/index.js";
import inscricaoProjetoRepository from "../repositories/inscricaoProjetoRepository.js";
import inscricaoProjetoService from "../services/inscricaoProjetoService.js";
import inscricaoProjetoController from "../controllers/inscricaoProjetoController.js";
import autenticar from "../middlewares/autenticar.js";
import autorizar from "../middlewares/autorizar.js";

const repository = inscricaoProjetoRepository(Inscricao_projeto);
const service = inscricaoProjetoService(repository);
const controller = inscricaoProjetoController(service);

const router = express.Router();

router.post("/projetos/:projetoId/inscricoes", autenticar, autorizar("aluno"), (req, res) => controller.criarInscricao(req, res));
router.get("/projetos/:projetoId/alunos", autenticar, autorizar("professor"), (req, res) => controller.listarAlunosPorProjeto(req, res));
router.get("/alunos/me/inscricoes", autenticar, autorizar("aluno"), (req, res) => controller.listarMinhasInscricoes(req, res));
router.get("/alunos/:alunoId/inscricoes", autenticar, autorizar("professor"), (req, res) => controller.listarInscricoesPorAluno(req, res));

export default router;