<script lang="ts" setup>
import {
  classnames,
  boxShadow,
  cursor,
  display,
  flexBox,
  fontSize,
  fontWeight,
  padding,
  textColor,
  borderRadius,
  margin,
  maxWidth,
  borderWidth,
  transitionProperty
} from '@/classnames/tailwind'
import { abbreviateNumber } from '@/helpers/number'
import { AssetsService } from '@/services/assets.service'
import type { IAsset } from '@/types'

type CardProps = {
  asset: IAsset
}

const props = defineProps<CardProps>()

const cardClasses = classnames(
  display('flex'),
  flexBox('flex-col'),
  boxShadow('shadow-inner', 'hover:shadow-lg'),
  borderWidth('border'),
  transitionProperty('transition-all'),
  padding('px-5', 'py-8'),
  maxWidth('md:max-w-full'),
  borderRadius('rounded-lg')
)

const cardHeaderClasses = classnames(
  display('flex'),
  flexBox('justify-between', 'items-center'),
  fontSize('text-4xl'),
  fontWeight('font-semibold')
)

const cardSubHeaderClasses = classnames(fontSize('text-lg'))

const cardInfoClasses = classnames(fontWeight('font-semibold'), margin('ml-2'))

const cardIconClasses = computed(() =>
  classnames(
    textColor(
      props.asset.liked ? 'text-optic-purple' : 'text-optic-black',
      'hover:text-optic-purple'
    ),
    cursor('cursor-pointer')
  )
)

const formattedAsset = computed(() => {
  return {
    ...props.asset,
    priceUsd: abbreviateNumber(props.asset.priceUsd),
    marketCapUsd: abbreviateNumber(props.asset.marketCapUsd),
    volumeUsd24Hr: abbreviateNumber(props.asset.volumeUsd24Hr),
    changePercent24Hr: Number(props.asset.changePercent24Hr).toFixed(2),
    supply: abbreviateNumber(props.asset.supply) + ' ' + props.asset.symbol,
    maxSupply: props.asset.maxSupply
      ? abbreviateNumber(props.asset.maxSupply) + ' ' + props.asset.symbol
      : '-'
  }
})

const assetsService = inject('assetsService') as AssetsService

function toggleLikedById(id: string, value: boolean): void {
  assetsService.setLikedById(id, !value)
}
</script>

<template>
  <div :class="cardClasses">
    <div :class="cardHeaderClasses">
      <p>{{ formattedAsset.symbol }}</p>
      <div @click="toggleLikedById(formattedAsset.id, formattedAsset.liked)">
        <Icon
          v-if="formattedAsset.liked"
          :class="cardIconClasses"
          name="heart"
          filled
        />
        <Icon v-else :class="cardIconClasses" name="heart" />
      </div>
    </div>
    <p :class="cardSubHeaderClasses">{{ formattedAsset.name }}</p>
    <ul>
      <li>
        Price:
        <span :class="cardInfoClasses"> {{ formattedAsset.priceUsd }} $ </span>
      </li>
      <li>
        Market Cap:
        <span :class="cardInfoClasses">
          {{ formattedAsset.marketCapUsd }} $
        </span>
      </li>
      <li>
        Volume (24h):
        <span :class="cardInfoClasses">
          {{ formattedAsset.volumeUsd24Hr }} $
        </span>
      </li>
      <li>
        Change % (24h):
        <span :class="cardInfoClasses">
          {{ formattedAsset.changePercent24Hr }} %
        </span>
      </li>
      <li>
        Calculating Supply:
        <span :class="cardInfoClasses">
          {{ formattedAsset.supply }}
        </span>
      </li>
      <li>
        Max Supply:
        <span :class="cardInfoClasses">
          {{ formattedAsset.maxSupply }}
        </span>
      </li>
    </ul>
  </div>
</template>
