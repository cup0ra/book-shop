import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { Cart } from '../model/cart.entity';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private service: CartService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  public async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  public async getById(@Param('id') id: string) {
    return await this.service.getById(id);
  }

  @Post()
  public async create(@Body() createDto: Cart) {
    return await this.service.addUser(createDto);
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateDto: Cart) {
    return await this.service.update(updateDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
