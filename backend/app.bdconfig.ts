import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export function createTypeOrmProdConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    username: 'conduit',
    password: 'conduit',
    database: 'conduit',
    entities: [join(__dirname, '**', '*.entity.{ts, js}')],
    synchronize: true,
    logging: true,
    logger: 'advanced-console',
  };
}
