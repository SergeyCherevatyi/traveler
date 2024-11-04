<script setup>

import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  }
})

defineOptions({
  inheritAttrs: false // Щоб не передавались всі атрибути на обгортку, а лише на input, по дефолту додається і туди і туди  коли використовуємо v-bind="{...$props, ...$attrs}"
})

const emit = defineEmits(['update:modelValue'])
const baseStyles = 'w-full text-sm rounded-[4px] border-[#eaeaea] border-[1px] py-2 px-3 focus:outline-primary'

const isTextarea = computed(() => props.type === 'textarea')
const inputStyles = computed(() => isTextarea.value ? baseStyles + ' resize-none' : baseStyles)

const componentName = computed(() => {
  return isTextarea.value ? 'textarea' : 'input'
})
</script>

<template>
  <div class="w-full text-[#2C2C2C]">
    <label class="block">
      <span class="block text-xs px-3 mb-2">{{ props.label }}</span>
      <component
        :is="componentName"
        :class="inputStyles"
        v-bind="{...$props, ...$attrs}"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
      ></component>
    </label>
  </div>
</template>
