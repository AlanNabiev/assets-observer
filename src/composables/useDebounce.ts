type Fn = (...args: unknown[]) => void

export const useDebounce = (fn: Fn, delay: number) => {
  let timeout: number

  return (...args): void => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
