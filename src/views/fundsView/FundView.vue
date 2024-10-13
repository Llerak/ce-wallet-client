<template>
  <div class="flex flex-col gap-6">
    <ListModal
      name="Fondos"
      :add-enabled="true"
      :show-add="showAddFunct"
      :hidden-mobile="[2, 3, 4, 5]"
      :is-loading="loading"
      :header="header"
      :keys="keys"
      :data="data"
      :next-page="nextPage"
      :enabled-next="enabledNext"
      :enabled-back="enabledBack"
      :back-page="backPage"
      :page-current="pageCurrent"
      button-label="AGREGAR FONDO"
    />
    <div class="flex gap-6 flex-wrap">
      <div v-for="(value, index) in detailsValue" :key="index" class="flex min-[480px]:w-min w-full flex-1">
        <PostCustom :title="detailsKey[index]" :content="value"></PostCustom>
      </div>
    </div>
  </div>
  <AddFund v-if="showAdd" @fundAdded="handleFundAdded" :close-add="closeAddFunct" />
  <!-- <FiltersFund v-if="showFilter" @fundFilter="handleFundFilter" :close-filter="closeFilterFunct" /> -->
</template>

<script lang="ts" setup>
/* imports */
import ListModal from '../default/ListModal.vue';
import PostCustom from '@/components/PostCustom.vue';
import { IFundDto } from '@/interfaces/dto';
import { onMounted, Ref, ref } from 'vue';
import { fundService } from '@/services';
import AddFund from './AddFund.vue';

/* const */
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

/* add Functionality*/
const showAdd: Ref<boolean> = ref(false);
const showAddFunct = () => {
  showAdd.value = true;
};
const closeAddFunct = () => {
  showAdd.value = false;
};

const handleFundAdded = async () => {
  closeAddFunct();
  await fetchData();
};

/* table Functionality*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data = ref<any[]>([]);
const loading: Ref<boolean> = ref(false);
const pageCurrent: Ref<number> = ref(1);
const totalPageCurrent: Ref<number> = ref(0);
const enabledNext: Ref<boolean> = ref(false);
const enabledBack: Ref<boolean> = ref(false);

const nextPage = () => {
  if (pageCurrent.value < totalPageCurrent.value) {
    pageCurrent.value++;
    fetchData();
  }
  console.log(pageCurrent.value - 1);
};

const backPage = () => {
  if (pageCurrent.value > 1) {
    pageCurrent.value--;
    fetchData();
  }

  console.log(pageCurrent.value - 1);
};

const fetchData = async () => {
  loading.value = true;
  data.value = [];
  const res = await fundService.list(undefined, pageCurrent.value - 1);
  if (res === undefined) return;
  totalPageCurrent.value = Math.ceil(res.totalLenght / 10);
  data.value = res.data.map(formatFundDataIntoTableInput);
  enabledNext.value = pageCurrent.value < totalPageCurrent.value;
  enabledBack.value = pageCurrent.value > 1;
  loading.value = false;
};

const formatFundDataIntoTableInput = (data: IFundDto) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

/* hooks */
onMounted(async () => {
  await fetchData();
});
</script>
