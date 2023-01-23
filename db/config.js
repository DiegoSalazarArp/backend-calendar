const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.DB_CNN);

    console.log("dbOnline");
  } catch (error) {
    throw new Error(`Error a inicializar DB: ${error}`);
  }
};

module.exports = {
  dbConnection,
};
