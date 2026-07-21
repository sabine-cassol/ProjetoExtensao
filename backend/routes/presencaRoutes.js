import express from "express";
import { Presenca, Atividade, Inscricao_projeto, Aluno, Projeto_extensao } from "../models/index.js";
import presencaRepository from "../repositories/presencaRepository.js";
import atividadeRepository from "../repositories/atividadeRepository.js";
import inscricaoRepository from "../repositories/inscricaoProjetoRepository.js";
import alunoRepository from "../repositories/alunoRepository.js";
import projetoRepository from "../repositories/projetoRepository.js";
import presencaService from "../services/presencaService.js";
import presencaController from "../controllers/presencaController.js";
import autenticar from "../middlewares/autenticar.js";
import autorizar from "../middlewares/autorizar.js";


const router = express.Router();

const presencaRepo = presencaRepository(Presenca);
const atividadeRepo = atividadeRepository(Atividade);
const inscricaoRepo = inscricaoRepository(Inscricao_projeto);
const alunoRepo = alunoRepository(Aluno);
const projetoRepo = projetoRepository(Projeto_extensao);
const service = presencaService(presencaRepo, atividadeRepo, inscricaoRepo, alunoRepo, projetoRepo);
const controller = presencaController(service);

router.post("/checkin", autenticar, autorizar("aluno"), (req, res) => controller.fazerCheckIn(req, res));
router.put("/checkout", autenticar, autorizar("aluno"), (req, res) => controller.fazerCheckOut(req, res));

router.get("/aluno/:id", autenticar, autorizar("professor"), (req, res) => controller.buscarTodasPresencasDoAluno(req, res));
router.get("/me", autenticar, autorizar("aluno"), (req, res) => controller.listarPresencasPorAluno(req, res));
router.get("/me/horas/:projetoId", autenticar, autorizar("aluno"), (req, res) => controller.getHorasExtensaoPorProjeto(req, res));

router.get("/professor", autenticar, autorizar("professor"), (req, res) => controller.listarPorProfessor(req, res));
router.put("/id/:id/aprovar", autenticar, autorizar("professor"), (req, res) => controller.aprovarPresenca(req, res));
router.put("/id/:id/recusar", autenticar, autorizar("professor"), (req, res) => controller.recusarPresenca(req, res));

export default router;
