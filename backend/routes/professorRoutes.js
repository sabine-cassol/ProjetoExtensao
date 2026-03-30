import express from "express";
import {Professor} from "../models/index.js";
import professorRepository from "../repositories/professorRepository.js";
import professorService from "../services/professorService.js";
import professorController from "../controllers/professorController.js"

const router = express.Router();

const repository = professorRepository(Professor);
const service = professorService(repository);
const controller = professorController(service);

router.post("/", (req, res) => controller.cadastrarProfessor(req, res));
router.post("/login", (req, res) => controller.login(req, res));
router.post("/logout", (req, res) => controller.logout(req, res));

export default router;