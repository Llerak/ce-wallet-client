<template>
  <div
    class="bg-[#FCFCFC] pb-12 p-6 w-[280px] h-[100vh] flex flex-col justify-between items-center"
  >
    <div class="flex flex-col gap-[98px] items-center">
      <img src="../../public/logo.png" alt="logo" />
      <div class="flex flex-col gap-[120px] items-center">
        <PostCustom
          class="shadow-custom-light"
          title="Balance en CUP"
          content="$ 900,000.00"
          :is-functional="true"
        />
        <div class="flex flex-col gap-4 items-center"></div>
      </div>
    </div>
    <div class="flex w-full justify-end">
      <button class="bg-transparent text-[#282828]">Cerrar sesion</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostCustom from '@/components/PostCustom.vue';
</script>
