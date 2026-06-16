import express from "express";
import {Aluno} from "../models/index.js";
import alunoRepository from "../repositories/alunoRepository.js";
import alunoService from "../services/alunoService.js";
import alunoController from "../controllers/alunoController.js";
import autenticar from "../middlewares/autenticar.js";
import autorizar from "../middlewares/autorizar.js";

const router = express.Router();

const repository = alunoRepository(Aluno);
const service = alunoService(repository);
const controller = alunoController(service);

router.post("/", (req, res) => controller.cadastrarAluno(req, res));
router.post("/login", (req, res) => controller.login(req, res));
router.post("/logout", (req, res) => controller.logout(req, res));

router.get("/me", autenticar, autorizar("aluno"), (req, res) => controller.buscarPerfil(req, res));
router.get("/todos", autenticar, autorizar("professor"), (req, res) => controller.buscarTodos(req, res));
router.get("/ra", autenticar, autorizar("aluno"), (req, res) => controller.buscarPorRa(req, res));

router.put("/atualizar", autenticar, autorizar("aluno"), (req, res) => controller.atualizar(req, res));

export default router;