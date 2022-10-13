<script lang="ts" setup>
import classnames, {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexBox,
  gap,
  gridTemplateColumns,
  height,
  inset,
  padding,
  position,
  transitionProperty,
  width
} from '@/classnames/tailwind'
import { IAsset } from '@/types'
import { container } from 'tsyringe'
import { AssetsSearchService, Filters } from '@/services/assets-search.service'
import { LocalStorageService } from '@/services/localStorage.service'
import { useDebounce } from '@/composables/useDebounce'

type FiltersProps = {
  assets: IAsset[]
}

const props = defineProps<FiltersProps>()

const filtersContainerClasses = classnames(
  display('hidden', 'md:grid'),
  gridTemplateColumns('md:grid-cols-3', 'lg:grid-cols-6'),
  gap('gap-y-1', 'md:gap-y-6', 'md:gap-x-6')
)
const filtersMenuClasses = classnames(
  display('!grid'),
  gridTemplateColumns('grid-cols-1'),
  gap('gap-y-1'),
  position('fixed', 'md:static'),
  inset('inset-0'),
  padding('py-8', 'pb-32', 'px-4', 'md:p-0'),
  backgroundColor('bg-white', 'md:bg-transparent')
)
const filtersMenuHeaderClasses = classnames(
  display('flex', 'md:hidden'),
  flexBox('justify-between', 'items-start')
)
const inputContainerClasses = classnames(
  display('flex'),
  gap('gap-x-2'),
  flexBox('items-center')
)

const filtersButtonClasses = classnames(
  display('md:hidden'),
  width('w-10'),
  height('h-10'),
  borderWidth('border'),
  borderColor('border-optic-gray'),
  borderRadius('rounded-lg'),
  backgroundColor('hover:bg-optic-gray'),
  transitionProperty('transition-colors')
)

const cardTableClasses = classnames(
  display('grid'),
  gridTemplateColumns('sm:grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3'),
  gap('gap-y-6', 'md:gap-6')
)

const filtersClasses = computed(() => {
  return {
    [filtersContainerClasses]: true,
    [filtersMenuClasses]: showFiltersMenu.value
  }
})

const localStorageService: LocalStorageService = inject('localStorageService')
const assetSearchService = reactive(container.resolve(AssetsSearchService))

const route = useRoute()
const currentPath = computed(() => route.name as string)
const showFiltersMenu = ref(false)
const filters = localStorageService.get(
  `filters.${currentPath.value}`
) as Filters

if (filters) assetSearchService.filters = filters

const foundAssets = computed(() => assetSearchService.foundAssets)

function handleAssetsChange(): void {
  assetSearchService.setAssetsToSearch(props.assets)
  assetSearchService.findAssets()
}

function findAssets(): void {
  assetSearchService.findAssets()
}

const debounceFindAssets = useDebounce(() => {
  findAssets()
}, 500)

function openFiltersMenu() {
  showFiltersMenu.value = true
}

function closeFiltersMenu() {
  showFiltersMenu.value = false
}

watch(
  () => props.assets,
  () => {
    handleAssetsChange()
  },
  {
    immediate: true
  }
)

watch(assetSearchService.filters, () => {
  localStorageService.set(
    `filters.${currentPath.value}`,
    assetSearchService.filters
  )
})
</script>

<template>
  <div :class="inputContainerClasses">
    <Input
      v-model="assetSearchService.search"
      @input="debounceFindAssets"
      placeholder="Search assets by name or symbol"
      icon="search"
    />
    <button size="sm" :class="filtersButtonClasses" disabled>
      <Icon @click="openFiltersMenu" name="filter" />
    </button>
  </div>
  <div :class="filtersClasses">
    <div :class="filtersMenuHeaderClasses">
      <span>Filters</span>
      <button @click="closeFiltersMenu">
        <Icon name="x" />
      </button>
    </div>
    <RangeInput
      v-for="filterKey in Object.keys(assetSearchService.filters)"
      :key="filterKey"
      v-model="assetSearchService.filters[filterKey]"
      @apply="findAssets"
      :label="filterKey"
    />
  </div>
  <div v-if="foundAssets.length" :class="cardTableClasses">
    <Card v-for="asset of foundAssets" :key="asset.id" :asset="asset" />
  </div>
  <NoResults v-else />
</template>
