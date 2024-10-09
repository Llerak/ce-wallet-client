<template>
  <LoadingView />
  <div class="flex w-[100vw] h-[100vh] relative bg-[#f8f9fa]">
    <SideBarView
      v-if="hasPermission(permissions.viewDashboard) && !isLoginRoute"
      class="absolute top-0 left-0"
    />
    <div
      class="flex flex-col w-full p-6"
      :class="{ 'pl-[304px]': !isLoginRoute, 'pl-0': isLoginRoute }"
    >
      <HeaderView v-if="!isLoginRoute" />

      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { hasPermission, permissions } from './store/RolesAndPermission';
import SideBarView from './views/SideBarView.vue';
import LoadingView from './views/LoadingView.vue';
import HeaderView from './views/HeaderView.vue';
import router from './router';
import { ref, watch } from 'vue';

watch(
  () => router.currentRoute.value.name,
  (newRouteName) => {
    isLoginRoute.value = newRouteName === 'login';
  }
);

const isLoginRoute = ref(router.currentRoute.value.name == 'login');
</script>
