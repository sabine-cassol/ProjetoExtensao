import express from "express";
import { Noticia } from "../models/index.js";
import noticiaRepository from "../repositories/noticiaRepository.js";
import noticiaService from "../services/noticiaService.js";
import noticiaController from "../controllers/noticiaController.js";
import autenticar from "../middlewares/autenticar.js";
import autorizar from "../middlewares/autorizar.js";

const router = express.Router();

const repository = noticiaRepository(Noticia);
const service = noticiaService(repository);
const controller = noticiaController(service);

router.get("/todas", (req, res) => controller.listarTodas(req, res));
router.get("/id/:id", (req, res) => controller.buscarPorId(req, res));

router.post("/", autenticar, autorizar("professor"), (req, res) => controller.criarNoticia(req, res));
router.put("/id/:id", autenticar, autorizar("professor"), (req, res) => controller.atualizarNoticia(req, res));
router.delete("/id/:id", autenticar, autorizar("professor"), (req, res) => controller.deletarNoticia(req, res));

export default router;