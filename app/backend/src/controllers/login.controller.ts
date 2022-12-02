import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import statusHTTP from '../utils/statusHTTP';

export default class LoginControler {
  public loginService = new LoginService();
  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { status, message } = await this.loginService.login(email, password);
    if (status === statusHTTP.OK) return res.status(status).json({ token: message });
    return res.status(status).json({ message });
  };

  public validate = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (token) {
      const { status, message } = await this.loginService.validate(token);
      if (status === statusHTTP.OK) return res.status(status).json({ role: message });
      return res.status(status).json({ message });
    }
    return res.status(statusHTTP.BAD_REQUEST).json({ message: 'Token not found' });
  };
}
