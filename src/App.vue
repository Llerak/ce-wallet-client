<script setup lang="ts">
import { StatusUserLog } from './store/StatusUserLog';
</script>

<template>
  <div class="flex w-[100vw] h-[100vh] relative">
    <div
      v-has-permission="'viewDashboard'"
      class="absolute top-0 left-0 w-64 h-[100vh] bg-slate-600"
    ></div>
    <div>
      <header></header>
      <router-view />
    </div>
  </div>
  <button
    class="absolute bottom-0 right-1"
    @click="() => console.log(StatusUserLog)"
  >
    test
  </button>
</template>
