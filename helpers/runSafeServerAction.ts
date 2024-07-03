/* eslint-disable @typescript-eslint/no-explicit-any */

import jsonifyError from "./jsonifyError"

/**
 * Will never throw an error.
 * @param fn - the serverAction
 * @param args - the parameters of the serverAction
 */
export default async function runSafeServerAction<F extends (...args: any[]) => Promise<any>>(
  fn: F,
  ...args: Parameters<F>
): Promise<
  | {
      success: true
      result: Awaited<ReturnType<F>>
    }
  | {
      success: false
      result: { message: string; [additionalErrorInfoKey: string]: any }
    }
> {
  try {
    const result: Awaited<ReturnType<F>> = await fn(...args)
    return {
      success: true,
      result,
    }
  } catch (error: Error & any) {
    const errorResult = jsonifyError(error)
    if (!errorResult.message) {
      errorResult.message = `An error occurred with no error message`
    }
    return {
      success: false,
      result: errorResult,
    }
  }
}
