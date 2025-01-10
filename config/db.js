const moongoose = require("mongoose");
const connectDB = async ()=>{
  try{
    moongoose.set('strictQuery',false);
    const con = await moongoose.connect(process.env.MONGODB_URL);
    console.log(`Database has connect: ${con.connection.host}`)
  }catch(error){
    console.log(error)
  }
}
module.exports = connectDB;