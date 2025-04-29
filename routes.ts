/**
 * An array of routes that are acessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
  "/auth/new-verification","/"];

/**
 * An array of routes that are useed for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
  "/auth/member-login"
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/**
 * The default member redirect path after logging in
 * @type {string}
 */

export const MEMBER_LOGIN_REDIRECT = "/patients";

/**
 * The default manager redirect path after logging in
 * @type {string}
 */

export const MANAGER_LOGIN_REDIRECT = "/dashboard/ministry";
