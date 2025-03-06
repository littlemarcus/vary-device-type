import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
  const deviceType = isMobile ? 'mobile' : 'desktop';
  
  // Set the Device-Type header
  response.headers.set('Device-Type', deviceType);
  
  // Add the Netlify-Vary header to create separate cache entries
  response.headers.set('Netlify-Vary', 'header=Device-Type');
  
  const headerEntries = Array.from(response.headers.entries());
  const headerObject = Object.fromEntries(headerEntries);
  
  console.log('Final headers being set:', headerObject);
  
  return response;
}

export const config = {
  matcher: ['/ssr-page'],
};