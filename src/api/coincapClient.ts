import { httpClientFactory } from './httpClientFactory'
import type { httpHeaders, httpURL } from './httpClientFactory'

const BASE_URL: httpURL = 'https://api.coincap.io/v2'
const HEADERS: httpHeaders = {
  'Content-Type': 'application/json'
}

export class coincapHttpClient extends httpClientFactory {
  constructor() {
    super(BASE_URL, HEADERS)
  }
}
