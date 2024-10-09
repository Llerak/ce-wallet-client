<template>
  <header class="h-[75px] flex w-full justify-end items-center">
    <h5 class="font-semibold">
      {{ roleAndUserGlobal.name }}
    </h5>
  </header>
</template>
<script lang="ts" setup>
import { roleAndUserGlobal } from '@/store/RolesAndPermission';
</script>
