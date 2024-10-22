import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

 
export async function POST(request: NextRequest) {
    await connect();
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        if (!username || !email || !password) {
            return NextResponse.json({ message: 'Please provide all required fields.' }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
        }

        // Hashing password
        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPass,
        });

        const savedUser = await newUser.save();

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        // fields are adding from this side


        return NextResponse.json({ message: 'User created successfully', user: savedUser }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating user:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
