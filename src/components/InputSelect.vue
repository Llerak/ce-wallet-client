<template>
  <div class="flex flex-col relative" ref="dropdown">
    <label class="ml-1 mb-2" v-if="title">{{ title }}</label>
    <div class="relative">
      <button type="button" @click="toggleDropdown" class="text text-start selectInput">
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
        <input
          v-if="showSearch"
          v-model="searchQuery"
          @input="emitSearch"
          type="text"
          placeholder="Buscar..."
          class="w-full border-none focus:border-none focus:shadow-none"
        />
        <li
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-[#f58e713a] hover:text-[#495057]"
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
import { defineEmits, defineProps, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ICustomSelectOption } from '@/interfaces/ICustomSelectOption';

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
    type: Object as () => ICustomSelectOption<string>,
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
  showSearch: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'emitValue', 'emitValues']);
const internalValue = ref(props.modelValue.value);
const isOpen = ref(false);
const selectedOptionText = ref(props.modelValue.text);
const dropdown = ref<HTMLElement | null>(null);
const searchQuery = ref('');

const checkDefaultValue = () => {
  const selectedOption = props.options.find((option) => option.value === props.modelValue.value);
  if (selectedOption) {
    internalValue.value = props.modelValue.value;
    selectedOptionText.value = selectedOption.text;
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdown.value && !dropdown.value.contains(event.target as Node) && isOpen.value) {
    isOpen.value = false;
    searchQuery.value = '';
  }
};

onMounted(() => {
  checkDefaultValue();
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue.value;
    selectedOptionText.value = newValue.text;
    emit('emitValue', newValue.value); // Emit the value when it changes
  }
);

watch(internalValue, (newValue) => {
  emit('update:modelValue', { value: newValue, text: selectedOptionText.value });
  const selectedOption = props.options.find((option) => option.value === newValue);
  selectedOptionText.value = selectedOption ? selectedOption.text : '';
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  searchQuery.value = '';
  if (selectedOptionText.value != '') {
    emit('emitValues', [selectedOptionText.value, searchQuery.value]);
  } else {
    emit('emitValues', [searchQuery.value]);
  }
};
const emitSearch = () => {
  if (selectedOptionText.value != '') {
    emit('emitValues', [selectedOptionText.value, searchQuery.value]);
  } else {
    emit('emitValues', [searchQuery.value]);
  }
};

const selectOption = (option: { value: string | undefined; text: string }) => {
  if (internalValue.value === option.value) {
    internalValue.value = '';
    selectedOptionText.value = '';
  } else {
    internalValue.value = option.value;
    selectedOptionText.value = option.text;
  }
  emit('emitValue', option.value);
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
