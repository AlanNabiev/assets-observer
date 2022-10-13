<script lang="ts" setup>
import {
  classnames,
  display,
  flexDirection,
  gap,
  margin,
  width
} from '@/classnames/tailwind'

const mainLayoutClasses = classnames(
  width('w-full'),
  margin('md:mx-4'),
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6')
)
</script>

<template>
  <section :class="mainLayoutClasses">
    <slot />
  </section>
</template>
