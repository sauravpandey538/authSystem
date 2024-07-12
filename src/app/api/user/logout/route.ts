import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    try {
const response = NextResponse.json({
    message:'Logout sucessfully'
}, {status: 200})

response.cookies.set('token','',{
    httpOnly: true
})
return response;
        
    } catch (error) {
        console.log(error)
        NextResponse.json({message : 'Internal server error'})
    }
}