import { coincapHttpClient } from '@/api/coincapClient'
import { IAsset } from '@/types'
import { injectable, inject, delay } from 'tsyringe'

const END_POINT: Readonly<string> = '/assets'

@injectable()
export class AssetsApiService {
  constructor(
    @inject(delay(() => coincapHttpClient))
    private readonly http: coincapHttpClient
  ) {}
  async getAssets(): Promise<IAsset[]> {
    return (await this.http.get(END_POINT)).data.data
  }
}
