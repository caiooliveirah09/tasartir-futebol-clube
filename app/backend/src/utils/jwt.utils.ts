import { sign } from 'jsonwebtoken';
import UserModel from '../database/models/User.model';

require('dotenv/config');

export default class Jwt {
  createToken = (user: UserModel): string => {
    const token = sign({ user }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  };

  /* validateToken = (token: string) => {
    try {
      const { data } = verify(token, process.env.JWT_SECRET as string);
      return data;
    } catch (error) {
      return { type: '404', message: 'deu ruim' };
    }
  };
  */
}
