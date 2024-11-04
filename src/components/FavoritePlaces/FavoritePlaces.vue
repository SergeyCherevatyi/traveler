<script setup>
import FavoritePlace from '@/components/FavoritePlace/FavoritePlace.vue'
import IButton from '@/components/IButton/IButton.vue'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useModal } from '@/composables/useModal.js'
import EditPlaceModal from '@/components/EditPlaceModal/EditPlaceModal.vue'
import { computed, ref } from 'vue'
import { useMutation } from '@/composables/useMutation.js'
import { deleteFavoritePlace, updateFavoritePlace } from '@/api/favorite-places/index.js'
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal.vue'

// Examples of using ref and reactive
// const counter = ref(0)
// const user = ref({
//   name: 'John Doe',
//   age: 25
// })
// const superUser = reactive({
//   name: 'Super User',
//   age: 1000
// })
//
// const changeUsername = () => {
//   user.value.name = 'Harry Potter' // c ref використовуємо value
// }
//
// const changeSuperUsername = () => {
//   superUser.name = 'Super User 2' // c reactive не потрібно використовувати value
// }
//


const props = defineProps({
  items: {
    required: true,
    type: Array
  },
  activeId: {
    type: [String, null],
    required: true
  }
})
const { isOpen: isEditOpen, openModal: editOpen, closeModal: editClosed } = useModal()

const { isOpen: isConfModalOpen, openModal: openConfModal, closeModal: closeConfModal } = useModal()


const selectedId = ref(null)
const selectedItem = computed(() => props.items.find(place => place.id === selectedId.value))

const handleEditPlace = (id) => {
  selectedId.value = id
  editOpen()
}

const { mutation: updatePlace, isLoading } = useMutation({
  mutationFn: (formData) => updateFavoritePlace(formData),
  onSuccess: () => {
    editClosed()
    emit('updated')
  }
})

const { mutation: deletePlace, isLoading: isDelete, error: deleteError } = useMutation({
  mutationFn: (id) => deleteFavoritePlace(id),
  onSuccess: () => {
    idOfDeletedItem.value = null
    closeConfModal()
    emit('updated')
  }
})

const handleSubmit = (formData) => {
  updatePlace(formData)
}

const idOfDeletedItem = ref(null)

const handleOpenConfModal = (id) => {
  openConfModal()
  idOfDeletedItem.value = id
}

const handleDeletePlace = () => {
  deletePlace(idOfDeletedItem.value)
}


const emit = defineEmits(['place-clicked', 'create', 'updated'])


</script>

<template>
  <div class="px-6 text-black">
    <div class="text-gray mb-4">Додані маркери</div>
    <div v-if="items.length === 0">Список порожній</div>

    <FavoritePlace
      v-for="place in props.items"
      :key="place?.id"
      :title="place?.description"
      :description="place?.description"
      :img="place?.img"
      :is-active="place?.id === props?.activeId"
      @click="emit('place-clicked', place.id)"
      @edit="handleEditPlace(place.id)"
      @delete="handleOpenConfModal(place.id)"
    />
    <EditPlaceModal
      :is-open="isEditOpen"
      :place="selectedItem"
      @close="editClosed"
      @submit="handleSubmit"
      :is-loading="isLoading"
    />

    <ConfirmationModal
      :is-open="isConfModalOpen"
      @cancel="closeConfModal"
      :has-error="deleteError"
      :is-loading="isDelete"
      title="Ви дійсно хочете видалити улюблене місце?"
      @confirm="handleDeletePlace"
    />
    <IButton class="w-full mt-10" variant="gradient" @click="emit('create')">Додати маркер</IButton>
  </div>
</template>

<style scoped>

</style>
