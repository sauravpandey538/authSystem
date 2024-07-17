import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';
import { connect } from '@/dbConfig/dbConfig';
import { COMPILER_NAMES } from 'next/dist/shared/lib/constants';
connect()

interface EmailOptions {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId?: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailOptions) => {
    try {
        let hashedToken: string;
        if (emailType === "VERIFY") {
            if (!userId) {
                throw new Error("User ID is required for email verification.");
            }
             hashedToken = await bcryptjs.hash(userId.toString(), 10);
             console.log('user is is : ', userId)
            const user = await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000, 
            });
            console.log("new updated user for email verify is : ", user)
        } else if (emailType === "RESET") {
             hashedToken = await bcryptjs.hash(email.toString(), 10);
            console.log("token hashed", hashedToken)
 // error below

 const user = await User.findOneAndUpdate({email:email}, {
   $set:{
    forgetPasswordToken: hashedToken,
    forgetPasswordTokenExpiry: Date.now() + 3600000, 
   }
});
console.log('updated user is : ', user)

//  const user = await User.findOne({ email });
//  console.log( "initial user is : ",user)
// if (user){
//     console.log('OHHH ! user exit')
//     user.forgetPasswordToken = hashedToken;
//     user.forgotPasswordTokenExpiry = Date.now() + 3600000
//     await user.save(); 
//     console.log( "updated user is : ",user)

// }

//  else{
//     throw new Error("User don't exit")
//  }
}
        else {
            throw new Error("Invalid emailType or missing userId for verification");
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER!, 
                pass: process.env.EMAIL_PASS!, 
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER!, 
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN!}/${emailType === "VERIFY" ?'verifyemail':'resetpassword'}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN!}/${emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword'}?token=${hashedToken}</p>`,
        };

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse;

    } catch (error: any) {
        throw new Error(`Failed to send ${emailType === "VERIFY" ? "verification" : "password reset"} email: ${error.message}`);
    }
};
