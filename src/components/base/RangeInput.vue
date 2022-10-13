<script lang="ts" setup>
import classnames, {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  cursor,
  display,
  flexBox,
  flexDirection,
  fontSize,
  gap,
  gridTemplateColumns,
  height,
  inset,
  padding,
  position,
  rotate,
  textColor,
  transforms,
  transitionProperty,
  width,
  zIndex
} from '@/classnames/tailwind'
import { abbreviateNumber } from '@/helpers/number'
import { usFirst } from '@/helpers/string'
import { FilterValue } from '@/services/assets-search.service'

type RangeInputProps = {
  modelValue: FilterValue
  tabIndex?: number
  label?: string
  placeholder?: string
}

type RangeInputEmits = {
  (e: 'update:modelValue', sortingInterval: FilterValue): void
  (e: 'apply'): void
}

const props = withDefaults(defineProps<RangeInputProps>(), {
  tabIndex: 0,
  placeholder: 'Select interval'
})

const emit = defineEmits<RangeInputEmits>()

const rangeInputContainerClasses = classnames(
  display('flex'),
  flexDirection('flex-col'),
  width('w-full')
)

const rangeInputLabelClasses = classnames(
  fontSize('text-xs'),
  textColor('text-stone-500'),
  cursor('cursor-pointer'),
  width('w-max')
)

const dropdownClasses = classnames(
  backgroundColor('bg-gray-50'),
  borderWidth('border'),
  borderColor('border-optic-purple'),
  borderRadius('rounded-lg'),
  fontSize('text-sm'),
  width('w-full'),
  padding('py-2', 'px-1'),
  display('grid'),
  gridTemplateColumns('grid-cols-2'),
  gap('gap-2.5'),
  position('absolute'),
  inset('top-12'),
  zIndex('z-10')
)

const rangeInputClasses = computed(() =>
  classnames(
    backgroundColor('bg-gray-50'),
    borderWidth('border'),
    borderColor(
      showDropdown.value ? 'border-optic-purple' : 'border-optic-gray'
    ),
    borderRadius('rounded-lg'),
    fontSize('text-sm'),
    width('w-full'),
    height('h-10'),
    position('relative')
  )
)

const iconClasses = computed(() =>
  classnames(
    textColor('text-optic-black'),
    transforms('transform-gpu'),
    transitionProperty('transition-transform'),
    rotate(showDropdown.value ? 'rotate-180' : 'rotate-0')
  )
)

const buttonClasses = computed(() =>
  classnames(
    width('w-full'),
    height('h-full'),
    textColor(props.modelValue.length ? 'text-optic-black' : 'text-optic-gray'),
    display('flex'),
    flexBox('justify-between', 'items-center'),
    padding('px-2.5')
  )
)

const ucLabel = computed(() => usFirst(props.label))

const currentInterval = computed(() => {
  if (!props.modelValue.length) return props.placeholder
  return (
    ((props.modelValue[0] && abbreviateNumber(props.modelValue[0])) || '...') +
    ' - ' +
    ((props.modelValue[1] && abbreviateNumber(props.modelValue[1])) || '...')
  )
})

const showDropdown = ref(false)
const from = ref<number>(props.modelValue[0] || null)
const to = ref<number>(props.modelValue[1] || null)

function toggle(): void {
  showDropdown.value = !showDropdown.value
}

function close(): void {
  showDropdown.value = false
}

function apply(): void {
  emit('update:modelValue', [from.value, to.value])
  emit('apply')
  close()
}

function clear(): void {
  to.value = null
  from.value = null
  emit('update:modelValue', [])
  emit('apply')
  close()
}
</script>

<template>
  <div
    v-click-outside="close"
    :class="rangeInputContainerClasses"
    :tabIndex="tabIndex"
  >
    <label v-if="label" @click="toggle" :class="rangeInputLabelClasses">{{
      ucLabel
    }}</label>
    <div :class="rangeInputClasses">
      <button @click="toggle" :class="buttonClasses">
        {{ currentInterval }}
        <Icon name="chevron-down" :class="iconClasses" />
      </button>
      <div v-if="showDropdown" :class="dropdownClasses">
        <Input v-model="from" type="number" placeholder="From" size="sm" />
        <Input v-model="to" type="number" placeholder="To" size="sm" />
        <Button @click="apply" size="sm">Apply</Button>
        <Button @click="clear" size="sm">Clear</Button>
      </div>
    </div>
  </div>
</template>
