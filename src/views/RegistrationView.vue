<script setup>
import RegistrationForm from '@/components/Auth/RegistrationForm/RegistrationForm.vue'
import { registerUser } from '@/api/user/index.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useMutation } from '@/composables/useMutation.js'
import { authService } from '@/authService/index.js'

const router = useRouter()
const { data, isLoading, error, mutation: handleRegisterUser} = useMutation({
  mutationFn: data => authService.registerUser(data),
  onSuccess: () => router.replace('/map')
})

// const isLoading = ref(false)
// const handleRegisterUser = async (userData) => {
//   isLoading.value = true
//   try {
//     await registerUser(userData)
//     router.replace('/map')
//   } catch (e) {
//     console.error(e)
//   } finally {
//     isLoading.value = false
//   }
// }
</script>

<template>
  <RegistrationForm @submit="handleRegisterUser" :is-loading="isLoading"/>
  <div v-if="error" class="text-red-500" >{{ error.message }}</div>
</template>

