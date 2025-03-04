import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
  const deviceType = isMobile ? 'mobile' : 'desktop';
  
  response.headers.set('Device-Type', deviceType);
  
  const headerEntries = Array.from(response.headers.entries());
  const headerObject = Object.fromEntries(headerEntries);
  
  console.log('Final headers being set:', headerObject);
  
  return response;
}

export const config = {
  matcher: ['/ssr-page'],
};