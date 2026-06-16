import express from "express";
import {Projeto} from "../models/index.js";
import projetoRepository from "../repositories/projetoRepository.js";
import projetoService from "../services/projetoService.js";
import projetoController from "../controllers/projetoController.js";
import autenticar from "../middlewares/autenticar.js";
import autorizar from "../middlewares/autorizar.js";

const router = express.Router();

const repository = projetoRepository(Projeto);
const service = projetoService(repository);
const controller = projetoController(service);

router.post("/", autenticar, autorizar("professor"), (req, res) => controller.cadastrarProjeto(req, res));
router.get("/todos", autenticar, (req, res) => controller.listarTodos(req, res));
router.get("/professor/:professorId", autenticar, (req, res) => controller.listarTodosPorProfessor(req, res));
router.get("/:id", autenticar, (req, res) => controller.buscarProjetoPorId(req, res));
router.put("/:id", autenticar, autorizar("professor"), (req, res) => controller.atualizarProjeto(req, res));
router.delete("/:id", autenticar, autorizar("professor"), (req, res) => controller.deletarProjeto(req, res));

export default router;