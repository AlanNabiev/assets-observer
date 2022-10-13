import { injectable } from 'tsyringe'

@injectable()
export class LocalStorageService {
  public get(key: string): unknown {
    try {
      const serializedData = localStorage.getItem(key)
      if (serializedData === null) {
        return undefined
      }

      return JSON.parse(serializedData)
    } catch (_) {
      return undefined
    }
  }

  public set(key: string, value: unknown): void {
    try {
      const serializedData = JSON.stringify(value)
      localStorage.setItem(key, serializedData)
    } catch (err) {
      console.warn(err)
    }
  }

  public remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (err) {
      console.warn(err)
    }
  }
}
