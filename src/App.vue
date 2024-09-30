<template>
  <div class="flex w-[100vw] h-[100vh] relative">
    <div
      v-if="hasPermission(permissions.viewDashboard)"
      class="absolute top-0 left-0 w-64 h-[100vh] bg-slate-600"
    ></div>
    <div>
      <header></header>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { hasPermission, permissions } from './store/RolesAndPermission';
</script>
