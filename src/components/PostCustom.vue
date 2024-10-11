<template>
  <div
    class="min-[480px]:p-6 p-4 bg-white shadow-custom-shadow flex flex-col gap-2 min-[480px]:gap-4 min-[480px]:w-min w-full flex-1 sm:rounded-lg min-w-48"
  >
    <p class="min-[768px]:text-nowrap">{{ title }}</p>
    <h5 class="min-[768px]:text-nowrap">{{ content }}</h5>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps({
  title: { type: String, required: true },
  content: { type: String, required: true },
});
</script>
