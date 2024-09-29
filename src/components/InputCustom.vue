<template>
  <div
    class="relative flex h-12 items-end border-b-[1px] border-b-[#282828] p-1 pl-2 transition-all"
    :class="{
      'mb-5': showError,
      'mb-0': !showError,
    }"
  >
    <span
      :class="{
        '-translate-x-2 -translate-y-6 scale-90': !textEmpty || isFocused,
        'translate-x-0 translate-y-0 scale-100': textEmpty && !isFocused,
      }"
      class="pointer-events-none absolute text-sm text-[#6E6E6E] transition-all"
      >{{ placeholder }}</span
    >
    <input
      class="w-full bg-transparent text-[14px] focus:outline-none"
      :type="type"
      :value="modelValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      :title="modelValue"
    />
    <span
      v-if="showError"
      class="absolute text-sm text-red-600"
      :class="{
        'translate-y-6 scale-100': showError,
        'translate-y-0 scale-0': !showError,
      }"
      >Este campo es requerido</span
    >
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch, onMounted } from 'vue';

const props = defineProps({
  type: {
    required: true,
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
});

const textEmpty = ref(true);
const isFocused = ref(false);

const emit = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target) {
    emit('update:modelValue', target.value);
  }
};

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};

watch(
  () => props.modelValue,
  (newValue) => {
    textEmpty.value = newValue === '';
  }
);

onMounted(() => {
  textEmpty.value = props.modelValue === '';
});
</script>
