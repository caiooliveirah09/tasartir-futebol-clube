import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const router = Router();

const loginController = new LoginController();

router.post('/', loginController.login);
router.get('/validate', loginController.validate);

export default router;
