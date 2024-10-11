<template>
  <LoadingView />
  <div class="flex w-[100vw] min-h-[100vh] h-auto relative bg-[#f8f9fa]">
    <SideBarView
      v-if="hasPermission(permissions.viewDashboard) && !isLoginRoute"
      class="fixed top-0 min-[1200px]:left-0 z-50 transition-all"
      :class="{
        '-left-full': !statusSideBar.visible,
        'left-0': statusSideBar.visible,
      }"
    />

    <div
      class="w-[100vw] h-full z-40 absolute backdrop-blur-[3px] bg-[rgba(0,0,0,0.4)]"
      v-if="statusSideBar.visible"
      @click="statusSideBar.visible = false"
    ></div>
    <div
      class="flex flex-col w-full min-[1200px]:p-6"
      :class="{
        'min-[1200px]:pl-[290px] p-6  ': !isLoginRoute,
        'p-0': isLoginRoute,
      }"
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
import { statusSideBar } from './store/global';

watch(
  () => router.currentRoute.value.name,
  (newRouteName) => {
    isLoginRoute.value = newRouteName === 'login';
  }
);

const isLoginRoute = ref(router.currentRoute.value.name == 'login');
</script>
