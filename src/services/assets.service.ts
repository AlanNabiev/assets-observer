import { AssetsApiService } from './assets-api.service'
import { injectable, delay, inject, singleton } from 'tsyringe'
import type { IAsset } from '@/types'
import { LocalStorageService } from './localStorage.service'

@singleton()
@injectable()
export class AssetsService {
  public assets: IAsset[]

  constructor(
    @inject(delay(() => AssetsApiService))
    private readonly assetsApiService: AssetsApiService,
    @inject(LocalStorageService)
    private readonly localStorageService: LocalStorageService
  ) {
    this.assets = (this.localStorageService.get('assets') || []) as IAsset[]
  }

  public get likedAssets() {
    return this.assets.filter((asset) => asset.liked)
  }

  public async initAssets(): Promise<void> {
    const assets = await this.assetsApiService.getAssets()
    this.assets = this.initLiked(assets)
  }

  public setLikedById(id: string, value: boolean) {
    this.assets = this.assets.map((asset) => {
      if (asset.id === id) {
        return { ...asset, liked: value }
      }
      return asset
    })
  }

  private initLiked(assets: IAsset[]): IAsset[] {
    const likedId: string[] = this.likedAssets.map((asset) => asset.id)
    return assets.map((token: IAsset) => {
      return {
        ...token,
        liked: likedId.length && likedId.includes(token.id)
      }
    })
  }
}
