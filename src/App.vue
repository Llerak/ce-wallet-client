<template>
  <div class="flex w-[100vw] h-[100vh] relative">
    <SideBarView
      v-if="
        hasPermission(permissions.viewDashboard) &&
        router.currentRoute.value.name !== 'login'
      "
      class="absolute top-0 left-0"
    />
    <div>
      <header></header>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { hasPermission, permissions } from './store/RolesAndPermission';
import SideBarView from './views/SideBarView.vue';
import router from './router';
</script>
