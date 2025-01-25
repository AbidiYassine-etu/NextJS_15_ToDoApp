import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '515b5d88ad5f14a6b9ba625a80ef8adf450ccae61fc0dd698f43ceb6b06af9a5b1a93bcaf6f9af815bbe50171d134af650bccea0d719c778e4ce6d71eac143c2', // You should use an environment variable here
    });
  }

  // Validate the payload and attach the user to the request
  async validate(payload: JwtPayload) {
    const user = await this.userService.findByUsername(payload.username);
    if (!user) {
      throw new Error('Unauthorized');
    }
    return user;
  }
}
