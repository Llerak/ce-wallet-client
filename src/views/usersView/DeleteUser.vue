<template>
  <div
    class="fixed flex h-[100vh] w-[100vw] items-center justify-center p-4 z-50 top-0 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.4)]"
  >
    <form
      autocomplete="off"
      class="flex w-[360px] flex-col gap-6 bg-white p-12 shadow-custom-shadow rounded-lg"
      @submit.prevent="deleteUser"
    >
      <div class="flex flex-col gap-2">
        <h4 class="text-primary">Eliminar Usuario</h4>
      </div>
      <div class="flex flex-col gap-4">
        <p>Esta seguro que desea eliminar este usuario?</p>
      </div>
      <div class="flex flex-col gap-2">
        <span
          :class="{
            'scale-100': showError,
            'scale-0': !showError,
          }"
          class="text-sm text-red-600 transition-all"
          >{{ errorText }}</span
        >
        <div class="flex items-center">
          <button class="w-full bg-primary text-white" type="submit">ELIMINAR</button>
          <div v-if="isLoading" class="ml-2 transition">
            <SpinnerLoading />
          </div>
        </div>
        <button
          class="w-full bg-white text-primary border-primary border-solid border-[1px] text-nowrap"
          type="button"
          @click="emit('close')"
        >
          CANCELAR
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref } from 'vue';
import { userService } from '@/services/userService';
import SpinnerLoading from '@/components/SpinnerLoading.vue';

const props = defineProps<{ userId: string }>();
const emit = defineEmits(['close', 'onDeleted']);

const [showError, isLoading] = [ref(false), ref(false)];

async function deleteUser() {
  isLoading.value = true;
  await userService.delete(props.userId).catch((error) => {
    showError.value = true;
    console.error('Delete User failed:', error);
  });
  isLoading.value = false;
  emit('onDeleted');
}
</script>

<style scoped></style>
