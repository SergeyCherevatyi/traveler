<script setup>
import { reactive, toRaw } from 'vue'
import IInput from '@/components/IInput/IInput.vue'
import IButton from '@/components/IButton/IButton.vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])
const userData = reactive({
  email: '',
  password: ''
})



// watch(userData,
//   (newVal) => {
//   console.log(newVal)
// }, { immediate: true }) // Щоб відразу спрацював watch при першому рендері
</script>

<template>
  <form @submit.prevent="emit('submit', toRaw(userData))">
    <IInput
      class="mb-4"
      placeholder="email@gmail.com"
      label="Електронна пошта"
      v-model="userData.email"
    />
    <IInput
      label="Пароль"
      type="password"
      v-model="userData.password"
    />
    <IButton
      class="mt-10 w-full"
      variant="gradient"
      type="submit"
      :is-loading="props.isLoading"
    >Увійти</IButton>
  </form>
</template>

<style scoped>

</style>
