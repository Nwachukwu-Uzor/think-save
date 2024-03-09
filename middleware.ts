export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/accounts/:path*",
    "/dashboard",
    "/profile",
    "/products/:path*",
    "/investments/:path*",
    "/transactions/:path*",
    "/admin/dashboard",
    "/admin/transactions",
    "/admin/products",
    "/admin/users/:path*",
  ],
};
