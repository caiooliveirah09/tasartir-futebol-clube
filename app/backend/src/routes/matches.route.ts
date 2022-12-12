import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const router = Router();

const matchesController = new MatchesController();

router.get('/', matchesController.getAllMatches);
router.post('/', matchesController.addNewMatch);
router.patch('/:id/finish', matchesController.finishMatch);
router.patch('/:id', matchesController.updateMatch);

export default router;
