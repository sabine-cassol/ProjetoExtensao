import e from "express";
import {Atividade} from "../models/index.js";
import atividadeRepository from "../repositories/atividadeRepository.js";
import atividadeService from "../services/atividadeService.js";
import atividadeController from "../controllers/atividadeController.js";
import autenticar from "../middlewares/autenticar.js";
import autorizar from "../middlewares/autorizar.js";

const router = express.Router();

const repository = atividadeRepository(Atividade);
const service = atividadeService(repository);
const controller = atividadeController(service);

router.post("/", autenticar, autorizar("professor"), (req, res) => controller.criarAtividade(req, res));
router.get("/todos", autenticar, (req, res) => controller.listarTodos(req, res));
router.get("/projeto/:projetoId", autenticar, (req, res) => controller.listarTodosPorProjeto(req, res));
router.get("/:id", autenticar, (req, res) => controller.buscarAtividadePorId(req, res));
router.put("/:id", autenticar, autorizar("professor"), (req, res) => controller.atualizarAtividade(req, res));
router.delete("/:id", autenticar, autorizar("professor"), (req, res) => controller.deletarAtividade(req, res));

export default router;
