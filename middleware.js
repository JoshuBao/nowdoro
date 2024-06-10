import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request) {
  // update user's auth session
  return await updateSession(request)
}

export const config = {
  matcher: [

  ],
}