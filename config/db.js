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

let isConnected;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      
    });
    isConnected = db.connections[0].readyState;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

module.exports = connectDB;
