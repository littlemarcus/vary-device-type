import { NextResponse } from 'next/server';

export function middleware(request) {
  // Create new request headers object
  const requestHeaders = new Headers(request.headers);
  
  // Detect device type
  const userAgent = request.headers.get('user-agent') || '';
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
  const deviceType = isMobile ? 'mobile' : 'desktop';
  
  // Set the Device-Type header on request headers
  requestHeaders.set('Device-Type', deviceType);
  
  // Create a response with the modified request headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
  
  // Set the Netlify-Vary header on the response headers
  response.headers.set('Netlify-Vary', 'header=Device-Type');
  
  console.log('Request headers set:', Object.fromEntries(requestHeaders.entries()));
  
  return response;
}

export const config = {
  matcher: ['/ssr-page'],
};