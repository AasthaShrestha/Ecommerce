const User=require('../models/User')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constant');
const signUp=async(req,res)=>{
    //req.body={name,email,password}
    const userExist =await User.findOne({
       email:req.body.email 
    })
    if(userExist){
        res.status(400).json({
            message:"User already exist.Please sign in."
        });
        return;
    }
    const salt=bcrypt.genSaltSync(10);
    const hashedPassword=bcrypt.hashSync(req.body.password,salt)

    await User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    res.status(201).json({
        message:"Signed Up successfully"
    })
};
const signIn=async(req,res)=>{
    //we can send directly req.body in findOne but we need to make sure only those two fields are coming from the frontend.[we nees to validate as well]
    const user=await User.findOne({
        email:req.body.email,
    });
    if(!user){
        res.status(400).json({
            message:"Invalid Credentials",
        });
        return;
    }
    const isPasswordCorrect=bcrypt.compareSync(
        req.body.password,
        user.password
    )
    if (isPasswordCorrect) {
        const token = jwt.sign(
            {
                _id:user._id,
                name:user.name,
                roles:user.roles,
            },
            JWT_SECRET,
            {expiresIn:"20d"
            }
        );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate()+20);
     
    res.cookie("token",token,{
        httpOnly:true,
        expires:expiresAt,
    });

      res.status(200).json({
        message: "Signed In Successfully",
        token,
        data:user,
      });
      return;
    }
    res.status(400).json({
        message:"Invalid Credentials",
    })
       
};
module.exports={
    signUp,
    signIn,
}
//signup=>sucess=>token(12345)
//post:/product => token check => main function