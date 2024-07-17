import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/helpers/mailer';

interface RequestFromFrontEnd{
    email : string,
    emailType : 'VERIFY' | 'RESET'
}

export async function POST(request: NextRequest) {
    console.log('Hello world')
    // came till here
  try {
    const reqBody: RequestFromFrontEnd = await request.json();
    console.log(reqBody)
    const { email, emailType } = reqBody
    console.log(email,emailType)
// working till here
    const response = await sendEmail({ email, emailType });
    return NextResponse.json({ message: 'Email sent successfully', response });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
