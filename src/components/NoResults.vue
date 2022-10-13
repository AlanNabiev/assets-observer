<script lang="ts" setup>
import {
  classnames,
  display,
  flexBox,
  fontSize,
  fontWeight,
  margin
} from '@/classnames/tailwind'

const noResultsClasses = classnames(
  fontSize('text-4xl'),
  fontWeight('font-bold'),
  display('flex'),
  flexBox('justify-center', 'items-center'),
  margin('mt-12')
)
</script>

<template>
  <div :class="noResultsClasses">NO RESULTS</div>
</template>
