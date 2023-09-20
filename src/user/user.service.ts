import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    const user: User = this.userRepo.create({
      username,
      email,
      password,
    });

    await this.userRepo.save(user);
    return 'success';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmailPass(pass: string, email: string) {
    const user = await this.userRepo.findOneBy({
      email: email,
      password: pass,
    });
    if (!user) {
      return { response: 'badrequest' };
    }
    return user;
  }
}
