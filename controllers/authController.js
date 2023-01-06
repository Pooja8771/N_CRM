// logic for sign in
/**
 * first read the request body and create js object to be inserted in the database
 * json  request body should be avaialble as js object 
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User  = require('../models/user.model') ; // User is user model
const authConfig = require('../configs/auth.config');
exports.signup = async (req,res)=>{

    try{
    const userObj = {           
        name : req.body.name,
        userId:req.body.userId,
        email :req.body.email,
        password:bcrypt.hashSync(req.body.password,10),
        userType:req.body.userType
    }
   console.log(userObj);

    //set the user status
 if(!userObj.userType || userObj.userType == "CUSTOMER"){
    userObj.userStatus = "APPROVED";
 } else{ 
    userObj.userStatus ="PENDING";  

 }
 // insert data in database
  const savedUser =  await User.create(userObj);
    res.status(200).send(savedUser);
} catch(error){
    console.log(" Error while registering user" ,error.message);
    res.status(500).send({
        message: " some internal server error"
    })
}
}

exports.signin = async(req,res)=>{
 try{
    const userIdReq = req.body.userId;
    const userPassword = req.body.password;

    const userSaved = await User.findOne({userId :userIdReq});

    if(!userSaved){
        res.status(501).send({
      message : "Invalid User "
        })

        const ValidPassword = bcrypt.compareSync(password,userPassword);

        if(!ValidPassword){
            res.status(502).send({
                message : "Invalid Password"
            });
        }
    }
     const token = jwt.sign({Id: userSaved.userId},authConfig.secret,{expiresIn :700});
     res.status(200).send({
        name : userSaved.name,
        userId : userSaved.userId,
        email :userSaved.email,
        userType: userSaved.userType,
        userStatus : userSaved.userStatus,
        acessToken :token
     });
     if(!userSaved.userStatus == "APPROVED"){
        res.status(402).send({
            message : " Not approved User for login"
        });
    }
    }catch(error){
        res.send(404).send({
            message : " Internal error"
        });
    }

     }
