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
            :error-text="errorMessages.username"
            placeholder="---"
            title="Nombre"
            type="text"
          />
          <InputCustom
            v-model="model.email"
            :show-error="showError.email"
            :error-text="errorMessages.email"
            placeholder="---"
            title="Correo"
            type="text"
          />
          <InputSelect
            :model-value="selectRole"
            :options="optionsRoles"
            :error-text="errorMessages.roleId"
            placeholder="---"
            title="Rol"
            @update:modelValue="(value: any) => (model.roleId = value)"
          />
          <InputCustom
            v-model="model.password"
            :show-error="showError.password"
            :error-text="errorMessages.password"
            placeholder="---"
            title="Contraseña"
            type="password"
          />
          <InputCustom
            v-model="model.passwordConfirmation"
            :show-error="showError.passwordConfirmation"
            :error-text="errorMessages.passwordConfirmation"
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
          <label>Los campos con ( * ) son opcionales.</label>
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
import { defineEmits, defineProps, onMounted, ref, Ref } from 'vue';
import InputCustom from '@/components/InputCustom.vue';
import InputSelect from '@/components/InputSelect.vue';
import { ICustomSelectOption } from '@/interfaces/ICustomSelectOption';
import { userService } from '@/services/userService';
import { IRegisterUserDto } from '@/interfaces/dto';
import { authService, roleService } from '@/services';

const model = ref<IRegisterUserDto>({ roleId: '', username: '', email: '', password: '', passwordConfirmation: '' });

const showError: Ref<{ [key: string]: boolean }> = ref({
  general: false,
  username: false,
  roleId: false,
  email: false,
  password: false,
  passwordConfirmation: false,
});

const errorMessages: Ref<{ [key: string]: string }> = ref({
  username: '',
  roleId: '',
  email: '',
  password: '',
  passwordConfirmation: '',
});

const errorText = ref('Hubo un error creando el usuario');

defineProps<{
  closeAdd: () => void;
}>();
const emit = defineEmits(['userAdded']);

const handleAdd = async () => {
  showError.value.general = false;
  if (validationUserCreate()) {
    const user = await authService.register(model.value).catch((error) => {
      showError.value.general = true;
      console.error('Create failed:', error);
      throw error;
    });

    emit('userAdded');
  }
};

const selectRole = ref({ value: '', text: '' });
const optionsRoles = ref<{ value: string; text: string }[]>([]);

async function fetchRole() {
  try {
    const res = await roleService.list();
    optionsRoles.value = res.map((role) => ({ value: role.id, text: role.role }));
  } catch (error) {
    showError.value.general = true;
    console.error('Error al obtener los roles:', error);
  }
}

function validationUserCreate() {
  showError.value.username = model.value.username.length <= 2;
  showError.value.email = !validateEmail(model.value.email);
  showError.value.password = model.value.password.length <= 8;
  showError.value.passwordConfirmation = model.value.password !== model.value.passwordConfirmation;

  errorMessages.value.username = showError.value.username ? 'El nombre debe tener más de dos caracteres.' : '';
  errorMessages.value.email = showError.value.email ? 'El correo debe ser válido.' : '';
  errorMessages.value.password = showError.value.password ? 'La contraseña debe tener más de 8 caracteres.' : '';
  errorMessages.value.passwordConfirmation = showError.value.passwordConfirmation
    ? 'Las contraseñas deben coincidir.'
    : '';

  return (
    !showError.value.username &&
    !showError.value.email &&
    !showError.value.password &&
    !showError.value.passwordConfirmation
  );
}

function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

onMounted(() => {
  fetchRole();
});
</script>
