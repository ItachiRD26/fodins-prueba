import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Configurar los headers CORS
  response.headers.set("Access-Control-Allow-Origin", "https://fodins-website.vercel.app")
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  response.headers.set("Access-Control-Allow-Credentials", "true")

  return response
}

export const config = {
  matcher: "/ministerio/login/api/:path*",
}

