<template>
  <div class="flex flex-col gap-6">
    <ListModal
      name="Usuarios"
      :add-enabled="true"
      :data="data.map(formatFundDataIntoTableInput)"
      :is-loading="loading"
      :header="header"
      :keys="keys"
      :show-add="showAddFunction"
      :next-page="nextPage"
      :enabled-next="enabledNext"
      :enabled-back="enabledBack"
      :back-page="backPage"
      :page-current="pageCurrent"
      button-label="AGREGAR USUARIO"
      :show-filter="showFilterFunction"
      @return-item="getUserFromId"
    />
    <section id="details" class="flex flex-wrap gap-6">
      <DetailsUser
        v-if="userSelected !== null"
        :user="userSelected"
        @onDeleted="fetchData(), (userSelected = null)"
        @onEdit="fetchData()"
      />
    </section>
  </div>
  <AddUser v-if="showAdd" @close="showAdd = false" @user-added="handleUserAdded" />
</template>

<script lang="ts" setup>
import ListModal from '../default/ListModal.vue';
import { IUserDto } from '@/interfaces/dto';
import { onMounted, ref } from 'vue';
import { userService } from '@/services/userService';
import AddUser from './AddUser.vue';
import DetailsUser from './DetailsUser.vue';

const showAdd = ref(false);
const showFilter = ref(false);
const data = ref<IUserDto[]>([]);
const header = ref<string[]>(['Usuario', 'Correo', 'Rol', 'Fecha']);
const keys = ref<string[]>(['username', 'email', 'role', 'createAt']);
const loading = ref(false);
const pageCurrent = ref(1);
const totalPageCurrent = ref(0);
const enabledNext = ref(false);
const enabledBack = ref(false);
const userSelected = ref<IUserDto | null>(null);

const showAddFunction = () => {
  showAdd.value = true;
};
const handleUserAdded = async () => {
  showAdd.value = false;
  await fetchData();
};
const showFilterFunction = () => {
  showFilter.value = true;
};
const fetchData = async () => {
  loading.value = true;
  data.value = [];
  const res = await userService.list(undefined, pageCurrent.value - 1, 10, true);
  if (res === undefined) return;
  totalPageCurrent.value = Math.ceil(res.totalLenght / 10);
  data.value = res.data;
  enabledNext.value = pageCurrent.value < totalPageCurrent.value;
  enabledBack.value = pageCurrent.value > 1;
  loading.value = false;
  userSelected.value !== null && getUserFromId(userSelected.value as { id: string });
};
const formatFundDataIntoTableInput = (data: IUserDto) => {
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    role: data.role,
    createAt: new Date(data.createAt).toLocaleString(),
  };
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
const getUserFromId = (user: { id: string }) =>
  (userSelected.value = data.value.find((u: IUserDto) => u.id == user.id) || null);

onMounted(async () => {
  await fetchData();
});
</script>
