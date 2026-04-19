/**
 * Wait utilities — use when Playwright's built-in waiting is not enough.
 * Example: waiting for a background job or a database record to be ready.
 */

/**
 * Keep trying a function until the result passes your condition.
 *
 * Example:
 * const order = await retryUntil(
 *   () => dbClient.findOrderByRef(ref),
 *   (order) => order?.status === 'processed'
 * )
 */
export async function retryUntil<T>(
  fn: () => Promise<T>,
  predicate: (result: T) => boolean,
  options: { maxAttempts?: number; delayMs?: number } = {}
): Promise<T> {
  const { maxAttempts = 10, delayMs = 500 } = options

  for (let i = 0; i < maxAttempts; i++) {
    const result = await fn()
    if (predicate(result)) return result
    await wait(delayMs)
  }

  throw new Error(`retryUntil: condition was never true after ${maxAttempts} attempts`)
}

/**
 * Simple wait in milliseconds.
 * Only use this when there is no better option.
 * Prefer: waitForURL, waitForResponse, or expect().toBeVisible()
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
