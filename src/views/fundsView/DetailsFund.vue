<template>
  <div class="flex flex-col gap-3 w-full">
    <h4 class="flex">Detalles</h4>
    <div class="flex p-4 bg-custom-gradient-dark rounded-lg shadow-custom-shadow">
      <div class="flex flex-col gap-4 w-full">
        <div class="flex flex-wrap gap-3">
          <PostCustom :content="data.name" title="Nombre" />
          <PostCustom title="Usuario" :content="data.user?.username || 'No disponible'" />
          <PostCustom :content="UseLocaleTimeZone.longDate(data.createAt)" title="Creado en" />
          <PostCustom :content="data.address || 'No disponible'" title="Dirección" />
        </div>
        <div class="flex flex-wrap gap-3">
          <PostCustom
            v-for="(currency, index) in data.currencies"
            :key="index"
            :title="currency.currency"
            :content="currency.amount"
          />
        </div>
        <div class="flex flex-wrap gap-3">
          <PostCustom title="Detalles" :content="data.details || 'No disponible'" />
        </div>
        <div class="flex flex-wrap gap-3 w-full justify-end">
          <i
            class="p-2 flex items-center justify-center rounded-lg hover:bg-blue-600 text-white h-min transition-all cursor-pointer hover:text-black"
            @click="showTransfer = true"
            v-if="data.currencies && data.currencies?.length > 0 && hasPermission(permissions.actionTransf)"
          >
            <TransferIcon class="w-6 h-6" />
          </i>
          <i
            class="p-2 flex items-center justify-center rounded-lg hover:bg-green-600 text-white h-min transition-all cursor-pointer hover:text-black"
            @click="showDeposit = true"
            v-if="hasPermission(permissions.actionDeposit)"
          >
            <DepositIcon class="w-6 h-6" />
          </i>
          <i
            class="p-2 flex items-center justify-center rounded-lg hover:bg-primary text-white h-min transition-all cursor-pointer hover:text-black"
            v-if="data.currencies && data.currencies?.length > 0 && hasPermission(permissions.actionWithdrawl)"
            @click="showWithdrawal = true"
          >
            <WithdrawalIcon class="w-6 h-6" />
          </i>
          <i
            class="p-2 flex items-center justify-center rounded-lg hover:bg-yellow-400 text-white h-min transition-all cursor-pointer hover:text-black"
            @click="showEdit = true"
            v-if="hasPermission(permissions.actionEdit)"
          >
            <EditIcon class="w-6 h-6" />
          </i>
          <i
            class="p-2 flex items-center justify-center rounded-lg hover:bg-red-600 text-white h-min transition-all cursor-pointer hover:text-black"
            @click="showDelete = true"
            v-if="hasPermission(permissions.actionDelete)"
          >
            <DeleteIcon class="w-6 h-6" />
          </i>
        </div>
      </div>
    </div>
  </div>
  <EditFund v-if="showEdit" :fund="data" @close="showEdit = false" @onUpdate="onUpdate()" />
  <DeleteFund v-if="showDelete" :id="data.id" :close-delete="closeDelete" @fund-delete="deleteEmit" />
  <DepositFund v-if="showDeposit" :id="data.id" :close-deposit="closeDeposit" @fund-deposit="depositEmit" />
  <TransferFund
    v-if="showTransfer"
    :id="data.id"
    :currencies="data.currencies"
    :close-transfer="closeTransfer"
    @fund-transfer="transferEmit"
  />
  <WithdrawlFund
    v-if="showWithdrawal"
    :id="data.id"
    :currencies="data.currencies"
    :close-withdrawal="closeWithdrawal"
    @fund-withdrawal="withdrawalEmit"
  />
</template>

<script lang="ts" setup>
import PostCustom from '@/components/PostCustom.vue';
import { defineEmits, defineProps, onMounted, ref, watch } from 'vue';
import { IFundDto } from '@/interfaces/dto';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import DepositIcon from '@/components/icons/DepositIcon.vue';
import DeleteFund from './DeleteFund.vue';
import DepositFund from './DepositFund.vue';
import TransferIcon from '@/components/icons/TransferIcon.vue';
import TransferFund from './TransferFund.vue';
import WithdrawalIcon from '@/components/icons/WithdrawalIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import WithdrawlFund from './WithdrawlFund.vue';
import EditFund from '@/views/fundsView/EditFund.vue';
import { hasPermission, permissions } from '@/store/RolesAndPermission';
import { UseLocaleTimeZone } from '@/helpers';

const props = defineProps<{ fund: IFundDto }>();
const emits = defineEmits(['fundDelete', 'refresh']);

const data = ref<IFundDto>(props.fund);
const showEdit = ref(false);
const showDelete = ref(false);
const showDeposit = ref(false);
const showTransfer = ref(false);
const showWithdrawal = ref(false);

const onUpdate = () => {
  showEdit.value = false;
  emits('refresh');
};
const closeDelete = () => {
  showDelete.value = false;
};
const deleteEmit = () => {
  showDelete.value = false;
  emits('fundDelete');
};
const closeDeposit = () => {
  showDeposit.value = false;
};
const depositEmit = async () => {
  showDeposit.value = false;
  emits('refresh');
};
const closeTransfer = () => {
  showTransfer.value = false;
};
const transferEmit = async () => {
  showTransfer.value = false;
  emits('refresh');
};
const closeWithdrawal = () => {
  showWithdrawal.value = false;
};
const withdrawalEmit = async () => {
  showWithdrawal.value = false;
  emits('refresh');
};

onMounted(() => {
  window.location.href = `${window.location.pathname}#details`;
});
watch(
  () => props.fund,
  (newFund) => {
    data.value = newFund;
  }
);
</script>
