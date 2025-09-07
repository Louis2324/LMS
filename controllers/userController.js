import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createJWT = (user) => {
 return jwt.sign(
    {userId:user._id , role:user.role},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)};

export const registerUser = async (req,res,next) =>{
  try {
      const {name,password,email,role} = req.body;
     const existingUser = await User.findOne({email});
     if(existingUser) {
        return res.status(400).json({msg:"Email already in use"});
     }

    const user = await User.create({name,password,email,role});
    const token = createJWT(user);
    res.status(201).json({
        msg:"User created successfully",
        user: {
           _id: user._id,
           name: user.name,
           email: user.email,
           role: user.role,
        }, token})
  } catch (error) {
    next(error);
  }
}

export const login = async (req,res,next) => {
  try {
        const {email , password} = req.body;
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))) {
            return res.status(401).json({msg:"Invalid Credentials"});
        }
        const token = createJWT(user);
        return res.status(200).json({
            user: {
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
            token});
  } catch (error) {
    next(error);
  }
}