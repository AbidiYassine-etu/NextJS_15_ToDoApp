import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth-guard';

@Module({
  imports:[
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: '515b5d88ad5f14a6b9ba625a80ef8adf450ccae61fc0dd698f43ceb6b06af9a5b1a93bcaf6f9af815bbe50171d134af650bccea0d719c778e4ce6d71eac143c2',
      signOptions:{expiresIn: '1h'},
    }),
  ],
  providers: [AuthService,JwtStrategy,JwtAuthGuard],
  controllers: [AuthController]
})
export class AuthModule {}
