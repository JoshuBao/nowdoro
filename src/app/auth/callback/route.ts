import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as 'magiclink';

  if (token_hash && type) {
    const supabase = createClient();

    console.log('Token Hash:', token_hash);
    console.log('Type:', type);

    const { error, data } = await supabase.auth.verifyOtp({ token_hash, type });

    if (error) {
      console.error('Error confirming magic link:', error);
      return NextResponse.redirect(new URL('/error', request.url));
    }

    console.log('User logged in:', data);

    return NextResponse.redirect(new URL('/dashboard', request.url));
  } else {
    return NextResponse.redirect(new URL('/error', request.url));
  }
}
