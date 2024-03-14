<<<<<<< HEAD
const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;
=======
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
>>>>>>> 0e701c9c0c41daf758bccf573908bd30cabf7e0e


<<<<<<< HEAD
        console.log(`conectado a ${name}DB en host ${host}`);
    } catch (error) {
        console.log('error conectando a nuestra BBDD', error);
    }
}
module.exports = {connect};
=======
const urlDB = process.env.MONGO_DB
const mongoDb = urlDB;

const connect = async () => {
  try {
    const db = await mongoose.connect(mongoDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Nombre de DB y el Host en el que está
    const { name, host } = db.connection;
    console.log(`Conectado a la DB : ${name} en el host: ${host}`);
  } catch (error) {
    console.error(`No se ha podido conectar a la DB`, error);
  }
};

module.exports = { connect };
>>>>>>> 0e701c9c0c41daf758bccf573908bd30cabf7e0e
