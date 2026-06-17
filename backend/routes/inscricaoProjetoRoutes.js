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

router.post("/projetos/:projetoId/inscricoes", autenticar, controller.criarInscricao);
router.get("/projetos/:projetoId/alunos", autenticar, controller.listarAlunosPorProjeto);
router.get("/alunos/me/inscricoes", autenticar, controller.listarMinhasInscricoes);
router.get("/alunos/:alunoId/inscricoes", autenticar, controller.listarInscricoesPorAluno);

export default router;