<template>
  <div
    class="fixed flex h-[100vh] w-[100vw] items-center justify-center p-4 z-50 top-0 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.4)]"
  >
    <form
      class="flex w-[500px] flex-col gap-6 bg-white p-12 shadow-custom-shadow rounded-lg"
      @submit.prevent="handleSubmit"
      autocomplete="off"
    >
      <div class="flex flex-col gap-2">
        <h4 class="text-primary">Actualizar Fondo</h4>
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
          <InputCustom v-model="model.address" placeholder="---" title="Dirección" type="text" />
          <InputSelect
            :model-value="userSelect.current"
            :options="userSelect.data"
            placeholder="---"
            show-search
            title="Asignar asesor"
            @emit-values="(value: string[]) => fetchUsers(value)"
            @update:modelValue="(value: any) => (userSelect.current = value)"
          />
          <InputTextArea v-model="model.details" placeholder="---" title="Detalles" />
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
          <button class="w-full bg-primary text-white" type="submit">ACTUALIZAR</button>
          <button
            class="w-full bg-white text-primary border-primary border-solid border-[1px] text-nowrap"
            type="button"
            @click="emit('close')"
          >
            CERRAR
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import InputCustom from '@/components/InputCustom.vue';
import InputSelect from '@/components/InputSelect.vue';
import InputTextArea from '@/components/InputTextArea.vue';
import { defineEmits, defineProps, ref } from 'vue';
import { IFundDto, IFundInfo, RoleType } from '@/interfaces/dto';
import { ICustomSelectOption } from '@/interfaces';
import { userService } from '@/services/userService';
import { fundService } from '@/services';

const props = defineProps<{ fund: IFundDto }>();
const emit = defineEmits(['onUpdate', 'close']);
const showErrorFundName = ref(false);
const showErrorGeneral = ref(false);
const errorText = ref('');
const model = ref<IFundInfo>({
  name: props.fund.name,
  address: props.fund.address || undefined,
  details: props.fund.details || undefined,
  locationUrl: props.fund.locationUrl || undefined,
});
const userSelect = ref<{ current: ICustomSelectOption<string>; data: ICustomSelectOption<string>[] }>({
  current: { value: props.fund.user?.id || '', text: props.fund.user?.username || '' },
  data: [{ value: '00000000-0000-0000-0000-000000000000', text: 'Desasignar' }],
});

async function fetchUsers(search: string[]) {
  const res = await userService.list(search, 0, 10, true).catch((error) => {
    showErrorGeneral.value = true;
    errorText.value = 'No se pudo obtener los datos de los usuarios';
    console.error('user fetch failed:', error);
    throw error;
  });
  userSelect.value.data = res.data
    .filter((user) => user.role === RoleType.Assessor)
    .map((user) => ({ text: user.username, value: user.id } as ICustomSelectOption<string>));
}

const handleSubmit = async () => {
  showErrorGeneral.value = false;
  if (validationFundCreate()) {
    const fund = await fundService.update(props.fund.id, model.value).catch((error) => {
      showErrorGeneral.value = true;
      errorText.value = 'Ocurrió un error actualizando el fondo';
      console.error('Update failed:', error);
      throw error;
    });

    const userId = userSelect.value.current.value;
    if (userId !== '') {
      await fundService.attachUser(fund.id, userId).catch((error) => {
        showErrorGeneral.value = true;
        errorText.value = 'Ocurrió un error asignando el usuario al fondo';
        console.error('Attach User failed:', error);
        throw error;
      });
    }

    emit('onUpdate');
  }
};

function validationFundCreate() {
  showErrorFundName.value = model.value.name === '';
  return !showErrorFundName.value;
}
</script>
