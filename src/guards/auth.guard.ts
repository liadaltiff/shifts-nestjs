import { ConfigModule } from '@nestjs/config';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const token = req.cookies.token ?? req.headers.authorization;
    if (!token) throw new UnauthorizedException();

    return this.validateToken(token);
  }

  validateToken = async (token: string) => {
    return !!(await jwt.verify(token, process.env.JWT_SECRET));
  };
}

export const createToken = async (payload: any) => {
  return await jwt.sign({ ...payload }, process.env.JWT_SECRET, {
    expiresIn: '4h',
  });
};
