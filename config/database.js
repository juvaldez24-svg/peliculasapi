/*const { Sequelize } = require('sequelize');

const urlPostgres = process.env.DATABASE_URL;

const sequelize = urlPostgres
  ? new Sequelize(urlPostgres, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite', 
      logging: false
    });

module.exports = sequelize;
*/

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Crucial para que Render acepte la conexión segura
    }
  },
  logging: false // Cambia a console.log si quieres ver las consultas SQL en la terminal
});

export default sequelize;