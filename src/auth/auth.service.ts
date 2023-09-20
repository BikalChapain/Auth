import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwtpayload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepo.findOne({
      where: { email: loginUserDto.emailid, password: loginUserDto.password },
    });
    if (!user) {
      return { message: 'not found' };
    }
    // generate and sign token
    const token = this._createToken(user);
    return {
      emailid: user.email,
      id: user.id,
      firstname: user.username,
      ...token,
    };
  }

  private _createToken({ id, email, username }: User): any {
    const token: JwtPayload = { id, email, username };
    const accessToken = this.jwtService.sign(token);
    return {
      expiresIn: '1h',
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload) {
    const user: User = new User();

    const userFound = await this.userRepo.findOne({
      where: { email: payload.email },
    });
    if (!userFound) {
      return { message: 'no user found' };
    }

    user.username = userFound.username;
    user.email = userFound.email;
    user.id = userFound.id;

    return user;
  }
}
