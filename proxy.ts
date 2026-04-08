import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './lib/session';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('session')?.value
  const session = await getSession();
  let user = session;
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  const protectedRoutes = ['/dashboard', '/appointement']
  const isProtected = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route)) // check if the current route is a protected route by

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))) {
    if (isAdmin) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  if (isProtected && isAdmin) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
