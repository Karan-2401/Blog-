// const moongoose = require("mongoose");
// const connectDB = async ()=>{
//   try{
//     moongoose.set('strictQuery',false);
//     const con = await moongoose.connect(process.env.MONGODB_URL);
//     console.log(`Database has connect: ${con.connection.host}`)
//   }catch(error){
//     console.log(error)
//   }
// }
// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use only the MongoDB connection string
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tlsAllowInvalidCertificates: false, // Ensure certificates are validated
    
      ssl: true,
      tls: true,
    tlsCAFile: '/path/to/ca.pem'
      });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

module.exports = connectDB;
