<template>
  <div class="flex flex-col gap-6">
    <ListModal
      name="Fondos"
      :add-enabled="true"
      :show-add="showAddFunct"
      :hidden-mobile="[2, 3, 4, 5]"
      :is-loading="statusApi.isLoading"
      :header="header"
      :keys="keys"
      :data="data"
      button-label="AGREGAR FONDO"
    />
    <div class="flex gap-6 flex-wrap">
      <div v-for="(value, index) in detailsValue" :key="index" class="flex min-[480px]:w-min w-full flex-1">
        <PostCustom :title="detailsKey[index]" :content="value"></PostCustom>
      </div>
    </div>
  </div>
  <AddFund v-if="showAdd" :close-add="closeAddFunct" />
</template>

<script lang="ts" setup>
import ListModal from '../default/ListModal.vue';
import PostCustom from '@/components/PostCustom.vue';
import { IFundDto } from '@/interfaces/dto';
import { onMounted, Ref, ref } from 'vue';
import { fundService } from '@/services';
import { statusApi } from '@/store/global';
import AddFund from './AddFund.vue';

const Currencies = ['CUP', 'USD', 'MLC', 'EUR'];
const header = ['Fondo', ...Currencies];
const keys = ['name', ...Currencies];
const detailsKey = ['Nombre', 'Usuario', 'Creado en', 'EUR', 'USD', 'MLC', 'CUP', 'Dirección', 'Detalles'];
const detailsValue = [
  'Test',
  'Alberto',
  '24-06-2024',
  '10000',
  '10000',
  '10000',
  '10000',
  'carretera Fontanar wajay km 2 y 1/2 sin # de ksa',
  'Son muchos detalles',
];

let showAdd: Ref<boolean> = ref(true);
const showAddFunct = () => {
  showAdd.value = true;
};
const closeAddFunct = () => {
  showAdd.value = false;
};

let data = ref<any[]>([]);

onMounted(async () => {
  const res = await fundService.list();
  if (res === undefined) return;
  data.value = res.data.map(formatFundDataIntoTableInput);
});

const formatFundDataIntoTableInput = (data: IFundDto) => {
  const tableInput = { name: data.name } as any;
  const currencyDataIsNull = data.currencies === null;
  const fundCurrencies = data.currencies as { currency: string; amount: number }[];

  for (const currency of Currencies) {
    tableInput[currency] = 0;
    if (currencyDataIsNull) continue;
    let fundCurrency = fundCurrencies.find((fundCurrency) => fundCurrency.currency == currency);
    if (fundCurrency === undefined) continue;
    tableInput[currency] = fundCurrency.amount;
  }

  return tableInput;
};
</script>
