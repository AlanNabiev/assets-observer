<script setup lang="ts">
import {
  classnames,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  width,
  height,
  outlineStyle,
  margin,
  ringWidth,
  ringColor,
  fontSize,
  cursor,
  textColor
} from '@/classnames/tailwind'

type CheckboxProps = {
  modelValue: boolean
  disabled?: boolean
  label?: string
}

type CheckboxEmits = {
  (e: 'update:modelValue', modelValue: boolean): void
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false
})

const emit = defineEmits<CheckboxEmits>()

const inputClasses = classnames(
  width('w-4.5'),
  height('h-4.5'),
  backgroundColor('bg-gray-100'),
  borderWidth('border'),
  borderRadius('rounded'),
  borderColor('border-gray-400', 'hover:border-gray-400'),
  ringWidth('focus:ring-0'),
  ringColor('ring-transparent'),
  textColor('text-optic-purple'),
  outlineStyle('outline-none'),
  cursor('cursor-pointer')
)

const labelClasses = computed(() =>
  classnames(
    margin('ml-2.5'),
    fontSize('text-sm'),
    textColor(props.modelValue ? 'text-optic-purple' : 'text-optic-black')
  )
)

const id = computed(() => Math.floor(Math.random() * 1000).toString())

function updateModelValue(e: Event): void {
  emit('update:modelValue', (e.target as HTMLInputElement).checked)
}
</script>

<template>
  <div class="flex items-center">
    <input
      @input="updateModelValue"
      :class="inputClasses"
      :checked="modelValue"
      :id="id"
      type="checkbox"
    />
    <label :for="id" :class="labelClasses">{{ label }}</label>
  </div>
</template>
