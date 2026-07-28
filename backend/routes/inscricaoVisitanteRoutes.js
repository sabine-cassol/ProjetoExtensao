import express from 'express';
import { Inscricao_visitante } from '../models/index.js';
import inscricaoVisitanteRepository from '../repositories/inscricaoVisitanteRepository.js';
import inscricaoVisitanteService from '../services/inscricaoVisitanteService.js';
import inscricaoVisitanteController from '../controllers/inscricaoVisitanteController.js';
import autenticar from '../middlewares/autenticar.js';
import autorizar from '../middlewares/autorizar.js';

const repository = inscricaoVisitanteRepository(Inscricao_visitante);
const service = inscricaoVisitanteService(repository);
const controller = inscricaoVisitanteController(service);

const router = express.Router();

router.post('/projeto/:projetoId', autenticar, autorizar("visitante"), (req, res) => controller.criarInscricao(req, res));
router.get('/visitantes/:visitanteId', autenticar, autorizar("professor"), (req, res) => controller.listarInscricoesPorVisitante(req, res));
router.get('/me/inscricoes', autenticar, autorizar("visitante"), (req, res) => controller.listarMinhasInscricoes(req, res));
router.get('/projetos/:projetoId', autenticar, autorizar("professor"), (req, res) => controller.listarVisitantesPorProjeto(req, res));

export default router;