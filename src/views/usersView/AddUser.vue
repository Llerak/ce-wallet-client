<template>
  <div
    class="fixed flex h-[100vh] w-[100vw] items-center justify-center p-4 z-50 top-0 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.4)]"
  >
    <form
      @submit.prevent="handleAdd"
      class="flex w-[500px] flex-col gap-6 bg-white p-12 shadow-custom-shadow rounded-lg"
      autocomplete="off"
    >
      <div class="flex flex-col gap-2">
        <h4 class="text-primary">Agregar Usuario</h4>
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
          <InputSelect
            :model-value="selectRole"
            :options="optionsRoles"
            :-error-text="errorMessages.roleId"
            :show-error="showError.roleId"
            placeholder="---"
            title="Rol"
            @update:model-value="(value) => (model.roleId = value.value)"
          />
          <InputCustom
            v-model="model.password"
            :show-error="showError.password"
            :-error-text="errorMessages.password"
            placeholder="---"
            title="Contraseña"
            type="password"
          />
          <InputCustom
            v-model="model.passwordConfirmation"
            :show-error="showError.passwordConfirmation"
            :-error-text="errorMessages.passwordConfirmation"
            placeholder="---"
            title="Confirmar Contraseña"
            type="password"
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
          <button class="w-full bg-primary text-white" type="submit">AGREGAR</button>
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
import { defineEmits, onMounted, ref } from 'vue';
import InputCustom from '@/components/InputCustom.vue';
import InputSelect from '@/components/InputSelect.vue';
import { IRegisterUserDto } from '@/interfaces/dto';
import { authService, roleService } from '@/services';
import { ICustomSelectOption } from '@/interfaces';

const emit = defineEmits(['userAdded', 'close']);

const model = ref<IRegisterUserDto>({ roleId: '', username: '', email: '', password: '', passwordConfirmation: '' });
const errorText = ref('Hubo un error creando el usuario');
const selectRole = ref<ICustomSelectOption<string>>();
const optionsRoles = ref<ICustomSelectOption<string>[]>([]);
const showError = ref({
  general: false,
  username: false,
  roleId: false,
  email: false,
  password: false,
  passwordConfirmation: false,
});
const errorMessages = ref({
  username: '',
  roleId: '',
  email: '',
  password: '',
  passwordConfirmation: '',
});

const handleAdd = async () => {
  showError.value.general = false;
  if (validationUserCreate()) {
    try {
      await authService.register(model.value);
      emit('userAdded');
    } catch (error) {
      showError.value.general = true;
      console.error('Create failed:', error);
    }
  }
};
const fetchRole = async () => {
  const res = await roleService.list().catch((error) => {
    showError.value.general = true;
    console.error('Error al obtener los roles:', error);
    throw error;
  });
  optionsRoles.value = res.map((role) => ({ value: role.id, text: role.role }));
};
const validationUserCreate = () => {
  showError.value = {
    general: false,
    username: false,
    roleId: false,
    email: false,
    password: false,
    passwordConfirmation: false,
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

  if (!model.value.password) {
    errorMessages.value.password = 'Este campo es requerido';
    showError.value.password = true;
  } else if (model.value.password.length < 8) {
    errorMessages.value.password = 'La contraseña debe tener más de 8 caracteres';
    showError.value.password = true;
  } else {
    showError.value.password = false;
  }

  if (!model.value.passwordConfirmation) {
    errorMessages.value.passwordConfirmation = 'Este campo es requerido';
    showError.value.passwordConfirmation = true;
  } else if (model.value.password !== model.value.passwordConfirmation) {
    errorMessages.value.passwordConfirmation = 'Las contraseñas deben coincidir';
    showError.value.passwordConfirmation = true;
  } else {
    showError.value.passwordConfirmation = false;
  }

  if (!model.value.roleId) {
    errorMessages.value.roleId = 'Este campo es requerido';
    showError.value.roleId = true;
  } else {
    showError.value.roleId = false;
  }

  return !Object.values(showError.value).includes(true);
  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
};

onMounted(fetchRole);
</script>
