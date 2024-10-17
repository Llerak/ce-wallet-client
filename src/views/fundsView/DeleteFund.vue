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
        <button class="w-full bg-primary text-white" type="submit">ELIMINAR</button>
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
import { defineEmits, defineProps, ref, Ref } from 'vue';
import { fundService } from '@/services';

/* Validation const */
const showErrorGeneral: Ref<boolean> = ref(false);
const errorText: Ref<string> = ref('Hubo un error eliminando el fondo');

/* props and emits*/
const props = defineProps<{
  closeDelete: () => void;
  id: string;
}>();

const emit = defineEmits(['fundDelete']);

/* Add */
const handleDelete = async () => {
  showErrorGeneral.value = false;

  try {
    await fundService.delete(props.id);
    emit('fundDelete');
  } catch (error) {
    showErrorGeneral.value = true;
    console.error('Create failed:', error);
  }
};
</script>
