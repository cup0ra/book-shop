import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Cart } from '../model/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly repo: Repository<Cart>,
  ) {}

  public async getAll(): Promise<Cart[]> {
    return await this.repo.find();
  }

  public async getById(id: string): Promise<Cart> {
    return await this.repo.findOne(id);
  }

  public addUser = async (cart: Cart): Promise<Cart> => {
    return await this.repo.save(cart);
  };

  public async update(cart: Cart): Promise<UpdateResult> {
    return await this.repo.update(cart.id, cart);
  }

  public async delete(id: string): Promise<Cart[]> {
    await this.repo.delete(id);
    return this.getAll();
  }
}
