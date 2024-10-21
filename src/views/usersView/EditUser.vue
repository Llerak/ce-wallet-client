<template>
  <div
    class="fixed flex h-[100vh] w-[100vw] items-center justify-center p-4 z-50 top-0 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.4)]"
  >
    <form
      @submit.prevent="handleEdit"
      class="flex w-[500px] flex-col gap-6 bg-white p-12 shadow-custom-shadow rounded-lg"
      autocomplete="off"
    >
      <div class="flex flex-col gap-2">
        <h4 class="text-primary">Editar Usuario</h4>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <InputCustom
            v-model="model.username"
            :show-error="showError.username"
            :-error-text="errorMessages.username"
            placeholder="---"
            title="Nombre"
            type="text"
          />
          <InputCustom
            v-model="model.email"
            :show-error="showError.email"
            :-error-text="errorMessages.email"
            placeholder="---"
            title="Correo"
            type="text"
          />
        </div>
        <div class="flex flex-col gap-2">
          <span
            class="text-sm text-red-600 transition-all"
            :class="{
              'scale-100': showError.general,
              'scale-0': !showError.general,
            }"
            >{{ errorText }}
          </span>
          <div class="flex items-center">
            <button class="w-full bg-primary text-white" type="submit">ACTUALIZAR</button>
            <div v-if="isLoading" class="ml-2 transition">
              <SpinnerLoading />
            </div>
          </div>
          <button
            @click="emit('close')"
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
import { defineEmits, ref, defineProps } from 'vue';
import InputCustom from '@/components/InputCustom.vue';
import { IEditUserDto } from '@/interfaces/dto';
import { userService } from '@/services/userService';
import SpinnerLoading from '@/components/SpinnerLoading.vue';

const emit = defineEmits(['userEdit', 'close']);
const props = defineProps<{ data: IEditUserDto }>();
const isLoading = ref(false);

const model = ref<IEditUserDto>({ id: props.data.id, username: props.data.username, email: props.data.email });
const errorText = ref('Hubo un error creando el usuario');
const showError = ref({
  general: false,
  username: false,
  email: false,
});
const errorMessages = ref({
  username: '',
  email: '',
});

const handleEdit = async () => {
  showError.value.general = false;
  isLoading.value = true;
  if (validationUserCreate()) {
    try {
      await userService.update(model.value);
      emit('userEdit');
    } catch (error) {
      showError.value.general = true;
      console.error('Edit failed:', error);
    }
  }
  isLoading.value = false;
};

const validationUserCreate = () => {
  showError.value = {
    general: false,
    username: false,
    email: false,
  };

  if (!model.value.username) {
    errorMessages.value.username = 'Este campo es requerido';
    showError.value.username = true;
  } else if (model.value.username.length < 2) {
    errorMessages.value.username = 'El nombre debe tener más de dos caracteres';
    showError.value.username = true;
  } else {
    showError.value.username = false;
  }

  if (!model.value.email) {
    errorMessages.value.email = 'Este campo es requerido';
    showError.value.email = true;
  } else if (!validateEmail(model.value.email)) {
    errorMessages.value.email = 'El correo debe ser válido';
    showError.value.email = true;
  } else {
    showError.value.email = false;
  }

  return !Object.values(showError.value).includes(true);
  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
};
</script>
