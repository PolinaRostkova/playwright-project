/**
 * Test data — user accounts.
 *
 * HOW TO USE:
 * - Credentials are read from your .env.local file
 * - Fill in your .env.local first, then use these objects in tests
 */

export interface User {
  email:     string
  password:  string
  role:      'admin' | 'user' | 'viewer'
  firstName?: string
  lastName?:  string
}

// Standard user — credentials come from .env.local
export const standardUser: User = {
  email:    process.env.USER_EMAIL    || '',
  password: process.env.USER_PASSWORD || '',
  role:     'user',
}

// Admin user — credentials come from .env.local
export const adminUser: User = {
  email:    process.env.ADMIN_EMAIL    || '',
  password: process.env.ADMIN_PASSWORD || '',
  role:     'admin',
}

// Generate a unique email for each test run
// Use this when creating a new user in a test
export function uniqueEmail(prefix = 'test'): string {
  return `${prefix}+${Date.now()}@example.com`
}
