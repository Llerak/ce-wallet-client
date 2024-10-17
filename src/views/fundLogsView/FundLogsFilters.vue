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
              @emit-values="async (values: any) => ((filter.funds = values), await fetchFundsNames())"
            />
            <InputMultiSelect
              :model-value="optionSelectUsername"
              :options="optionsUsernames"
              :show-search="true"
              placeholder="---"
              title="Usuarios"
              @emit-values="async (values: any) => ((filter.users = values), await fetchUsernames())"
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
            @emit-value="(value: boolean) => (filter.amountOrCreateDate = value)"
          ></InputSelect>
          <CustomCheckBox
            title="Ordenar descendiente:"
            :default-value="filter.desc"
            @return-value="(value: boolean) => filter.desc = value"
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
            <button class="w-full bg-[#717ef5] text-white flex-1" type="button" @click="resetFilters">
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
import { defineEmits, defineProps, onMounted, Ref, ref } from 'vue';
import InputSelect from '@/components/InputSelect.vue';
import InputMultiSelect from '@/components/InputMultiSelect.vue';
import { currencyService, fundService } from '@/services';
import { IFundDto, IFundLogsFilter, IUserDto } from '@/interfaces/dto';
import CustomCheckBox from '@/components/CustomCheckBox.vue';
import { userService } from '@/services/userService';

defineProps<{
  closeFilter: () => void;
  showFilter: boolean;
}>();
const emit = defineEmits(['filterValue', 'restartFilterValue']);

const filter: Ref<IFundLogsFilter> = ref({ desc: true });
const showErrorGeneral: Ref<boolean> = ref(false);
const errorText: Ref<string> = ref('Hubo un error obteniendo los datos');
interface option {
  value: any;
  text: string;
}

const optionSelectFundName: Ref<option[]> = ref([]);
const optionsFundsNames: Ref<option[]> = ref([]);
const optionSelectUsername: Ref<option[]> = ref([]);
const optionsUsernames: Ref<option[]> = ref([]);
const optionSelectCurrency: Ref<option[]> = ref([]);
const optionsCurrencies: Ref<option[]> = ref([]);
const optionSelectOrderBy: Ref<option> = ref({ value: false, text: 'Fecha' });
const optionsOrderBy: Ref<option[]> = ref([
  { value: true, text: 'Monto' },
  { value: false, text: 'Fecha' },
]);

onMounted(() => {
  fetchCurrencies();
  fetchFundsNames();
  fetchUsernames();
});

const fetchFundsNames = async () => {
  try {
    const res = await fundService.list({ fundNames: filter.value.funds }, 0, 10);
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

const fetchUsernames = async () => {
  try {
    const res = await userService.list(filter.value.users);
    optionsUsernames.value = res.data
      .map((user: IUserDto) => ({
        value: user.username,
        text: user.username,
      }))
      .filter((option) => option.value !== '');
  } catch (error) {
    showErrorGeneral.value = true;
    console.error(error);
  }
};

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

const handleFilter = async () => {
  showErrorGeneral.value = false;
  try {
    emit('filterValue', filter.value);
  } catch (error) {
    showErrorGeneral.value = true;
    console.error(error);
  }
};

const resetFilters = () => {
  filter.value = { desc: true };

  optionSelectFundName.value = [];
  optionSelectUsername.value = [];
  optionSelectCurrency.value = [];
  optionSelectOrderBy.value = { value: false, text: 'Fecha' };

  showErrorGeneral.value = false;
  emit('restartFilterValue', null);
};
</script>
