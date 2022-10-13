import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { injectable } from 'tsyringe'

export type httpHeaders = Readonly<Record<string, string>>
export type httpURL = Readonly<string>

@injectable()
export class httpClientFactory {
  private httpClient: AxiosInstance
  constructor(baseURL: httpURL, headers: httpHeaders) {
    this.httpClient = axios.create({
      baseURL,
      headers
    })
  }

  public get(url: string, data?: object): Promise<AxiosResponse> {
    return this.httpClient({
      method: 'get',
      url,
      params: data
    })
  }

  public post(url: string, data: object): Promise<AxiosResponse> {
    return this.httpClient({
      method: 'post',
      url,
      data
    })
  }
}
