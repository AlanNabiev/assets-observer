<script setup lang="ts">
import classnames, {
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  display,
  flexBox,
  flexDirection,
  margin,
  maxHeight,
  maxWidth,
  padding,
  space
} from '@/classnames/tailwind'

const navBarContainerClasses = classnames(
  display('flex'),
  flexBox('justify-start'),
  flexDirection('md:flex-col'),
  borderRadius('rounded-lg'),
  boxShadow('shadow-lg'),
  maxWidth('md:max-w-min'),
  maxHeight('max-h-36'),
  padding('p-2', 'md:p-0')
)

const navBarHeaderClasses = classnames(
  padding('px-2.5', 'md:p-2.5'),
  margin('md:mx-auto')
)

const navBarButton = classnames(
  display('flex'),
  flexDirection('md:flex-col'),
  space('space-x-2.5', 'md:space-x-0', 'md:space-y-2.5'),
  padding('px-2.5', 'md:p-2.5'),
  borderWidth('border-l', 'md:border-r-0', 'md:border-t'),
  borderColor(
    'border-l-optic-gray',
    'md:border-l-transparent',
    'md:border-t-optic-gray'
  )
)

const routes = [
  {
    icon: 'home',
    to: '/'
  },
  {
    icon: 'heart',
    to: '/liked'
  }
]
</script>

<template>
  <div :class="navBarContainerClasses">
    <div :class="navBarHeaderClasses">
      <img
        src="@/assets/optic-logo.svg"
        width="25"
        height="35"
        alt="optic-logo"
      />
    </div>
    <div :class="navBarButton">
      <NavIcon
        v-for="route in routes"
        :to="route.to"
        :key="route.to"
        :name="route.icon"
      />
    </div>
  </div>
</template>
