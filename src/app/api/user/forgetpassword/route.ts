import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

connect();


export async function POST(request:NextRequest) {
   try {
     const reqBody = await request.json();
     const {token, newPass} = reqBody;
     console.log(token,newPass)
     const salt = await bcryptjs.genSalt(10);
     const hashedPass = await bcryptjs.hash(newPass, salt);
     console.log
     const user = await User.findOne({forgetPasswordToken : token, forgetPasswordTokenExpiry: {$gt: Date.now()}})
     console.log(user)
     if (!user) {
         return NextResponse.json({error: "Invalid token"}, {status: 400})
     }
     user.password = hashedPass;
     user.forgetPasswordToken = undefined
     await user.save()
     return NextResponse.json({
         message: "Password changed successfully",
         success: true
     })
   } catch (error) {
    return NextResponse.json({
        message: "Internal server error",
        error
    },
    {status:500}
    )
   }
}