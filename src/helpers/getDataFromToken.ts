import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { writer } from "repl";

interface Payload {
    id: string | number;
}

export const getDataFromToken = (request:NextRequest)=>{
try {
    const token = request.cookies.get('token')?.value || '';
    const decodedToken:Payload = jwt.verify(token,process.env.TOKEN_SECRET_PASSWORD!)  as Payload
    return decodedToken.id;
} catch (error : any) {
    throw new Error (error.message)
}
}