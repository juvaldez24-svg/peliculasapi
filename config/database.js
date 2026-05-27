const { Sequelize } = require('sequelize');

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