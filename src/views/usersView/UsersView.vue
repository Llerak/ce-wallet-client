<template>
  <div class="flex flex-col gap-6">
    <ListModal
      name="Usuarios"
      :add-enabled="true"
      :show-add="showAddFunct"
      :is-loading="loading"
      :header="header"
      :keys="keys"
      :data="data"
      :next-page="nextPage"
      :enabled-next="enabledNext"
      :enabled-back="enabledBack"
      :back-page="backPage"
      :page-current="pageCurrent"
      button-label="AGREGAR USUARIO"
      @return-id="idUserFunctional"
      :show-filter="showFilterFunct"
    />
    <section id="details" class="flex flex-wrap gap-6">
      <DetailsUser :id="idUser" v-if="idUser !== ''" @fund-delete="fetchData(), (idUser = '')" />
    </section>
  </div>
  <!--  <FiltersFund
    :show-filter="showFilter"
    :close-filter="closeFilterFunct"
    @filter-value="
      (filters: any) => {
        handleFilter(filters);
      }
    "
    @restart-filter-value="(filters: IFundFilter) => handleResetFilter(filters)"
  />
  <AddFund v-if="showAdd" @fundAdded="handleFundAdded" :close-add="closeAddFunct" /> -->
</template>

<script lang="ts" setup>
/* imports */
import ListModal from '../default/ListModal.vue';
import { IUserDto } from '@/interfaces/dto';
import { onMounted, Ref, ref } from 'vue';
import { userService } from '@/services/userService';
import DetailsUser from './DetailsUser.vue';

/* add Functionality*/
const showAdd: Ref<boolean> = ref(false);
const showAddFunct = () => {
  showAdd.value = true;
};
/* const closeAddFunct = () => {
  showAdd.value = false;
};
const handleFundAdded = async () => {
  closeAddFunct();
  await fetchData();
}; */

/* filter Functionality*/
const showFilter: Ref<boolean> = ref(false);
const showFilterFunct = () => {
  showFilter.value = true;
};
/* const closeFilterFunct = () => {
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
}; */

/* table Functionality*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data = ref<any[]>([]);
const header = ref<string[]>(['Usuario', 'Rol', 'Fecha']);
const keys = ref<string[]>(['username', 'role', 'createAt']);
const loading: Ref<boolean> = ref(false);

const fetchData = async () => {
  loading.value = true;
  data.value = [];
  const res = await userService.list(undefined, pageCurrent.value - 1, 10, true);
  if (res === undefined) return;
  totalPageCurrent.value = Math.ceil(res.totalLenght / 10);
  data.value = res.data.map(formatFundDataIntoTableInput);
  enabledNext.value = pageCurrent.value < totalPageCurrent.value;
  enabledBack.value = pageCurrent.value > 1;
  loading.value = false;
};
const formatFundDataIntoTableInput = (data: IUserDto) => {
  const tableInput = {
    id: data.id,
    username: data.username,
    role: data.role,
    createAt: new Date(data.createAt).toLocaleString(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

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
/* const filter: Ref<IFundFilter> = ref({}); */

/* hooks */
onMounted(async () => {
  await fetchData();
});

/* emit test */
const idUser = ref('');
const idUserFunctional = (id: string) => {
  idUser.value = id;
};
</script>
