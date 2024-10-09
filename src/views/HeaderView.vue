<template>
  <header
    class="flex flex-col gap-[72px] p-6 h-[360px] bg-gradient-to-r from-[#eb6b48] to-[#f58d71]"
  >
    <div class="h-[72px] flex justify-between w-full items-center">
      <h2 class="text-[#FCFCFC]">La Lisa</h2>
      <h6 class="text-[#FCFCFC]">{{ roleAndUserGlobal.name }}</h6>
    </div>
    <div class="flex gap-12">
      <PostCustom title="Tarjeta CUP" content="$ 900,000.00" />
      <div class="h-full w-[2px] bg-[#FCFCFC]"></div>
      <PostCustom title="CUP" content="$ 900,000.00" />
      <div class="h-full w-[2px] bg-[#FCFCFC]"></div>
      <PostCustom title="Tarjeta USD" content="$ 900,000.00" />
      <div class="h-full w-[2px] bg-[#FCFCFC]"></div>
      <PostCustom title="USD" content="$ 900,000.00" />
    </div>
  </header>
</template>
<script lang="ts" setup>
import PostCustom from '@/components/PostCustom.vue';
import { roleAndUserGlobal } from '@/store/RolesAndPermission';
</script>
