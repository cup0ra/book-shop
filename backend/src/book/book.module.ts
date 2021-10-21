import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

import { Book } from '../model/book.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UsersModule],
  providers: [BookService],
  controllers: [BookController],
  exports: [],
})
export class BookModule {}
