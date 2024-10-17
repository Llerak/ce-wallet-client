<template>
  <div class="flex flex-col gap-3">
    <h4 class="flex">Deposito</h4>

    <form
      @submit.prevent="handleDeposit"
      class="flex w-[360px] flex-col gap-6 bg-white p-12 shadow-custom-shadow rounded-lg"
      autocomplete="off"
    >
      <div class="flex flex-col gap-4">
        <InputSelect :model-value="optionSelectCurrenci" :options="optionsCurrencies" />
        <InputCustom
          :model-value="inputCurrency"
          type="number"
          :show-error="showErrorInputCurrency"
          :-error-text="textErrorInputCurrency"
        />
        <InputTextArea :model-value="details" />
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
        <button class="w-full bg-primary text-white" type="submit">DEPOSITAR</button>
        <button
          @click="() => console.log()"
          type="button"
          class="w-full bg-white text-primary border-primary border-solid border-[1px] text-nowrap"
        >
          RESTABLECER
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
/* import */
import { defineEmits, defineProps, onMounted, Ref, ref } from 'vue';
import { currencyService } from '@/services';
import InputSelect from '@/components/InputSelect.vue';
import InputCustom from '@/components/InputCustom.vue';
import InputTextArea from '@/components/InputTextArea.vue';

/* Validation const */
const showErrorGeneral: Ref<boolean> = ref(false);
const errorText: Ref<string> = ref('Ocurrio un error');
const inputCurrency = ref(0);
const showErrorInputCurrency = ref(false);
const textErrorInputCurrency = ref('El valor debe ser mayor que 0');
const details = ref('');

/* props and emits*/
const props = defineProps<{
  id: string;
}>();

const emit = defineEmits(['fundDeposit']);

/* Deposit */
const handleDeposit = async () => {
  if (inputCurrency.value < 1) {
    showErrorInputCurrency.value = true;
    inputCurrency.value = 0;
  }
  showErrorGeneral.value = false;

  try {
    /* await fundService.deposit(props.id); */
    emit('fundDeposit');
  } catch (error) {
    showErrorGeneral.value = true;
    console.error('Create failed:', error);
  }
};

/* currencies */
interface option {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  text: string;
}
const optionSelectCurrenci: Ref<option> = ref({ value: null, text: '' });
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
});
</script>
