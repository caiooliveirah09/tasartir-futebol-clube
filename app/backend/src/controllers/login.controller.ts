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
}
