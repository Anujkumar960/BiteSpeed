require('dotenv').config();
const {Sequelize} = require("sequelize");


const sequelize = new Sequelize(process.env.URI);

async function ConnectToDb(){
    try{
      await sequelize.authenticate();
      console.log('Connection to database has been established successfully.');
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
}

module.exports={sequelize,ConnectToDb};