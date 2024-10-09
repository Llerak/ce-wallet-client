<template>
  <div
    class="w-[232px] flex h-[93px] flex-col justify-between items-end rounded pt-4 pb-4 pr-3 pl-3"
    :class="{
      'bg-gradient-to-r from-[#eb6b48] to-[#f58d71]': isFunctional,
      'bg-transparent': !isFunctional,
    }"
  >
    <div
      class="flex w-full"
      :class="{
        'justify-between': isFunctional,
        'justify-end': !isFunctional,
      }"
    >
      <h5 class="text-[#FCFCFC]">{{ title }}</h5>
      <ArrowDownIcon v-if="isFunctional" />
    </div>
    <h3 class="text-[#FCFCFC]">{{ content }}</h3>
  </div>
</template>

<script setup lang="ts">
import ArrowDownIcon from './icons/ArrowDownIcon.vue';
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  menu: {
    required: false,
    default: false,
    type: Boolean,
  },
  isFunctional: {
    required: false,
    default: false,
    type: Boolean,
  },
});
</script>
