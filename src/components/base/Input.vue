<script setup lang="ts">
import {
  classnames,
  width,
  position,
  flexBox,
  inset,
  padding,
  textColor,
  display,
  backgroundColor,
  borderWidth,
  borderColor,
  fontSize,
  borderRadius,
  ringColor,
  placeholderColor,
  outlineStyle
} from '@/classnames/tailwind'

type InputProps = {
  modelValue: string | number | null
  disabled?: boolean
  type?: 'text' | 'number'
  placeholder?: string
  icon?: string
  size?: 'md' | 'sm'
}

type InputEmits = {
  (e: 'update:modelValue', modelValue: string | number): void
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: 'Search',
  disabled: false,
  size: 'md'
})

const emit = defineEmits<InputEmits>()

const inputContainerClasses = classnames(position('relative'), width('w-full'))

const inputIconClasses = classnames(
  position('absolute'),
  inset('inset-y-0'),
  display('flex'),
  flexBox('items-center'),
  padding('pl-3'),
  inset('left-0'),
  textColor('text-optic-black')
)

const paddingSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'p-1'
    default:
      return 'p-2'
  }
})

const inputClasses = computed(() =>
  classnames(
    backgroundColor('bg-gray-50'),
    borderWidth('border'),
    borderColor('border-optic-gray', 'focus:border-optic-purple'),
    borderRadius('rounded-lg'),
    placeholderColor('placeholder-optic-gray'),
    fontSize('text-sm'),
    outlineStyle('outline-none'),
    ringColor('focus:ring-transparent'),
    display('block'),
    width('w-full'),
    padding(props.icon ? 'pl-11' : 'pl-1', paddingSize.value)
  )
)

function updateModelValue(e: Event): void {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <div :class="inputContainerClasses">
    <Icon v-if="icon" :class="inputIconClasses" :name="icon" />
    <input
      @input="updateModelValue"
      :value="modelValue"
      :disabled="disabled"
      :type="type"
      :placeholder="placeholder"
      :class="inputClasses"
    />
  </div>
</template>
