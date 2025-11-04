import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Plugin } from './entity/Plugin';
import { PluginCategory } from './entity/PluginCategory';
import appProperties from './appProperties';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: appProperties.databaseHost,
  username: appProperties.databaseUsername,
  password: appProperties.databasePassword,
  database: appProperties.databaseName,
  synchronize: false,
  logging: false,
  entities: [Plugin, PluginCategory],
});