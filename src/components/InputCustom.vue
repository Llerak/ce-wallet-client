<template>
  <div class="flex flex-col">
    <label class="ml-1 mb-2" v-if="title">{{ title }}</label>
    <input
      class="w-full"
      :type="type"
      v-model="internalValue"
      :title="title"
      :placeholder="placeholder"
    />
    <span v-if="showError" class="text-sm text-red-600">
      Este campo es requerido
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  title: {
    type: String,
  },
  type: {
    type: String,
    required: true,
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
});

const emit = defineEmits(['update:modelValue']);
const internalValue = ref(props.modelValue);

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>
