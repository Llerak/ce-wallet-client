<template>
  <div
    v-if="showFilter"
    class="fixed flex h-[100vh] w-[100vw] items-center justify-center max-sm:p-0 max-sm:rounded-none p-4 z-50 top-0 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.4)]"
  >
    <form
      class="flex justify-center max-sm:h-[100vh] w-[600px] max-sm:w-full flex-col gap-6 bg-white p-12 shadow-custom-shadow rounded-lg"
      @submit.prevent="emit('filterValue', filter)"
      autocomplete="off"
    >
      <div class="flex flex-col gap-2">
        <h4 class="text-primary">Filtrar Fondos</h4>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <InputMultiSelect
            :model-value="optionSelectFundName"
            :options="optionsFundsNames"
            :show-search="true"
            title="Fondos"
            placeholder="---"
            @emit-values="async (value: any) => ((filter.fundNames = value), await fetchFundsNames())"
            @update:model-value="(value: any) => (optionSelectFundName = value)"
          />
          <InputMultiSelect
            :model-value="optionSelectUsername"
            :options="optionsUsersnames"
            :show-search="true"
            placeholder="---"
            title="Usuarios"
            @emit-values="async (value: any) => ((filter.usernames = value), await fetchUsernames())"
            @update:model-value="(value: any) => (optionSelectUsername = value)"
          />
          <InputMultiSelect
            title="Monedas"
            :model-value="optionSelectCurrenci"
            :options="optionsCurrencies"
            placeholder="---"
            @emit-values="(value: any) => (filter.currencies = value)"
            @update:model-value="(value: any) => (optionSelectCurrenci = value)"
          />
          <InputSelect
            title="Ordenar por"
            :model-value="optionSelectOrderBy"
            :options="optionsOrderBy"
            @emit-value="(value: any) => (filter.orderBy = value)"
            @update:model-value="(value: any) => (optionSelectOrderBy = value)"
          ></InputSelect>
          <CustomCheckBox
            :default-value="filter.descending"
            title="Ordenar descendiente"
            @return-value="(value: any) => (filter.descending = value)"
          ></CustomCheckBox>
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
          <button class="w-full bg-primary text-white" type="submit">FILTRAR</button>
          <div class="flex gap-3">
            <button @click="resetFilters()" type="button" class="w-full bg-[#717ef5] text-white flex-1">
              RESTABLECER
            </button>
            <button
              @click="closeFilter"
              type="button"
              class="w-full bg-white text-primary border-primary border-solid border-[1px] text-nowrap flex-1"
            >
              CERRAR
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
/* import */
import { defineEmits, defineProps, onMounted, Ref, ref } from 'vue';
import InputSelect from '@/components/InputSelect.vue';
import InputMultiSelect from '@/components/InputMultiSelect.vue';
import { currencyService, fundService } from '@/services';
import { IFundFilter } from '@/interfaces/dto';
import CustomCheckBox from '@/components/CustomCheckBox.vue';
import { userService } from '@/services/userService';

/* filter model */
const filter = ref<IFundFilter>({ descending: true });

interface option {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  text: string;
}

/* orderBy */
const optionSelectOrderBy: Ref<option> = ref({ value: null, text: '' });
const optionsOrderBy: Ref<option[]> = ref([
  { value: 'funds', text: 'Fondos' },
  { value: 'usernames', text: 'Usuarios' },
  { value: 'create_at', text: 'Fecha de creacion' },
]);

/* fundsNames */
const optionSelectFundName: Ref<option[]> = ref([]);
const optionsFundsNames: Ref<option[]> = ref([]);

const fetchFundsNames = async () => {
  try {
    const res = await fundService.list({ fundNames: filter.value.fundNames }, 0, 10);
    optionsFundsNames.value = res.data.map((fund) => ({
      value: fund.name,
      text: fund.name,
    }));
  } catch (error) {
    showErrorGeneral.value = true;
    console.error(error);
  }
};

/* usernames */
const optionSelectUsername: Ref<option[]> = ref([]);
const optionsUsersnames: Ref<option[]> = ref([]);

const fetchUsernames = async () => {
  try {
    const res = await userService.list(filter.value.usernames, 0, 10);
    optionsUsersnames.value = res.data.map((user) => ({
      value: user.username,
      text: user.username,
    }));
  } catch (error) {
    showErrorGeneral.value = true;
    console.error(error);
  }
};

/* currencies */
const optionSelectCurrenci: Ref<option[]> = ref([]);
const optionsCurrencies: Ref<option[]> = ref([]);

const fetchCurrencies = async () => {
  try {
    const res = await currencyService.list();
    optionsCurrencies.value = res.map((currency) => ({
      value: currency.id,
      text: currency.currency,
    }));
  } catch (error) {
    showErrorGeneral.value = true;
    console.error(error);
  }
};

/* Validation const */
const showErrorGeneral: Ref<boolean> = ref(false);
const errorText: Ref<string> = ref('Hubo un error obteniendo los datos');

/* props and emits*/
defineProps<{
  closeFilter: () => void;
  showFilter: boolean;
}>();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(['filterValue', 'restartFilterValue']);

const resetFilters = () => {
  filter.value = { descending: true };

  optionSelectFundName.value = [];
  optionSelectUsername.value = [];
  optionSelectCurrenci.value = [];
  optionSelectOrderBy.value = { value: null, text: '' };

  showErrorGeneral.value = false;
  console.log(optionSelectOrderBy.value);
  emit('restartFilterValue', null);
};

/* hooks */
onMounted(() => {
  fetchCurrencies();
  fetchFundsNames();
  fetchUsernames();
});
</script>
