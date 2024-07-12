import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
connect();
export async function GET (request : NextRequest){
try {
    const userId = await getDataFromToken(request)
   const user = await  User.findById(userId).select('-passsword')
   return NextResponse.json({message:'User fetched sucessfully', user},{status:200})
} catch (error) {
    return NextResponse.json({message:'Internal server error'},{status:400})
}
}