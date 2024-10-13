<template>
  <div class="flex flex-col relative" ref="dropdown">
    <label class="ml-1 mb-2" v-if="title">{{ title }}</label>
    <div class="relative">
      <button @click="toggleDropdown" class="text text-start selectInput">
        {{ selectedOptionText || placeholder }}
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
          @click="selectOption(option)"
          class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-200 hover:text-white"
        >
          <span
            :class="{
              'font-semibold': option.value === internalValue,
              'font-normal': option.value !== internalValue,
            }"
            class="block truncate"
          >
            {{ option.text }}
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: Object as () => { value: any; text: string },
    default: () => ({ value: '', text: '' }),
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
const internalValue = ref(props.modelValue.value);
const isOpen = ref(false);
const selectedOptionText = ref(props.modelValue.text);
const dropdown = ref<HTMLElement | null>(null);

const checkDefaultValue = () => {
  const selectedOption = props.options.find((option) => option.value === props.modelValue.value);
  if (selectedOption) {
    internalValue.value = props.modelValue.value;
    selectedOptionText.value = selectedOption.text;
  }
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
  const selectedOption = props.options.find((option) => option.value === newValue);
  selectedOptionText.value = selectedOption ? selectedOption.text : '';
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: { value: string | undefined }) => {
  internalValue.value = internalValue.value == option.value ? { value: '', text: '' } : option.value;
  isOpen.value = false;
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
