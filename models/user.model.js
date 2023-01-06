// create schema importing mongoose

const  mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    name :  {
        type : String,
        required : true,
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    email :{
        type : String,
        required :true,
        unique :true,
        lowercase : true,
        minLength : 10
    },
    password :{
        type : String,
        reqiured : true,
        
    },
    userType : {
        type : String,
        required : true,
        default : "CUSTOMER"
    },
    userStatus :{
        type : String,
        required : true,
        default : "APPROVED"
    },
    createdAt :{
        type : Date,
        default : Date.now()
    },
    updateAt:{
        type :Date,
        default :Date.now()
    }

});

module.exports = mongoose.model("User",userSchema);