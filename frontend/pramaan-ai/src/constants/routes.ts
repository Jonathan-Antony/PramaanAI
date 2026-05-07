// Application routes
export const ROUTES = {
  HOME: '/',
  INTAKE: '/intake',
  EVALUATION: '/evaluation',
  INVESTIGATION: '/investigation',
  CLOSURE: '/closure',
  REPORTS: '/reports',
} as const;

export type RouteKey = keyof typeof ROUTES;
