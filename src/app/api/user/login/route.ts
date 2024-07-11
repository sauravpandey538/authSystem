import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'
import { use } from "react";
connect();

export async function POST(request:NextRequest){
   try {
     const reqBody = await request.json();
     const {email,password} = reqBody;
    //  if (email.trim() === " " || password.trim() === " "){
    //      NextResponse.json({message:"Enter details correctly"},{status:400})
    //  }
     const user = await User.findOne({email})
     if(!user){
         return NextResponse.json({message:'User is not being registered yet'},{status:404})
     }
     const checkPassword = await bcryptjs.compare(password,user.password);
     if (!checkPassword) {
        return NextResponse.json({message:'Password seems incorrect'},{status:404})
     }
     //later to change
    //  return NextResponse.json({message:'Everything looks perfect '},{status:200})
    
    
     // token session
     const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
     }

     const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET_PASSWORD, {expiresIn : '1d'})
     const response = NextResponse.json({mesage:"User loggedIn sucessfully"}, {status:200});
     response.cookies.set("token",token,{
        httpOnly:true
     })
return response;

   } catch (error) {
    console.log(error)
    return NextResponse.json({message:'Internal server error'},{status:500})

   }

}