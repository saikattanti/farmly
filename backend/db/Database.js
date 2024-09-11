const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', false);
    
    const connection = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB is connected with server: ${connection.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with failure code
  }
};

module.exports = connectDatabase;
