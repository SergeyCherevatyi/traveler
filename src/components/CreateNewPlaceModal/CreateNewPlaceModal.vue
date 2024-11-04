<script setup>

import IInput from '@/components/IInput/IInput.vue'
import InputImage from '@/components/InputImage/InputImage.vue'
import IButton from '@/components/IButton/IButton.vue'
import IModal from '@/components/IModal/IModal.vue'
import MarkerIcon from '@/components/icons/MarkerIcon.vue'
import { computed, reactive, ref } from 'vue'

const props = defineProps({
  isOpen: {
    default: false,
    type: Boolean
  },
  isLoading: {
    default: false,
    type: Boolean
  },
  hasError: {
    default: false,
    type: Boolean
  }
})

const emit = defineEmits(['close', 'submit'])
const formData = reactive({
  location: '',
  description: '',
  img: ''
})

const uploadText = computed(() => {
  return formData.img ? 'Натисність тут, щоб змінити фото' : 'Натисність тут, щоб додати фото'
})
const handleUploadImage = (img) => {
  formData.img = img
}

const resetForm = () => {
  formData.location = ''
  formData.description = ''
  formData.img = ''
}

</script>

<template>
  <IModal v-if="props.isOpen" @close="emit('close')">
    <form @submit.prevent="emit('submit', formData, resetForm)" class="min-w-[419px]">
      <div class="flex gap-1 justify-center font-bold text-center mb mb-10">
        <MarkerIcon/> Додати маркер
      </div>
      <IInput label="Локація" class="mb-4" v-model="formData.location" />
      <IInput label="Опис" type="textarea" class="mb-2" v-model="formData.description" />
      <div class="flex gap-2 items-center mb-10">
        <img v-if="formData.img" :src="formData.img" alt="avatar"  class="w-8 h-8 object-cover">
        <InputImage @uploaded="handleUploadImage" >{{ uploadText }}</InputImage>
      </div>
      <IButton class="w-full" variant="gradient" :is-loading="props.isLoading">Додати</IButton>
      <div v-if="hasError" class="text-red-500">Щось пішло не так.</div>
    </form>
  </IModal>

</template>

<style scoped>

</style>
