import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../model/user.entity';
import { Repository } from 'typeorm';
import { UsersDTO } from '../users/dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly repo: Repository<Users>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.repo.findOne({ email });
    if (user) return user;
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(id: string) {
    const user = await this.repo.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async createUser(userDTO: UsersDTO) {
    const newUser = this.repo.create(userDTO);
    await this.repo.save(newUser);
    return newUser;
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) return user;
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.repo.update(userId, { currentHashedRefreshToken });
  }

  async removeRefreshToken(userId: string) {
    return this.repo.update(userId, { currentHashedRefreshToken: null });
  }
}
