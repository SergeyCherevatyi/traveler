<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
</script>

<template>
  <BaseLayout >
    <section class="w-full bg-white p-10 rounded-2xl">
      <div class="flex justify-center gap-10 mb-10">
        <RouterLink
          to="registration"
          class="text-gray"
          exact-active-class="text-primary"
        >
          Створити аккаунт
        </RouterLink>
        <RouterLink
          to="login"
          class="text-gray"
          exact-active-class="text-primary"
        >
          Увійти
        </RouterLink>
      </div>
      <RouterView />
    </section>
  </BaseLayout>
</template>

