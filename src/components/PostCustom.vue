<template>
  <div class="min-[480px]:p-6 p-4 flex flex-col gap-2 min-[480px]:gap-4 min-[480px]:w-min flex-1 rounded-lg">
    <span class="min-[768px]:text-nowrap text-white">{{ title }}</span>
    <h6 class="min-[768px]:text-nowrap text-white">{{ content }}</h6>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  title: { type: String, required: true },
  content: { type: [String, Number], required: true },
});
</script>
