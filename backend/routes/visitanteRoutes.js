import express from "express";
import { Visitante } from "../models/index.js";
import visitanteRepository from "../repositories/visitanteRepository.js";
import visitanteService from "../services/visitanteService.js";
import visitanteController from "../controllers/visitanteController.js";
import autenticar from "../middlewares/autenticar.js";
import autorizar from "../middlewares/autorizar.js";

const router = express.Router();

const repository = visitanteRepository(Visitante);
const service = visitanteService(repository);
const controller = visitanteController(service);

router.post("/", (req, res) => controller.cadastrarVisitante(req, res));
router.post("/login", (req, res) => controller.login(req, res));

router.get("/me", autenticar, autorizar("visitante"), (req, res) => controller.buscarPerfil(req, res));
router.get("/todos", autenticar, autorizar("professor"), (req, res) => controller.buscarTodos(req, res));
router.get("/id/:id", autenticar, autorizar("professor"), (req, res) => controller.buscarPorId(req, res));

router.put("/atualizar/:id", autenticar, autorizar("visitante"), (req, res) => controller.atualizarVisitante(req, res));
router.put("/ativar/:id", autenticar, autorizar("professor"), (req, res) => controller.ativarVisitantePorId(req, res));

router.delete("/desativar/:id", autenticar, autorizar("professor"), (req, res) => controller.desativarVisitantePorId(req, res));

export default router;