import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  // Simple path protection for /crm
  if (request.nextUrl.pathname.startsWith('/crm')) {
    
    // In a full implementation, you would check for a NextAuth token or secure cookie here.
    // For this lightweight solo CRM, if AUTH_ENABLED is false (or undefined during setup), we let it pass.
    // To secure it, set AUTH_ENABLED=true and configure your session logic.
    
    const isAuthEnabled = process.env.AUTH_ENABLED === 'true';
    const hasSession = request.cookies.has('crm_session'); // Example cookie name

    if (isAuthEnabled && !hasSession) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/crm/:path*'],
};
