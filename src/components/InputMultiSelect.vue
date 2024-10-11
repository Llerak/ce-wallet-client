<template>
  <div class="flex flex-col relative" ref="dropdown">
    <label class="ml-1 mb-2" v-if="title">{{ title }}</label>
    <div class="relative">
      <button @click="toggleDropdown" class="text text-start selectInput">
        {{ selectedOptionsText.length ? selectedOptionsText.join(', ') : placeholder }}
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707A1 1 0 014.293 8.293l5-5A1 1 0 0110 3z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
      <ul
        v-show="isOpen"
        class="absolute z-10 mt-1 w-full bg-white shadow-custom-shadow max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
      >
        <li
          v-for="option in options"
          :key="option.value"
          @click="toggleOption(option)"
          class="cursor-pointer select-none relative py-2 pl-3 pr-9"
        >
          <span
            :class="{
              'font-semibold': isSelected(option),
              'font-normal': !isSelected(option),
            }"
            class="block truncate"
          >
            {{ option.text }}
          </span>
          <span v-if="isSelected(option)" class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-400">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </li>
      </ul>
    </div>
    <span v-if="showError" class="text-sm text-red-600">
      {{ ErrorText }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  title: {
    type: String,
  },
  options: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: Array as () => { value: any; text: string }[],
    required: true,
  },
  modelValue: {
    type: Array as () => any[],
    default: () => [],
  },
  showError: {
    type: Boolean,
    default: false,
  },
  ErrorText: {
    type: String,
    default: 'Este campo es requerido',
  },
  placeholder: {
    type: String,
    default: 'Seleccione una opción',
  },
});

const emit = defineEmits(['update:modelValue']);
const internalValue = ref(props.modelValue);
const isOpen = ref(false);
const selectedOptionsText = ref<string[]>([]);
const dropdown = ref<HTMLElement | null>(null);

const checkDefaultValue = () => {
  selectedOptionsText.value = props.options
    .filter((option) => internalValue.value.includes(option.value))
    .map((option) => option.text);
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  checkDefaultValue();
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
  selectedOptionsText.value = props.options
    .filter((option) => newValue.includes(option.value))
    .map((option) => option.text);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const toggleOption = (option: { value: any }) => {
  if (internalValue.value.includes(option.value)) {
    internalValue.value = internalValue.value.filter((val) => val !== option.value);
  } else {
    internalValue.value.push(option.value);
  }
  selectedOptionsText.value = props.options
    .filter((option) => internalValue.value.includes(option.value))
    .map((option) => option.text);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSelected = (option: { value: any }) => {
  return internalValue.value.includes(option.value);
};
</script>

<style scoped>
ul {
  max-height: 200px;
}

li:hover {
  background-color: #f58e713a;
  color: #495057;
}
</style>
