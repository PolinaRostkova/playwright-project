/**
 * String utilities — small helpers for test data and assertions.
 */

// Random string — useful for unique names in tests
export function randomString(length = 8): string {
  return Math.random().toString(36).substring(2, 2 + length)
}

// Unique name with timestamp — e.g. "Test User 1712345678901"
export function uniqueName(prefix = 'Test'): string {
  return `${prefix} ${Date.now()}`
}

// Remove extra spaces — useful when reading text from the page
export function cleanText(text: string | null): string {
  return (text ?? '').trim().replace(/\s+/g, ' ')
}
