import path from 'path';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  database: 'yellow-pages',
  entities: [path.join(__dirname, '..', 'entities/**/*.ts')],
  host: 'localhost',
  password: '',
  port: 5432,
  synchronize: true,
  type: 'postgres',
  username: 'postgres'
});
