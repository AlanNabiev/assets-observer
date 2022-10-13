<script setup lang="ts">
import { classnames, display, flexBox } from '@/classnames/tailwind'

import feather from 'feather-icons'

type Size = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type IconProps = {
  name: string
  size?: Size
  filled?: boolean
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 'md',
  filled: false
})

const iconClasses = classnames(
  display('flex'),
  flexBox('justify-center', 'items-center')
)

const iconSize = computed(() => {
  switch (props.size) {
    case 'xxs':
      return '8'
    case 'xs':
      return '12'
    case 'sm':
      return '16'
    case 'lg':
      return '24'
    case 'xl':
      return '28'
    default:
      return '20'
  }
})

const fill = computed(() => {
  return props.filled ? 'currentColor' : 'none'
})

onMounted(() => feather.replace())
</script>

<template>
  <div :class="iconClasses">
    <i :data-feather="name" :width="iconSize" :height="iconSize" :fill="fill" />
  </div>
</template>
