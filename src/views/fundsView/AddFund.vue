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
        <h4 class="text-primary">Agregar Fondo</h4>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <InputCustom
            v-model="model.name"
            :show-error="showErrorFundName"
            placeholder="---"
            title="Nombre"
            type="text"
          />
          <!-- <InputCustom title="Localización" v-model="locationUrl" type="text" placeholder="Localización" /> -->
          <InputCustom v-model="model.address" placeholder="---" title="Dirección *" type="text" />
          <InputSelect
            :model-value="userSelect.current"
            :options="userSelect.data"
            placeholder="---"
            show-search
            title="Asignar asesor *"
            @emit-values="(value: string[]) => fetchUsers(value)"
            @update:modelValue="(value: any) => (userSelect.current = value)"
          />
          <InputTextArea v-model="model.details" placeholder="---" title="Detalles *" />
        </div>
        <div class="flex flex-col gap-2">
          <span
            class="text-sm text-red-600 transition-all"
            :class="{
              'scale-100': showErrorGeneral,
              'scale-0': !showErrorGeneral,
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
import { defineEmits, defineProps, ref } from 'vue';
import { fundService } from '@/services';
import InputCustom from '@/components/InputCustom.vue';
import InputTextArea from '@/components/InputTextArea.vue';
import { IFundInfo, RoleType } from '@/interfaces/dto';
import InputSelect from '@/components/InputSelect.vue';
import { ICustomSelectOption } from '@/interfaces/ICustomSelectOption';
import { userService } from '@/services/userService';

const model = ref<IFundInfo>({ name: '' });
const userSelect = ref<{ current: ICustomSelectOption<string>; data: ICustomSelectOption<string>[] }>({
  current: { value: '', text: '' },
  data: [],
});
const showErrorFundName = ref(false);
const showErrorGeneral = ref(false);
const errorText = ref('Hubo un error creando el fondo');

defineProps<{
  closeAdd: () => void;
}>();
const emit = defineEmits(['fundAdded']);

const handleAdd = async () => {
  showErrorGeneral.value = false;
  if (validationFundCreate()) {
    const fund = await fundService.create(model.value).catch((error) => {
      showErrorGeneral.value = true;
      console.error('Create failed:', error);
      throw error;
    });

    const userId = userSelect.value.current.value;
    if (userId !== '') {
      await fundService.attachUser(fund.id, userId).catch((error) => {
        showErrorGeneral.value = true;
        console.error('Attach User failed:', error);
        throw error;
      });
    }

    emit('fundAdded');
  }
};

async function fetchUsers(search: string[]) {
  try {
    const res = await userService.list(search, 0, 10, true);
    userSelect.value.data = res.data
      .filter((user) => user.role === RoleType.Assessor)
      .map((user) => ({ text: user.username, value: user.id } as ICustomSelectOption<string>));
  } catch (error) {
    showErrorGeneral.value = true;
    console.error('user fetch failed:', error);
  }
}

function validationFundCreate() {
  showErrorFundName.value = model.value.name === '';
  return !showErrorFundName.value;
}
</script>
