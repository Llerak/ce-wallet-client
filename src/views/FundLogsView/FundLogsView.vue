<template>
  <div class="flex flex-col gap-6">
    <ListModal
      :back-page="backPage"
      :data="data"
      :enabled-back="enabledBack"
      :enabled-next="enabledNext"
      :header="header"
      :is-loading="loading"
      :keys="keys"
      :next-page="nextPage"
      :page-current="pageCurrent"
      :show-filter="showFilterFunct"
      name="Registro de las actividades de los fondos"
      @return-id="test"
    />
    <DetailsFund v-if="idFund !== ''" :id="idFund" />
  </div>
  <FiltersFund
    :close-filter="closeFilterFunct"
    :show-filter="showFilter"
    @filter-value="
      (filters: IFundLogsFilter) => {
        handleFilter(filters);
      }
    "
    @restartfilter-value="(filters: IFundFilter) => handleResetFilter(filters)"
  />
</template>

<script lang="ts" setup>
/* imports */
import ListModal from '../default/ListModal.vue';
import { IFundFilter, IFundLogDto, IFundLogsFilter } from '@/interfaces/dto';
import { onMounted, Ref, ref } from 'vue';
import { fundLogsService } from '@/services';
import DetailsFund from './FundLogDetails.vue';
import FiltersFund from './FundLogsFilters.vue';

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
const handleFilter = async (filterValue: IFundLogsFilter) => {
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
const header = ref<string[]>(['Usuario', 'Fondo', 'Accion', 'Tipo de Transaccion', 'Moneda', 'Monto', 'Fecha']);
const keys = ref<string[]>(['user', 'fund', 'action', 'transaction', 'currency', 'amount', 'date']);
const loading: Ref<boolean> = ref(false);

const fetchData = async () => {
  loading.value = true;
  data.value = [];
  const res = await fundLogsService.list(filter.value, pageCurrent.value - 1);
  if (res === undefined) return;
  totalPageCurrent.value = Math.ceil(res.totalLenght / 10);
  data.value = res.data.map(formatFundDataIntoTableInput);
  enabledNext.value = pageCurrent.value < totalPageCurrent.value;
  enabledBack.value = pageCurrent.value > 1;
  loading.value = false;
};
const formatFundDataIntoTableInput = (data: IFundLogDto) => {
  const tableInput: ITableInput = {
    user: data.user,
    fund: data.fund,
    action: data.activity,
    transaction: data.transactionType || '---',
    currency: data.currency || '---',
    amount: data.amount || 0,
    date: new Date(data.createdAt).toLocaleString(),
  };
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
const filter: Ref<IFundLogsFilter> = ref({});

/* hooks */
onMounted(async () => {
  await fetchData();
});

/* emit test */
const idFund = ref('');
const test = (id: string) => (idFund.value = id);

/* structs */
interface ITableInput {
  user: string;
  fund: string;
  action: string;
  transaction: string;
  currency: string;
  amount: number;
  date: string;
}
</script>
