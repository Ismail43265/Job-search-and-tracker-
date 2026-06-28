const mongoose=require("mongoose");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");

const UserSchema= new mongoose.Schema({

    fullname :{
        firstname:{
            type: String,
            required: true, 
        },
        lastname: {
            type: String,
            required: true,
        }
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: function(){
            return !this.googleId;
        }
    },

    googleId: {
        type: String,
    },

    avatar: {
        type: String,
        default: ""
    },

},
{
    timestamps: true,
});

UserSchema.statics.hashPassword= async function (password){
    return await bcrypt.hash(password, 10);
}

UserSchema.methods.comparePassword= async function (password) {
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = async function (){
    const token= await jwt.sign({_id: this._id}, process.env.Key, {expiresIn: '24h'} );
    return token;
}

module.exports= mongoose.model("User", UserSchema);