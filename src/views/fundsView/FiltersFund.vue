<template>
  <div
    v-if="showFilter"
    class="fixed flex h-[100vh] w-[100vw] items-center justify-center p-4 z-50 top-0 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.4)]"
  >
    <form
      @submit.prevent="handleFilter"
      class="flex w-[360px] flex-col gap-6 bg-white p-12 shadow-custom-shadow rounded-lg"
      autocomplete="off"
    >
      <div class="flex flex-col gap-2">
        <h4 class="text-[#F58D71]">Filtrar Fondos</h4>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <InputMultiSelect
            :model-value="optionSelectFundName"
            :options="optionsFundsNames"
            :show-search="true"
            title="Fondos"
            placeholder="Opciones"
            @emit-values="async (values) => ((fundNames = values), await fetchFundsNames())"
            @update:model-value="(value) => (optionSelectFundName = value)"
          />
          <InputMultiSelect
            :model-value="optionSelectUsername"
            :options="optionsUsersnames"
            :show-search="true"
            title="Nombres"
            placeholder="Opciones"
            @emit-values="async (valuess) => ((usernames = valuess), await fetchUsersnames())"
            @update:model-value="(value) => (optionSelectUsername = value)"
          />
          <InputMultiSelect
            title="Monedas"
            :model-value="optionSelectCurrenci"
            :options="optionsCurrencies"
            placeholder="Opciones"
            @emit-values="(values) => (currencies = values)"
            @update:model-value="(value) => (optionSelectCurrenci = value)"
          />
          <InputSelect
            title="Ordenar descendiente"
            :model-value="optionSelectDescending"
            :options="optionsDescending"
            @emit-value="(value) => (descending = value)"
            @update:model-value="(value) => (optionSelectDescending = value)"
          ></InputSelect>
          <InputSelect
            title="Ordenar por"
            :model-value="optionSelectOrderBy"
            :options="optionsOrderBy"
            @emit-value="(value) => (orderBy = value)"
            @update:model-value="(value) => (optionSelectOrderBy = value)"
          ></InputSelect>
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
          <button type="submit" class="w-full bg-[#F58D71] text-white">FILTRAR</button>
          <div class="flex gap-3">
            <button @click="resetFilters()" type="button" class="w-full bg-[#717ef5] text-white flex-1">
              RESTABLECER
            </button>
            <button
              @click="closeFilter"
              type="button"
              class="w-full bg-white text-[#F58D71] border-[#F58D71] border-solid border-[1px] text-nowrap flex-1"
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
import { ref, Ref, defineProps, defineEmits, onMounted } from 'vue';
import InputSelect from '@/components/InputSelect.vue';
import InputMultiSelect from '@/components/InputMultiSelect.vue';
import { currencyService, fundService } from '@/services';
import { IFundDto, IFundFilter } from '@/interfaces/dto';

/* filter model */
const fundNames: Ref<string[]> = ref([]);
const usernames: Ref<string[]> = ref([]);
const currencies: Ref<string[]> = ref([]);
const descending: Ref<boolean | undefined> = ref();
const orderBy: Ref<'usernames' | 'funds' | 'create_at' | undefined> = ref(undefined);

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

/* descending */
const optionSelectDescending: Ref<option> = ref({ value: null, text: '' });
const optionsDescending: Ref<option[]> = ref([
  { value: true, text: 'true' },
  { value: false, text: 'false' },
]);

/* fundsNames */
const optionSelectFundName: Ref<option[]> = ref([]);
const optionsFundsNames: Ref<option[]> = ref([]);

const fetchFundsNames = async () => {
  try {
    const res = await fundService.list({ fundNames: fundNames.value }, 0, 10);
    optionsFundsNames.value = res.data
      .map((fund: IFundDto) => ({
        value: fund.name,
        text: fund.name,
      }))
      .filter((option) => option.value !== '');
  } catch (error) {
    showErrorGeneral.value = true;
    console.error(error);
  }
};

/* usernames */
const optionSelectUsername: Ref<option[]> = ref([]);
const optionsUsersnames: Ref<option[]> = ref([]);

const fetchUsersnames = async () => {
  try {
    const res = await fundService.list({ usernames: usernames.value }, 0, 10);

    optionsUsersnames.value = res.data
      .map((fund: IFundDto) => ({
        value: fund.user?.username || '',
        text: fund.user?.username || '',
      }))
      .filter((option) => option.value !== '');
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
    optionsCurrencies.value = res
      .map((currency) => ({
        value: currency.id,
        text: currency.currency,
      }))
      .filter((option) => option.value !== '');
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
const emit = defineEmits(['filterValue', 'restartfilterValue']);

/* Filter */
const handleFilter = async () => {
  showErrorGeneral.value = false;
  try {
    const filterModel: IFundFilter = {
      fundNames: fundNames.value,
      usernames: usernames.value,
      currencies: currencies.value,
      descending: descending.value,
      orderBy: orderBy.value,
    };
    emit('filterValue', filterModel);
  } catch (error) {
    showErrorGeneral.value = true;
    console.error(error);
  }
};

const resetFilters = () => {
  fundNames.value = [];
  usernames.value = [];
  currencies.value = [];
  descending.value = undefined;
  orderBy.value = undefined;

  optionSelectFundName.value = [];
  optionSelectUsername.value = [];
  optionSelectCurrenci.value = [];
  optionSelectDescending.value = { value: null, text: '' };
  optionSelectOrderBy.value = { value: null, text: '' };

  showErrorGeneral.value = false;
  console.log(optionSelectOrderBy.value);
  emit('restartfilterValue', null);
};

/* hooks */
onMounted(() => {
  fetchCurrencies();
  fetchFundsNames();
  fetchUsersnames();
});
</script>
