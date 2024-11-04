<script setup>
import FavoritePlaces from '@/components/FavoritePlaces/FavoritePlaces.vue'
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import { mapSettings } from '@/map/settings.js'
import MarkerIcon from '@/components/icons/MarkerIcon.vue'
import { computed, onMounted, ref } from 'vue'
import { addFavoritePlace, getFavoritePlaces } from '@/api/favorite-places/index.js'
import { useModal } from '@/composables/useModal.js'
import CreateNewPlaceModal from '@/components/CreateNewPlaceModal/CreateNewPlaceModal.vue'
import { useMutation } from '@/composables/useMutation.js'
import UserInfo from '@/components/UserInfo/UserInfo.vue'
import LogoutButton from '@/components/LogoutButton/LogoutButton.vue'


const activeId = ref(null)
const map = ref(null)
const mapMarkerLngLat = ref(null)
const { isOpen, openModal, closeModal } = useModal()

const {data, mutation: getPlaces} = useMutation({
  mutationFn: () => getFavoritePlaces()
})

const favoritePlaces = computed(() => data.value ?? [])


const {
  mutation: addPlace,
  isLoading: isAddingPlace,
  error
} = useMutation({
  mutationFn: newPlaceData => addFavoritePlace(newPlaceData),
  onSuccess: async () => {
    closeModal()
    mapMarkerLngLat.value = null
    await getPlaces()
  }
})

const changeActiveId = (id) => {
  activeId.value = id
}

const changePlace = (id) => {
  const { coordinates } = favoritePlaces.value.find((place) => place.id === id)
  changeActiveId(id)
  map.value.flyTo({ center: coordinates })
}

const handleMapClick = ({ lngLat }) => {
  mapMarkerLngLat.value = [lngLat.lng, lngLat.lat]
}

const handleAddPlace = async (formData, resetForm) => {
  const body = {
    ...formData,
    coordinates: mapMarkerLngLat.value
  }

  await addPlace(body)
  resetForm()
}

onMounted(async () => {
  await getPlaces()
})

</script>

<template>
  <main class="flex h-screen">
    <div class="bg-white h-screen w-[400px] shrink-0 overflow-auto pb-10">
      <UserInfo />
      <FavoritePlaces
        :items="favoritePlaces"
        :activeId="activeId"
        @place-clicked="changePlace"
        @create="openModal"
        @updated="getPlaces"
      />

      <LogoutButton class="mt-10" />

      <CreateNewPlaceModal
        :isOpen="isOpen"
        :isLoading="isAddingPlace"
        :has-error="error"
        @close="closeModal"
        @submit="handleAddPlace"
      />
    </div>
    <div class="w-full h-full flex items-center justify-center text-6xl ">
      <MapboxMap
        class="w-full h-full"
        :center="[30.523333, 50.450001]"
        :zoom="10"
        :access-token="mapSettings.apiToken"
        :map-style="mapSettings.style"
        @mb-click="handleMapClick"
        @mb-created="(mapInstance) => (map = mapInstance)"
      >
        <MapboxMarker v-if="mapMarkerLngLat" :lngLat="mapMarkerLngLat" anchor="bottom">
          <MarkerIcon class="h-8 w-8" is-active />
        </MapboxMarker>
        <MapboxMarker
          v-for="place in favoritePlaces"
          :key="place.id"
          :lngLat="place.coordinates"
          anchor="bottom"
        >
          <button @click.stop="changeActiveId(place.id)">
            <MarkerIcon class="h-8 w-8" />
          </button>
        </MapboxMarker>
      </MapboxMap>

      <!--<MapboxMap-->
      <!--  class="w-full h-full"-->
      <!--  :access-token="mapSettings.apiToken"-->
      <!--  :map-style="mapSettings.style"-->
      <!--  :center="[30.523333, 50.450001]"-->
      <!--  :zoom="10"-->
      <!--  @click-click="handleMapClick"-->
      <!--  @mb-created="(mapInstance) => (map = mapInstance)"-->
      <!--&gt;-->
      <!--  <MapboxMarker-->
      <!--    v-for="place in favoritePlaces"-->
      <!--    :key="place.id"-->
      <!--    :lngLat="place.lngLat"-->
      <!--  >-->
      <!--    <button @click="changeActiveId(place.id)">-->
      <!--      <MarkerIcon class="h-8 w-8" />-->
      <!--    </button>-->
      <!--  </MapboxMarker>-->
      <!--</MapboxMap>-->
    </div>
  </main>
</template>

<style scoped>

</style>
