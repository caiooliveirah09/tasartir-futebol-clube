import { sign, verify } from 'jsonwebtoken';
import UserModel from '../database/models/User.model';

require('dotenv/config');

const SECRET = process.env.JWT_SECRET || 'jwt_secret';

type decoded = {
  user: {
    id: number,
    username: string,
    role: string,
    email: string,
  },
  iat: number,
  exp: number,
};

export default class Jwt {
  createToken = (user: UserModel): string => {
    const token = sign({ user }, SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  };

  validateToken = (token: string) => {
    const data = verify(token, SECRET);
    return data as decoded;
  };
}
