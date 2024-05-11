// src/sequelize.config.ts

import { Sequelize } from 'sequelize-typescript';
import { Location } from './locations/location.model';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [Location], // Pass Location model directly to models array
});
