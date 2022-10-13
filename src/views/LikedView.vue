<script setup lang="ts">
import { AssetsService } from '@/services/assets.service'

const assetsService: AssetsService = inject('assetsService')
</script>

<template>
  <MainLayout>
    <CardList :assets="assetsService.likedAssets" />
  </MainLayout>
</template>
