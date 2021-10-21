import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { Book } from '../model/book.entity';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private service: BookService) {}

  @Get()
  public async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  public async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Post()
  public async create(@Body() createDto: Book) {
    return await this.service.addUser(createDto);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateDto: Book) {
    return await this.service.update(updateDto);
  }
}
