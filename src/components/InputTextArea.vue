<template>
  <div class="flex flex-col">
    <label class="ml-1 mb-2" v-if="title">{{ title }}</label>
    <textarea class="w-full resize-none h-16" v-model="internalValue" :title="title" :placeholder="placeholder" />
    <span v-if="showError" class="text-sm text-red-600">
      {{ ErrorText }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  title: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  modelValue: {
    type: String,
  },
  showError: {
    type: Boolean,
    default: false,
  },
  ErrorText: {
    type: String,
    default: 'Este campo es requerido',
  },
});

const emit = defineEmits(['update:modelValue']);
const internalValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue;
  }
);

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>
