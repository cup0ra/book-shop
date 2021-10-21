import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../model/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly repo: Repository<Book>,
  ) {}

  public async getAll(): Promise<Book[]> {
    return await this.repo.find();
  }

  public async getById(id: string): Promise<Book> {
    return await this.repo.findOne(id);
  }

  public addUser = async (book: Book): Promise<Book> => {
    return await this.repo.save(book);
  };

  public async update(book: Book): Promise<any> {
    return await this.repo.update(book.id, book);
  }
}
