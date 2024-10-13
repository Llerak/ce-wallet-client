<template>
  <header class="h-[2px] flex w-full justify-end items-center">
    <i
      class="w-10 h-10 p-[10px] min-[1200px]:hidden items-center justify-center rounded-lg fixed bottom-4 right-4 z-50 flex overflow-hidden"
      :class="{
        'shadow-none bg-custom-gradient-icon-active text-white': statusSideBar.visible,
        'shadow-custom-shadow-icon bg-custom-gradient-icon text-[#344767]': !statusSideBar.visible,
      }"
      @click="statusSideBar.visible = !statusSideBar.visible"
      ><MenuIcon
    /></i>
  </header>
</template>
<script lang="ts" setup>
import MenuIcon from '@/components/icons/MenuIcon.vue';
import { statusSideBar } from '@/store/global';
</script>
