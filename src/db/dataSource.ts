import path from 'path';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  database: 'yellow-pages',
  entities: [path.join(__dirname, '..', 'entities/**/*.ts')],
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  synchronize: false,
  ssl: false,
  type: 'postgres',
  username: process.env.DB_USERNAME,
  migrations: [path.join(__dirname, '..', 'db', 'migrations/**/*.ts')]
});
