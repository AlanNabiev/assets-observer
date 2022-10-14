import { httpClientFactory } from './httpClientFactory'
import type { httpHeaders, httpURL } from './httpClientFactory'
import { injectable } from 'tsyringe'

const BASE_URL: httpURL = 'https://api.coincap.io/v2'
const HEADERS: httpHeaders = {
  'Content-Type': 'application/json'
}

@injectable()
export class coincapHttpClient extends httpClientFactory {
  constructor() {
    super(BASE_URL, HEADERS)
  }
}
