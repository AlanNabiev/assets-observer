<script setup lang="ts">
import {
  classnames,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  cursor,
  fontSize,
  padding,
  textColor,
  transitionProperty,
  width
} from '@/classnames/tailwind'

type ButtonProps = {
  size?: 'sm' | 'md'
  disabled?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'md',
  disabled: false
})

const btnPaddings = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'p-1'
    default:
      return 'p-2.5'
  }
})

const btnClasses = computed(() =>
  classnames(
    borderWidth('border'),
    borderColor('border-optic-purple', 'disabled:border-optic-gray'),
    backgroundColor(
      props.disabled ? 'hover:bg-transparent' : 'hover:bg-optic-purple'
    ),
    textColor(props.disabled ? 'hover:text-black' : 'hover:text-white'),
    transitionProperty('transition-colors'),
    borderRadius('rounded-lg'),
    fontSize('text-sm'),
    width('w-full'),
    cursor(props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'),
    padding(btnPaddings.value)
  )
)
</script>

<template>
  <button v-bind="$attrs" :class="btnClasses" :disabled="disabled">
    <slot />
  </button>
</template>
