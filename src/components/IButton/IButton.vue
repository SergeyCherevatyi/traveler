<script setup>
import { computed, toRefs } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'gradient', 'outlined'].includes(value)
    }
  },
  to: String,
  isLoading: {
    type: Boolean,
    default: false
  }
})

// const {variant} = toRefs(props) // Приклад дестуктуризації props, але теперь треба писати variant.value


const bgStyles = computed(() => {
  return props.variant === 'gradient'
    ? 'bg-gradient-to-r from-[#FFA279] to-[#F3743D]'
    : 'bg-[#FFA279]'
})



const isRouterLink = computed(() => {
  return !!props.to
})

const componentName = computed(() => {
  return isRouterLink.value ? 'router-link' : 'button'
})

const link = computed(() => {
  return isRouterLink.value ? props.to : undefined
})

</script>

<template>
  <component
    :is="componentName"
    :to="link"
    class="rounded-xl py-3.5 px-10 text-white font-bold tracking-wider"
    :class="bgStyles"
  >
    <template v-if="props.isLoading">Loading ...</template>
    <template v-else>
      <slot></slot>
    </template>
  </component>
</template>

<style scoped>

</style>
