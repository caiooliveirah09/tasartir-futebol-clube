import { compare } from 'bcryptjs';
import UserModel from '../database/models/User.model';
import Jwt from '../utils/jwt.utils';
import statusHTTP from '../utils/statusHTTP';

export default class LoginService {
  private jwt = new Jwt();
  public login = async (email: string, password: string) => {
    if (!email || !password) {
      return { status: statusHTTP.BAD_REQUEST, message: 'All fields must be filled' };
    }
    const user = await UserModel.findOne({ where: { email } });
    if (user && await compare(password, user.password)) {
      const token = this.jwt.createToken(user);
      return { status: statusHTTP.OK, message: token };
    }
    return { status: statusHTTP.UNAUTHORIZED, message: 'Incorrect email or password' };
  };

  public validate = async (token: string) => {
    try {
      const data = this.jwt.validateToken(token);
      return { status: statusHTTP.OK, message: data.user.role };
    } catch (e) {
      return { status: statusHTTP.UNAUTHORIZED, message: 'Token unauthorized' };
    }
  };
}
