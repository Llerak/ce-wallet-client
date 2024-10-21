<template>
  <div
    class="fixed flex h-[100vh] w-[100vw] items-center justify-center p-4 z-50 top-0 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.4)]"
  >
    <form
      @submit.prevent="handleDelete"
      class="flex w-[360px] flex-col gap-6 bg-white p-12 shadow-custom-shadow rounded-lg"
      autocomplete="off"
    >
      <div class="flex flex-col gap-2">
        <h4 class="text-primary">Eliminar Fondo</h4>
      </div>
      <div class="flex flex-col gap-4">
        <p>Esta seguro que desea eliminar el fondo?</p>
      </div>
      <div class="flex flex-col gap-2">
        <span
          class="text-sm text-red-600 transition-all"
          :class="{
            'scale-100': showErrorGeneral,
            'scale-0': !showErrorGeneral,
          }"
          >{{ errorText }}</span
        >
        <div class="flex items-center">
          <button class="w-full bg-primary text-white" type="submit">ELIMINAR</button>
          <div v-if="isLoading" class="ml-2 transition">
            <SpinnerLoading />
          </div>
        </div>
        <button
          @click="closeDelete"
          type="button"
          class="w-full bg-white text-primary border-primary border-solid border-[1px] text-nowrap"
        >
          CANCELAR
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
/* import */
import { defineEmits, defineProps, ref } from 'vue';
import { fundService } from '@/services';
import SpinnerLoading from '@/components/SpinnerLoading.vue';

/* Validation const */
const showErrorGeneral = ref(false);
const errorText = ref('Hubo un error eliminando el fondo');
const isLoading = ref(false);

/* props and emits*/
const props = defineProps<{
  closeDelete: () => void;
  id: string;
}>();

const emit = defineEmits(['fundDelete']);

/* Add */
const handleDelete = async () => {
  showErrorGeneral.value = false;
  isLoading.value = true;
  try {
    await fundService.delete(props.id);
    emit('fundDelete');
  } catch (error) {
    showErrorGeneral.value = true;
    console.error('Create failed:', error);
  }
  isLoading.value = false;
};
</script>
