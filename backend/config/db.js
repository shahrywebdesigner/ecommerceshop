const mongoose = require("mongoose")

const dbconnect = async ()=>{
  
  try{
    const connectionString = await mongoose.connect(process.env.MONGO_URL)
    console.log('Database is connected sucessfully');
  }catch(error){
    console.log('Database not connted show error:', error );
  }

}

module.exports = dbconnect;