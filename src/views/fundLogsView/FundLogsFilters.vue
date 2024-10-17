<template>
  <div
    v-if="showFilter"
    class="fixed flex h-[100vh] w-[100vw] items-center justify-center p-4 max-md:p-0 z-50 top-0 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.4)]"
  >
    <form
      autocomplete="off"
      class="flex justify-center max-sm:h-[100vh] w-[600px] max-sm:w-full flex-col gap-6 bg-white p-12 max-sm:p-6 shadow-custom-shadow rounded-lg"
      @submit.prevent="emit('filterValue', filter)"
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
              @emit-values="(values: any) => (filter.currencies = values)"
            />
            <InputMultiSelect
              :model-value="optionSelectTransaction"
              :options="optionsTransactions"
              placeholder="---"
              title="Tipo de transacción"
              @emit-values="(values: any) => (filter.fundTransactions = values)"
            />
          </div>
          <InputMultiSelect
            :model-value="optionSelectAction"
            :options="optionsActions"
            placeholder="---"
            title="Acción"
            @emit-values="(values: any) => (filter.activities = values)"
          />
          <div class="flex flex-col">
            <label class="mb-2">Rango del Monto</label>
            <div class="flex gap-4">
              <input v-model="filter.amountMin" placeholder="Mínimo" type="number" />
              <input v-model="filter.amountMax" placeholder="Máximo" type="number" />
            </div>
          </div>
          <div class="flex flex-col">
            <label class="mb-2">Rango de la Fecha: Desde - Hasta</label>
            <div class="flex max-sm:flex-col gap-4">
              <input v-model="filter.since" class="w-[calc(50%-.5rem)] max-sm:w-full" type="datetime-local" />
              <input v-model="filter.until" class="w-[calc(50%-.5rem)] max-sm:w-full" type="datetime-local" />
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
import { ActionType, IFundDto, IFundLogsFilter, IUserDto, TransactionType } from '@/interfaces/dto';
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
const optionSelectTransaction: Ref<option[]> = ref([]);
const optionsTransactions: Ref<option[]> = ref([
  { value: ActionType.Deposit, text: ActionType.Deposit },
  { value: ActionType.Withdrawal, text: ActionType.Withdrawal },
]);
const optionSelectAction: Ref<option[]> = ref([]);
const optionsActions: Ref<option[]> = ref([
  { value: TransactionType.CreateFund, text: TransactionType.CreateFund },
  { value: TransactionType.DeleteCurrency, text: TransactionType.DeleteCurrency },
  { value: TransactionType.DeleteFund, text: TransactionType.DeleteFund },
  { value: TransactionType.Deposit, text: TransactionType.Deposit },
  { value: TransactionType.Transfer, text: TransactionType.Transfer },
  { value: TransactionType.Withdrawal, text: TransactionType.Withdrawal },
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
