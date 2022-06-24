import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

 const configOptions: TypeOrmModuleOptions = {
  type: 'postgres',

  host: 'localhost',
  port: 5432,
  username: '',
  password: '',
  database: 'postgres',
  autoLoadEntities: true,
  synchronize: true,

  entities: [__dirname + '/../**/*.entity{.ts,.js}'],

};

export {configOptions}