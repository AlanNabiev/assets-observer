import { IAsset } from '@/types'
import { injectable } from 'tsyringe'

export type FilterName =
  | 'priceUsd'
  | 'marketCapUsd'
  | 'volumeUsd24Hr'
  | 'changePercent24Hr'
  | 'supply'
  | 'maxSupply'
export type FilterValue = [number | null, number | null] | []
export type Filters = Record<FilterName, FilterValue>

@injectable()
export class AssetsSearchService {
  private assetsToSearch: IAsset[]
  public foundAssets: IAsset[]
  public search = ''
  public filters: Filters = {
    priceUsd: [],
    marketCapUsd: [],
    volumeUsd24Hr: [],
    changePercent24Hr: [],
    supply: [],
    maxSupply: []
  }

  public setAssetsToSearch(assets: IAsset[]) {
    this.assetsToSearch = assets
  }

  public findAssets() {
    this.foundAssets = this.assetsToSearch

    for (const filterKey in this.filters) {
      if (this.filters[filterKey].length) {
        this.foundAssets = this.foundAssets.filter((asset) => {
          const numberValue = Number(asset[filterKey])
          const lowInInterval = this.filters[filterKey][0]
            ? numberValue > this.filters[filterKey][0]
            : true
          const highInInterval = this.filters[filterKey][1]
            ? numberValue < this.filters[filterKey][1]
            : true
          return lowInInterval && highInInterval
        })
      }
    }

    if (!this.search) return
    this.foundAssets = this.foundAssets.filter((asset) => {
      return (
        asset.name.toLowerCase().includes(this.search.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(this.search.toLowerCase())
      )
    })
  }
}
