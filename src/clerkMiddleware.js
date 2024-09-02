import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((req) => NextResponse.next(req));

export const config = {
  matcher: [
    '/dashboard',
    '/setup'
  ],
};