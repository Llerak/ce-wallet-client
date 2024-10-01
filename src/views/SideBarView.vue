<template>
  <div
    class="bg-[#FCFCFC] pb-12 p-6 w-[280px] h-[100vh] flex flex-col justify-between items-center"
  >
    <div class="flex flex-col gap-[85px] items-center">
      <img src="../../public/logo.png" alt="logo" />
      <div class="flex flex-col gap-[120px] items-center">
        <PostCustom
          class="shadow-custom-light"
          title="Balance en CUP"
          content="$ 900,000.00"
        />
        <div class="flex flex-col gap-4 items-center"></div>
      </div>
    </div>
    <div>Cerrar</div>
  </div>
</template>

<script setup lang="ts">
import PostCustom from '@/components/PostCustom.vue';
</script>
