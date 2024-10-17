<template>
  <div class="flex flex-col gap-6">
    <ListModal
      name="Fondos"
      :add-enabled="true"
      :show-add="showAddFunct"
      :hidden-mobile="[2, ...Array.from({ length: keys.length }, (_, i) => i + 3)]"
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
      @return-id="idFundFunctional"
      :show-filter="showFilterFunct"
    />
    <section id="details" class="flex">
      <DetailsFund :id="idFund" v-if="idFund !== ''" />
    </section>
  </div>
  <FiltersFund
    :show-filter="showFilter"
    :close-filter="closeFilterFunct"
    @filter-value="
      (filters) => {
        handleFilter(filters);
      }
    "
    @restartfilter-value="(filters: IFundFilter) => handleResetFilter(filters)"
  />
  <AddFund v-if="showAdd" @fundAdded="handleFundAdded" :close-add="closeAddFunct" />
</template>

<script lang="ts" setup>
/* imports */
import ListModal from '../default/ListModal.vue';
import { IFundDto, IFundFilter } from '@/interfaces/dto';
import { onMounted, Ref, ref } from 'vue';
import { currencyService, fundService } from '@/services';
import AddFund from './AddFund.vue';
import DetailsFund from './DetailsFund.vue';
import FiltersFund from './FiltersFund.vue';

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

/* filter Functionality*/
const showFilter: Ref<boolean> = ref(false);
const showFilterFunct = () => {
  showFilter.value = true;
};
const closeFilterFunct = () => {
  showFilter.value = false;
};
const handleFilter = async (filterValue: IFundFilter) => {
  closeFilterFunct();
  filter.value = filterValue;
  pageCurrent.value = 1;
  await fetchData();
};
const handleResetFilter = async (filterValue: IFundFilter) => {
  closeFilterFunct();
  filter.value = filterValue;
  pageCurrent.value = 1;
  await fetchData();
};

/* table Functionality*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data = ref<any[]>([]);
const header = ref<string[]>([]);
const keys = ref<string[]>([]);
const loading: Ref<boolean> = ref(false);

const fetchData = async () => {
  loading.value = true;
  data.value = [];
  await fetchDataCurrency();
  const res = await fundService.list(filter.value, pageCurrent.value - 1);
  if (res === undefined) return;
  totalPageCurrent.value = Math.ceil(res.totalLenght / 10);
  data.value = res.data.map(formatFundDataIntoTableInput);
  enabledNext.value = pageCurrent.value < totalPageCurrent.value;
  enabledBack.value = pageCurrent.value > 1;
  loading.value = false;
};
const formatFundDataIntoTableInput = (data: IFundDto) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableInput = { id: data.id, name: data.name, user: data.user || 'none' } as any;
  const currencyDataIsNull = data.currencies === null;
  const fundCurrencies = data.currencies as { currency: string; amount: number }[];

  for (const currency of currencyName.value) {
    tableInput[currency] = 0;
    if (currencyDataIsNull) continue;
    let fundCurrency = fundCurrencies.find((fundCurrency) => fundCurrency.currency == currency);
    if (fundCurrency === undefined) continue;
    tableInput[currency] = fundCurrency.amount;
  }

  return tableInput;
};

/* pagination */
const pageCurrent: Ref<number> = ref(1);
const totalPageCurrent: Ref<number> = ref(0);
const enabledNext: Ref<boolean> = ref(false);
const enabledBack: Ref<boolean> = ref(false);

const nextPage = () => {
  if (pageCurrent.value < totalPageCurrent.value) {
    pageCurrent.value++;
    fetchData();
  }
};
const backPage = () => {
  if (pageCurrent.value > 1) {
    pageCurrent.value--;
    fetchData();
  }
};
/* filter */
const filter: Ref<IFundFilter> = ref({});

/* currency */
const currencyName = ref<string[]>([]);
const fetchDataCurrency = async () => {
  currencyName.value = [];
  const res = await currencyService.list();
  if (res === undefined) return;
  currencyName.value = res.map((res) => res.currency);
  header.value = ['Fondo', 'Usuario', ...currencyName.value];
  keys.value = ['name', 'user', ...currencyName.value];
};

/* hooks */
onMounted(async () => {
  await fetchData();
});

/* emit test */
const idFund = ref('');
const idFundFunctional = (id: string) => {
  idFund.value = id;
};
</script>
