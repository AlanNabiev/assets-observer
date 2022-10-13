<script setup lang="ts">
import {
  classnames,
  container,
  display,
  flexDirection,
  fontFamily,
  gap,
  margin,
  padding,
  textColor,
  width
} from '@/classnames/tailwind'
import { container as tsyringeContainer } from 'tsyringe'
import { AssetsService } from '@/services/assets.service'
import { LocalStorageService } from '@/services/localStorage.service'

const appContainerClasses = classnames(
  textColor('text-optic-black'),
  fontFamily('font-inter'),
  container('container'),
  margin('mx-auto', 'mt-12', 'md:mt-24'),
  padding('px-3', 'md:px-0'),
  display('flex'),
  gap('gap-y-6', 'md:gap-y-0'),
  flexDirection('flex-col', 'md:flex-row'),
  width('w-full')
)

const assetsService = reactive(tsyringeContainer.resolve(AssetsService))
const localStorageService = tsyringeContainer.resolve(LocalStorageService)

provide('assetsService', assetsService)
provide('localStorageService', localStorageService)

onMounted(async () => {
  await assetsService.initAssets()
})

watch(
  () => assetsService.assets,
  () => {
    localStorageService.set('assets', assetsService.assets)
  },
  {
    deep: true
  }
)
</script>

<template>
  <main :class="appContainerClasses">
    <NavBar />
    <RouterView />
  </main>
</template>
