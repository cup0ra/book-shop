import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { BookModule } from './book/book.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ModuleInterceptor } from './header/module.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    BookModule,
    CartModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleInterceptor,
    },
  ],
})
export class AppModule {}
