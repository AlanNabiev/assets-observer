<script setup lang="ts">
import {
  classnames,
  backgroundColor,
  borderRadius,
  cursor,
  display,
  flexBox,
  height,
  textColor,
  width
} from '@/classnames/tailwind'

type NavIconProps = {
  name?: string
  to: string
}

defineProps<NavIconProps>()

const navLinkClasses = classnames(
  width('w-8'),
  height('h-8'),
  borderRadius('rounded-lg'),
  display('flex'),
  flexBox('justify-center', 'items-center'),
  textColor('hover:text-optic-purple'),
  cursor('hover:cursor-pointer')
)

const navLinkActiveClasses = classnames(
  backgroundColor('bg-optic-violet'),
  textColor('text-optic-purple')
)
</script>

<template>
  <div>
    <router-link
      :to="to"
      :class="navLinkClasses"
      :exact-active-class="navLinkActiveClasses"
      exact
      ><Icon :name="name" size="lg"
    /></router-link>
  </div>
</template>
