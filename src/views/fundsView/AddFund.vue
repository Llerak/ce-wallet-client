<template>
  <div
    class="fixed flex h-[100vh] w-[100vw] items-center justify-center p-4 z-50 top-0 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.4)]"
  >
    <form
      @submit.prevent="handleAdd"
      class="flex w-[360px] flex-col gap-6 bg-white p-12 shadow-custom-shadow rounded-lg"
      autocomplete="off"
    >
      <div class="flex flex-col gap-2">
        <h4 class="text-primary">Agregar Fondo</h4>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <InputCustom title="Nombre" v-model="name" type="text" placeholder="Nombre" :show-error="showErrorFundName" />
          <!-- <InputCustom title="Localización" v-model="locationUrl" type="text" placeholder="Localización" /> -->
          <InputCustom title="Dirección" v-model="address" type="text" placeholder="Dirección" />
          <InputTextArea title="Detalles" v-model="details" placeholder="Detalles" />
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
          <button class="w-full bg-primary text-white" type="submit">AGREGAR</button>
          <button
            @click="closeAdd"
            type="button"
            class="w-full bg-white text-primary border-primary border-solid border-[1px] text-nowrap"
          >
            CERRAR
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
/* import */
import { defineEmits, defineProps, onBeforeMount, Ref, ref } from 'vue';
import { fundService } from '@/services';
import InputCustom from '@/components/InputCustom.vue';
import InputTextArea from '@/components/InputTextArea.vue';
import { IFundInfo } from '@/interfaces/dto';

/* fund model */
const name: Ref<string> = ref('');
const showErrorFundName: Ref<boolean> = ref(false);
const locationUrl: Ref<string> = ref('');
const address: Ref<string> = ref('');
const details: Ref<string> = ref('');

/* Validation const */
const showErrorGeneral: Ref<boolean> = ref(false);
const errorText: Ref<string> = ref('Hubo un error creando el fondo');

/* props and emits*/
defineProps<{
  closeAdd: () => void;
}>();

const emit = defineEmits(['fundAdded']);

/* Add */
const handleAdd = async () => {
  showErrorGeneral.value = false;
  if (validationFundCreate()) {
    try {
      const fund: IFundInfo = {
        name: name.value,
        locationUrl: locationUrl.value,
        address: address.value,
        details: details.value,
      };
      await fundService.create(fund);
      emit('fundAdded');
    } catch (error) {
      showErrorGeneral.value = true;
      console.error('Create failed:', error);
    }
  }
};

/* validation */
function validationFundCreate() {
  showErrorFundName.value = false;
  if (name.value === '') {
    showErrorFundName.value = true;
  }

  if (showErrorFundName.value) return false;
  return true;
}

/* reset */
onBeforeMount(() => {
  name.value = '';
  showErrorFundName.value = false;
  showErrorGeneral.value = false;
  locationUrl.value = '';
  address.value = '';
  details.value = '';
});
</script>
