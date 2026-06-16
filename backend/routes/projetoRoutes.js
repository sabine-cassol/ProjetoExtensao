import express from "express";
import {Projeto_extensao} from "../models/index.js";
import projetoRepository from "../repositories/projetoRepository.js";
import projetoService from "../services/projetoService.js";
import projetoController from "../controllers/projetoController.js";
import autenticar from "../middlewares/autenticar.js";
import autorizar from "../middlewares/autorizar.js";

const router = express.Router();

const repository = projetoRepository(Projeto_extensao);
const service = projetoService(repository);
const controller = projetoController(service);

router.post("/", autenticar, autorizar("professor"), (req, res) => controller.criarProjeto(req, res));

router.get("/todos", autenticar, (req, res) => controller.listarTodos(req, res));
router.get("/professor/:professorId", autenticar, (req, res) => controller.listarTodosPorProfessor(req, res));
router.get("/id/:id", autenticar, (req, res) => controller.buscarProjetoPorId(req, res));

router.put("/id/:id", autenticar, autorizar("professor"), (req, res) => controller.atualizarProjeto(req, res));
router.put("/ativar/:id", autenticar, autorizar("professor"), (req, res) => controller.ativarProjeto(req, res));

router.delete("/desativar/:id", autenticar, autorizar("professor"), (req, res) => controller.desativarProjeto(req, res));

export default router;