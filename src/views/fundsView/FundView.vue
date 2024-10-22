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
      :data="data.map(formatFundDataIntoTableInput)"
      :next-page="nextPage"
      :enabled-next="enabledNext"
      :enabled-back="enabledBack"
      :back-page="backPage"
      :page-current="pageCurrent"
      :show-filter="showFilterFunct"
      :filter-enabled="data.length > 1"
      :total-page="totalPageCurrent"
      :start-page="startPage"
      :end-page="endPage"
      button-label="AGREGAR FONDO"
      @return-item="getFundfromId"
    />
    <section id="details" class="flex flex-wrap gap-6">
      <DetailsFund
        v-if="fundSelectd !== null"
        :fund="fundSelectd"
        @refresh="fetchData()"
        @fund-delete="fetchData(), (fundSelectd = null)"
      />
    </section>
  </div>
  <FiltersFund
    :show-filter="showFilter"
    :close-filter="closeFilterFunct"
    @filter-value="
      (filters: any) => {
        handleFilter(filters);
      }
    "
    @restart-filter-value="(filters: IFundFilter) => handleResetFilter(filters)"
  />
  <AddFund v-if="showAdd" @fundAdded="handleFundAdded" :close-add="closeAddFunct" />
</template>

<script lang="ts" setup>
import ListModal from '../default/ListModal.vue';
import { IFundDto, IFundFilter } from '@/interfaces/dto';
import { onMounted, ref } from 'vue';
import { currencyService, fundService } from '@/services';
import AddFund from './AddFund.vue';
import DetailsFund from './DetailsFund.vue';
import FiltersFund from './FiltersFund.vue';

const showAdd = ref(false);
const showFilter = ref(false);
const data = ref<IFundDto[]>([]);
const header = ref<string[]>([]);
const keys = ref<string[]>([]);
const loading = ref(false);
const pageCurrent = ref(1);
const totalPageCurrent = ref(0);
const enabledNext = ref(false);
const enabledBack = ref(false);
const filter = ref<IFundFilter>({});
const currencyName = ref<string[]>([]);
const fundSelectd = ref<IFundDto | null>(null);

const fetchData = async () => {
  loading.value = true;
  data.value = [];
  await fetchDataCurrency();
  const res = await fundService.list(filter.value, pageCurrent.value - 1);
  if (res === undefined) return;
  totalPageCurrent.value = Math.ceil(res.totalLenght / 10);
  data.value = res.data;
  enabledNext.value = pageCurrent.value < totalPageCurrent.value;
  enabledBack.value = pageCurrent.value > 1;
  loading.value = false;
  fundSelectd.value !== null && getFundfromId(fundSelectd.value as { id: string });
};
const fetchDataCurrency = async () => {
  currencyName.value = [];
  const res = await currencyService.list();
  if (res === undefined) return;
  currencyName.value = res.map((res) => res.currency);
  header.value = ['Fondo', 'Usuario', ...currencyName.value];
  keys.value = ['name', 'user', ...currencyName.value];
};
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
const formatFundDataIntoTableInput = (data: IFundDto) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableInput = { id: data.id, name: data.name, user: data.user?.username || ' --- ' } as any;
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
const startPage = () => {
  pageCurrent.value = 1;
  fetchData();
};

const endPage = () => {
  pageCurrent.value = totalPageCurrent.value;
  fetchData();
};
const getFundfromId = (value: { id: string }) =>
  (fundSelectd.value = data.value.find((e: IFundDto) => e.id === value.id) || null);

onMounted(async () => {
  await fetchData();
});
</script>
