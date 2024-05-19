// // import { NextResponse } from 'next/server';
// // import { jwtVerify } from 'jose';

// // export async function middleware(request) {
// //     const path = request.nextUrl.pathname;
// //     const isPublicPath = path === '/login' || path === '/register';
// //     //const isSemiRestrictedPath = path == '/employees';
// //     const isRestrictedPath = path === '/projInfo'; // Assuming '/projInfo' is the restricted path
// //     const token = request.cookies.get('authToken') || "";

// //     let userRole;
// //     try {
// //         const { payload } = await jwtVerify(token["value"], new TextEncoder().encode(process.env.JWT_SECRET));
// //         userRole = payload?.role;
// //     } catch (error) {
// //         console.error("Token verification failed:", error);
// //         // Redirect to login if token is invalid
// //         return NextResponse.redirect(new URL('/login', request.url));
// //     }

// //     // Redirect non-admin users trying to access the restricted path
// //     if (isRestrictedPath && userRole !== 'admin') {
// //         return NextResponse.redirect(new URL('/', request.url));
// //     }

// //     // if(isSemiRestrictedPath && (userRole !=='employee' || userRole !=='user' || userRole !=='user')){
// //     //     return NextResponse.redirect(new URL('/', request.url));
// //     // }

// //     // Allow access to public paths
// //     if (isPublicPath) {
// //         return NextResponse.next();
// //     }

// //     // Redirect to login if trying to access a protected path without a token
// //     if (!token) {
// //         return NextResponse.redirect(new URL('/login', request.url));
// //     }

// //     // Continue for authenticated users with a token
// //     return NextResponse.next();
// // }

// // export const config = {
// //   matcher: ['/', '/projInfo', '/dashboard', '/pathInfo','/employees','/project'], // Adjust to include protected paths
// // }



// // middleware.js
// import { NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

// export async function middleware(request) {
//     const path = request.nextUrl.pathname;
//     const isPublicPath = path === '/login' || path === '/register';
//     const isRestrictedPath = path === '/projInfo'; // Adjust based on your needs
//     const isEmployeePath = path === '/myproj';
//     const token = request.cookies.get('authToken')?.value;

//     if (isPublicPath) {
//         return NextResponse.next();
//     }

//     if (!token) {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     try {
//         const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
//         const userRole = payload?.role;

//         if (isRestrictedPath && userRole !== 'admin') {
//             return NextResponse.redirect(new URL('/', request.url));
//         }
//         if (isEmployeePath && userRole !== 'employee') {
//             return NextResponse.redirect(new URL('/', request.url));
//         }
//     } catch (error) {
//         console.error("Token verification failed:", error);
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/', '/projInfo', '/dashboard', '/pathInfo', '/employees', '/project','/myproj','/assiproj'], // Adjust paths as necessary
// };




import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = ['/login', '/register'].includes(path);
    const token = request.cookies.get('authToken')?.value;

    if (isPublicPath) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        const userRole = payload?.role;

        // Define role-based path restrictions
        const restrictedPaths = {
            admin: ['/employees', '/assiproj','/addproj'], // Admin-only paths
            employee: ['/myproj'], // Employee-only paths
            // You can add more roles and paths as needed
        };

        // Check if the current path is restricted based on user role
        if (restrictedPaths.admin.includes(path) && userRole !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }
        if (restrictedPaths.employee.includes(path) && userRole !== 'employee') {
            return NextResponse.redirect(new URL('/', request.url));
        }
        // Add more role checks as necessary
    } catch (error) {
        console.error("Token verification failed:", error);
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/', '/projInfo', '/dashboard', '/pathInfo', '/employees', '/project', '/myproj','/assiproj','/addproj'
        // Add more paths to match if necessary
    ],
};
