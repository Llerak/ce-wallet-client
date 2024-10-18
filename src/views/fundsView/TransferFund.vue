<template>
  <div
    class="fixed flex h-[100vh] w-[100vw] items-center justify-center p-4 z-50 top-0 left-0 backdrop-blur-[3px] bg-[rgba(0,0,0,0.4)]"
  >
    <form
      @submit.prevent="handleTransfer"
      class="flex w-[360px] flex-col gap-6 bg-white p-12 shadow-custom-shadow rounded-lg"
      autocomplete="off"
    >
      <div class="flex flex-col gap-2">
        <h4 class="text-primary">Transferir</h4>
      </div>
      <div class="flex flex-col gap-4">
        <InputSelect
          :model-value="optionSelectCurrenci"
          :options="optionsCurrencies"
          title="Moneda"
          :show-error="showErrorSelectCurrency"
          @update:model-value="(value) => (optionSelectCurrenci = value)"
        />
        <InputSelect
          :model-value="optionSelectFundName"
          :options="optionsFundsNames"
          :show-search="true"
          title="Fondo"
          :show-error="showErrorSelectFund"
          @update:model-value="(value) => (optionSelectFundName = value)"
          @emit-values="async (values) => ((fundNamesRef = values), await fetchFundsNames())"
        />
        <InputCustom
          v-model="inputCurrency"
          title="Cantidad"
          type="number"
          :show-error="showErrorInputCurrency"
          :-error-text="textErrorInputCurrency"
        />
        <InputTextArea v-model="details" title="Detalles" />
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
        <button class="w-full bg-primary text-white" type="submit">TRANSFERIR</button>
        <button
          @click="closeTransfer()"
          type="button"
          class="w-full bg-white text-primary border-primary border-solid border-[1px] text-nowrap"
        >
          CERRAR
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
/* import */
import { defineEmits, defineProps, onMounted, Ref, ref, watch } from 'vue';
import { currencyService, fundService } from '@/services';
import InputSelect from '@/components/InputSelect.vue';
import InputCustom from '@/components/InputCustom.vue';
import InputTextArea from '@/components/InputTextArea.vue';
import { IFundDto, ITransferInfoDto } from '@/interfaces/dto';

/* Validation const */
const showErrorGeneral: Ref<boolean> = ref(false);
const errorText: Ref<string> = ref('Ocurrio un error');
const inputCurrency = ref(0);
const showErrorInputCurrency = ref(false);
const showErrorSelectCurrency = ref(false);
const textErrorInputCurrency = ref('El valor debe ser mayor que 0');
const details = ref('');

/* props and emits*/
const props = defineProps<{
  closeTransfer: () => void;
  id: string;
  currencies: currency[] | null;
}>();
interface currency {
  currency: string;
  amount: number;
}

const emit = defineEmits(['fundTransfer']);

/* Transfer */
const handleTransfer = async () => {
  showErrorGeneral.value = false;
  if (validation()) {
    try {
      const transfer: ITransferInfoDto = {
        source: props.id,
        currency: optionSelectCurrenci.value.value,
        details: details.value == '' ? null : details.value,
        amount: inputCurrency.value,
        destination: optionSelectFundName.value.value,
      };
      await fundService.transfer(transfer);
      restart();

      emit('fundTransfer');
    } catch (error) {
      showErrorGeneral.value = true;
      console.error('Transfer failed:', error);
    }
  }
};

const validation = () => {
  showErrorInputCurrency.value = false;
  showErrorSelectCurrency.value = false;
  showErrorSelectFund.value = false;

  const selectedCurrency = props.currencies?.find((curr) => curr.currency === optionSelectCurrenci.value.text);
  const maxAmount = selectedCurrency ? selectedCurrency.amount : 0;

  if (maxAmount > 0 && optionSelectFundName.value.value !== '') {
    if (inputCurrency.value < 1 || inputCurrency.value > maxAmount) {
      showErrorInputCurrency.value = true;
      textErrorInputCurrency.value =
        inputCurrency.value < 1 ? 'El valor debe ser mayor que 0' : 'El valor no puede sobrepasar ' + maxAmount;
      inputCurrency.value = 0;
    }
  } else {
    showErrorInputCurrency.value = true;
    textErrorInputCurrency.value = 'Se requiere una moneda y campo seleccionados';
  }

  if (optionSelectCurrenci.value.value === '') {
    showErrorSelectCurrency.value = true;
  }
  if (optionSelectFundName.value.value === '') {
    showErrorSelectFund.value = true;
  }

  return !(showErrorInputCurrency.value || showErrorSelectCurrency.value || showErrorSelectFund.value);
};

const restart = () => {
  inputCurrency.value = 0;
  showErrorInputCurrency.value = false;
  showErrorSelectCurrency.value = false;
  showErrorSelectFund.value = false;
  details.value = '';
  optionSelectCurrenci.value = { value: '', text: '' };
  optionSelectFundName.value = { value: '', text: '' };
  showErrorGeneral.value = false;
};

/* currencies */
interface option {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  text: string;
}
const optionSelectCurrenci: Ref<option> = ref({ value: '', text: '' });
const optionsCurrencies: Ref<option[]> = ref([]);

const fetchCurrencies = async () => {
  try {
    const res = await currencyService.list();
    optionsCurrencies.value = res
      .map((currency) => ({
        value: currency.id,
        text: currency.currency,
      }))
      .filter((option) => option.value !== '')
      .filter((option) => option.text !== '')
      .filter((option) => props.currencies?.some((curr) => curr.currency === option.text));
  } catch (error) {
    showErrorGeneral.value = true;
    console.error(error);
  }
};

/* fundsNames */
const fundNamesRef: Ref<string[]> = ref([]);
const optionSelectFundName: Ref<option> = ref({ value: '', text: '' });
const optionsFundsNames: Ref<option[]> = ref([]);
const showErrorSelectFund: Ref<boolean> = ref(false);

const fetchFundsNames = async () => {
  console.log(fundNamesRef.value);
  try {
    const res = await fundService.list({ fundNames: fundNamesRef.value }, 0, 10);
    optionsFundsNames.value = res.data
      .map((fund: IFundDto) => ({
        value: fund.id,
        text: fund.name,
      }))
      .filter((option) => option.value !== '')
      .filter((option) => option.value !== props.id);
  } catch (error) {
    showErrorGeneral.value = true;
    console.error(error);
  }
};

onMounted(() => {
  fetchCurrencies();
  fetchFundsNames();
  restart();
});

watch(
  () => props.id,
  (newId) => {
    if (newId) {
      restart();
    }
  }
);
</script>
