
import {NextResponse} from "next/server"
import { verifyToken } from "../lib/util";

export async function middleware(req, ev) {
   const token = req ? req.cookies?.token : null;
   const userId = await verifyToken(token);
   const { pathname } = req.nextUrl.clone();
   console.log({pathname})
   if (token && userId || pathname.includes(`/api/login`) || pathname.includes('/static')) {
      return NextResponse.next();
   }
   if(pathname.includes('/api/login') || userId || pathname.includes('/static')) {
      return NextResponse.next();
    }

   if (!token && pathname !== `/login`) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url);
   }
}


