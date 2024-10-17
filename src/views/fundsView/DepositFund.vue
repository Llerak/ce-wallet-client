<template>
  <div class="flex flex-col gap-3">
    <h4 class="flex">Deposito</h4>

    <form
      @submit.prevent="handleDeposit"
      class="flex w-[360px] flex-col gap-6 bg-white p-12 shadow-custom-shadow rounded-lg h-full"
      autocomplete="off"
    >
      <div class="flex flex-col gap-4">
        <InputSelect
          :model-value="optionSelectCurrenci"
          :options="optionsCurrencies"
          title="Moneda"
          :show-error="showErrorSelectCurrency"
          @update:model-value="(value) => (optionSelectCurrenci = value)"
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
        <button type="submit" class="w-full bg-[#F58D71] text-white">DEPOSITAR</button>
        <button
          @click="restart()"
          type="button"
          class="w-full bg-white text-[#F58D71] border-[#F58D71] border-solid border-[1px] text-nowrap"
        >
          RESTABLECER
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
/* import */
import { ref, Ref, defineProps, defineEmits, onMounted, watch } from 'vue';
import { currencyService, fundService } from '@/services';
import InputSelect from '@/components/InputSelect.vue';
import InputCustom from '@/components/InputCustom.vue';
import InputTextArea from '@/components/InputTextArea.vue';
import { ITransactionInfoDto } from '@/interfaces/dto';

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
  id: string;
}>();

const emit = defineEmits(['fundDeposit']);

/* Deposit */
const handleDeposit = async () => {
  showErrorGeneral.value = false;
  if (validation()) {
    try {
      const transaction: ITransactionInfoDto = {
        source: props.id,
        currency: optionSelectCurrenci.value.value,
        details: details.value == '' ? null : details.value,
        amount: inputCurrency.value,
      };
      console.log(transaction);
      await fundService.deposit(transaction);
      restart();
      emit('fundDeposit');
    } catch (error) {
      showErrorGeneral.value = true;
      console.error('Deposit failed:', error);
    }
  }
};

const validation = () => {
  showErrorInputCurrency.value = false;
  showErrorSelectCurrency.value = false;

  if (inputCurrency.value < 1) {
    showErrorInputCurrency.value = true;
    inputCurrency.value = 0;
  }
  if (optionSelectCurrenci.value.value == '') {
    showErrorSelectCurrency.value = true;
  }
  return !(showErrorInputCurrency.value || showErrorSelectCurrency.value);
};

const restart = () => {
  inputCurrency.value = 0;
  showErrorInputCurrency.value = false;
  details.value = '';
  optionSelectCurrenci.value = { value: '', text: '' };
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
      .filter((option) => option.value !== '');
  } catch (error) {
    showErrorGeneral.value = true;
    console.error(error);
  }
};

onMounted(() => {
  fetchCurrencies();
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
