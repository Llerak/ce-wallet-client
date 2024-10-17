<template>
  <div
    v-if="showFilter"
    class="fixed flex h-[100vh] w-[100vw] items-center justify-center p-4 max-md:p-0 z-50 top-0 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.4)]"
  >
    <form
      autocomplete="off"
      class="flex justify-center max-sm:h-[100vh] w-[500px] max-sm:w-full flex-col gap-6 bg-white p-12 max-sm:p-6 shadow-custom-shadow rounded-lg"
      @submit.prevent="handleFilter"
    >
      <div class="flex flex-col gap-2">
        <h4 class="text-primary">Filtrar registros de fondos</h4>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <div class="flex max-sm:flex-col gap-4">
            <InputMultiSelect
              :model-value="optionSelectFundName"
              :options="optionsFundsNames"
              :show-search="true"
              placeholder="---"
              title="Fondos"
              @emit-values="async (values: any) => ((fundNames = values), await fetchFundsNames())"
            />
            <InputMultiSelect
              :model-value="optionSelectUsername"
              :options="optionsUsernames"
              :show-search="true"
              placeholder="---"
              title="Usuarios"
              @emit-values="async (values: any) => ((usernames = values), await fetchUsersnames())"
            />
          </div>
          <div class="flex max-sm:flex-col gap-4">
            <InputMultiSelect
              :model-value="optionSelectCurrency"
              :options="optionsCurrencies"
              placeholder="---"
              title="Monedas"
              @emit-values="(values: any) => (currencies = values)"
            />
            <InputMultiSelect
              :model-value="optionSelectCurrency"
              :options="optionsCurrencies"
              placeholder="---"
              title="Tipo de transacción"
              @emit-values="(values: any) => (currencies = values)"
            />
          </div>
          <InputMultiSelect
            :model-value="optionSelectCurrency"
            :options="optionsCurrencies"
            placeholder="---"
            title="Acción"
            @emit-values="(values: any) => (currencies = values)"
          />
          <div class="flex flex-col">
            <label class="mb-2">Rango del Monto</label>
            <div class="flex gap-4">
              <input type="number" placeholder="Mínimo" />
              <input type="number" placeholder="Máximo" />
            </div>
          </div>
          <div class="flex flex-col">
            <label class="mb-2">Rango de la Fecha</label>
            <div class="flex max-sm:flex-col gap-4">
              <input type="datetime-local" class="w-[calc(50%-.5rem)] max-sm:w-full" placeholder="Mínimo" />
              <input type="datetime-local" class="w-[calc(50%-.5rem)] max-sm:w-full" placeholder="Máximo" />
            </div>
          </div>
          <InputSelect
            :model-value="optionSelectOrderBy"
            :options="optionsOrderBy"
            title="Ordenar por"
            @emit-value="(value: any) => (orderBy = value)"
          ></InputSelect>
          <CustomCheckBox
            title="Ordenar descendiente:"
            :default-value="descending"
            @return-value="(value: boolean) => descending = value"
          />
        </div>
        <div class="flex flex-col gap-2">
          <span
            :class="{
              'scale-100': showErrorGeneral,
              'scale-0': !showErrorGeneral,
            }"
            class="text-sm text-red-600 transition-all"
            >{{ errorText }}</span
          >
          <button class="w-full bg-primary text-white" type="submit">FILTRAR</button>
          <div class="flex gap-3">
            <button class="w-full bg-[#717ef5] text-white flex-1" type="button" @click="resetFilters()">
              RESTABLECER
            </button>
            <button
              class="w-full bg-white text-primary border-primary border-solid border-[1px] text-nowrap flex-1"
              type="button"
              @click="closeFilter"
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
import { IFundDto } from '@/interfaces/dto';
import CustomCheckBox from '@/components/CustomCheckBox.vue';

/* filter model */
const fundNames: Ref<string[]> = ref([]);
const usernames: Ref<string[]> = ref([]);
const currencies: Ref<string[]> = ref([]);
const descending: Ref<boolean> = ref(true);
const orderBy: Ref<boolean> = ref(false);

/* orderBy */
const optionSelectOrderBy: Ref<option> = ref({ value: false, text: 'Fecha' });
const optionsOrderBy: Ref<option[]> = ref([
  { value: true, text: 'Monto' },
  { value: false, text: 'Fecha' },
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
const optionsUsernames: Ref<option[]> = ref([]);

const fetchUsersnames = async () => {
  try {
    const res = await fundService.list({ usernames: usernames.value }, 0, 10);

    optionsUsernames.value = res.data
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
const optionSelectCurrency: Ref<option[]> = ref([]);
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

const emit = defineEmits(['filterValue', 'restartFilterValue']);

/* Filter */
const handleFilter = async () => {
  showErrorGeneral.value = false;
  try {
    // const filterModel: IFundFilter = {
    //   fundNames: fundNames.value,
    //   usernames: usernames.value,
    //   currencies: currencies.value,
    //   descending: descending.value,
    //   orderBy: orderBy.value,
    // };
    // emit('filterValue', filterModel);
  } catch (error) {
    showErrorGeneral.value = true;
    console.error(error);
  }
};

const resetFilters = () => {
  fundNames.value = [];
  usernames.value = [];
  currencies.value = [];
  descending.value = true;
  orderBy.value = false;

  optionSelectFundName.value = [];
  optionSelectUsername.value = [];
  optionSelectCurrency.value = [];
  optionSelectOrderBy.value = { value: null, text: '' };

  showErrorGeneral.value = false;
  emit('restartFilterValue', null);
};

/* hooks */
onMounted(() => {
  fetchCurrencies();
  fetchFundsNames();
  fetchUsersnames();
});

interface option {
  value: any;
  text: string;
}
</script>
