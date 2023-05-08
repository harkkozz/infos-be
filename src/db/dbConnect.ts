import path from 'path';
import { DataSource } from 'typeorm';

console.log(process.env.NODE_ENV);

export const AppDataSource = new DataSource({
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '..', 'entities/**/*.ts')],
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  synchronize: true,
  type: 'postgres',
  username: process.env.DB_USERNAME
});
