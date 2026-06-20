const mongoose = require("mongoose");

const ConnectDB= async ()=>{
    try{
        await mongoose.connect(process.env.mogoose_db, {
            serverSelectionTimeoutMS:15000
        });
        console.log("mogoose connected");
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports=ConnectDB;