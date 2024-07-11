
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/",
  "/(api(?!/uploadthing)|trpc)(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Don't run middleware on static files
    "/", // Run middleware on index page
    "/(api(?!/uploadthing)|trpc)(.*)",
  ], // Run middleware on API routes
};


// *------------------------------------------------------------------------------

// const isProtectedRoute = createRouteMatcher(["/", "/(api|trpc)(.*)"]);

// export default clerkMiddleware((auth, req) => {
//   // if (!req.url.startsWith('/api/uploadthing') && isProtectedRoute(req)) {
//   //   auth().protect();
//   // }

//   if (isProtectedRoute(req) && !req.url.startsWith('/api/uploadthing')) {
//     auth().protect();
//   }
// });

// export const config = {
//   matcher: [
//     "/((?!.*\\..*|_next).*)", // Don't run middleware on static files
//     "/", // Run middleware on index page
//     "/(api|trpc)(.*)",
//   ], // Run middleware on API routes
// };



// *---------------------------------------------------------------------------------

/* import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/", "/(api|trpc)(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (req.url !== '/api/uploadthing' && isProtectedRoute(req)) {
    auth().protect();
  }
});

// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) auth().protect();
// });

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Don't run middleware on static files
    "/", // Run middleware on index page
    "/(api|trpc)(.*)",
  ], // Run middleware on API routes
}; */

// *-----------------------------------------------------------------------------------

/* import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";

const publicRoutes = ["/api/uploadthing"];
const isProtectedRoute = createRouteMatcher(["/", "/(api|trpc)(.*)"].concat(publicRoutes));

export default clerkMiddleware((req: NextApiRequest, res: NextApiResponse, next: () => Promise<void>) => {
  if (isProtectedRoute(req)) {
    return auth().protect()(req, res, next);
  } else {
    return next();
  }
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Don't run middleware on static files
    "/", // Run middleware on index page
    "/(api|trpc)(.*)", // Run middleware on API routes
  ],
}; */