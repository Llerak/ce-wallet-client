<template>
  <a
    @click="
      router.push(link);
      statusSideBar.visible = false;
    "
    class="ml-4 mr-4 pl-2 pr-2 pb-4 pt-4 flex gap-2 flex-1 items-center cursor-pointer"
    :class="{
      'bg-white shadow-custom-shadow font-semibold text-[#344767]': isActive,
    }"
  >
    <i
      class="w-8 h-8 p-[10px] flex items-center justify-center rounded-lg"
      :class="{
        'shadow-none bg-custom-gradient-icon-active text-white': isActive,
        'shadow-custom-shadow-icon bg-custom-gradient-icon text-[#344767]': !isActive,
      }"
    >
      <component :is="icon" class="w-3 h-3" />
    </i>
    {{ text }}
  </a>
</template>

<script lang="ts" setup>
import router from '@/router';
import { statusSideBar } from '@/store/global';
import { defineProps } from 'vue';

defineProps({
  icon: {
    type: Object,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});
</script>
