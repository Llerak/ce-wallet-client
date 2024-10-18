<template>
  <div class="flex flex-col gap-3 w-full">
    <h4 class="flex">Detalles</h4>
    <div class="flex p-4 bg-custom-gradient-dark rounded-lg shadow-custom-shadow">
      <div v-if="!isLoading" class="flex flex-col gap-4 w-full">
        <div class="flex flex-wrap gap-3">
          <PostCustom title="Nombre" :content="data.name || 'No disponible'" />
          <PostCustom title="Usuario" :content="data.user?.username || 'No disponible'" />
          <PostCustom :content="longDate(data.createAt)" title="Creado en" />
          <PostCustom title="Dirección" :content="data.address || 'No disponible'" />
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
            v-if="data.currencies && data.currencies?.length > 0"
          >
            <TransferIcon class="w-6 h-6" />
          </i>
          <i
            class="p-2 flex items-center justify-center rounded-lg hover:bg-green-600 text-white h-min transition-all cursor-pointer hover:text-black"
            @click="showDeposit = true"
          >
            <DepositIcon class="w-6 h-6" />
          </i>
          <i
            class="p-2 flex items-center justify-center rounded-lg hover:bg-primary text-white h-min transition-all cursor-pointer hover:text-black"
            v-if="data.currencies && data.currencies?.length > 0"
            @click="showWithdrawal = true"
          >
            <WithdrawalIcon class="w-6 h-6" />
          </i>
          <i
            class="p-2 flex items-center justify-center rounded-lg hover:bg-yellow-400 text-white h-min transition-all cursor-pointer hover:text-black"
            @click="showEdit = true"
          >
            <EditIcon class="w-6 h-6" />
          </i>
          <i
            class="p-2 flex items-center justify-center rounded-lg hover:bg-red-600 text-white h-min transition-all cursor-pointer hover:text-black"
            @click="showDelete = true"
          >
            <DeleteIcon class="w-6 h-6" />
          </i>
        </div>
      </div>
      <div v-else class="flex justify-center items-center w-full h-full min-h-[320px]">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
          >
        </div>
      </div>
    </div>
  </div>
  <EditFund v-if="showEdit" :fund="data" @close="showEdit = false" @onUpdate="onUpdate()" />
  <DeleteFund v-if="showDelete" :id="id" :close-delete="closeDelete" @fund-delete="deleteEmit" />
  <DepositFund v-if="showDeposit" :id="id" :close-deposit="closeDeposit" @fund-deposit="depositEmit" />
  <TransferFund
    v-if="showTransfer"
    :id="id"
    :currencies="data.currencies"
    :close-transfer="closeTransfer"
    @fund-transfer="transferEmit"
  />
  <WithdrawlFund
    v-if="showWithdrawal"
    :id="id"
    :currencies="data.currencies"
    :close-withdrawal="closeWithdrawal"
    @fund-withdrawal="withdrawalEmit"
  />
</template>

<script lang="ts" setup>
import PostCustom from '@/components/PostCustom.vue';
import { defineEmits, defineProps, onBeforeMount, ref, Ref, watch } from 'vue';
import { fundService } from '@/services';
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
import { longDate } from '@/store/global';

const isLoading: Ref<boolean> = ref(false);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(['fundDelete', 'refresh']);

const data: Ref<IFundDto> = ref({} as IFundDto);

const fetchData = async () => {
  isLoading.value = true;
  data.value = await fundService.getFund(props.id).catch((error) => {
    console.log(error);
    throw error;
  });
  window.location.href = `${window.location.pathname}#details`;
  isLoading.value = false;
};

/* edit */
const showEdit = ref(false);
const onUpdate = () => {
  emits('refresh');
  fetchData();
  showEdit.value = false;
};

/* delete */
const showDelete: Ref<boolean> = ref(false);
const closeDelete = () => {
  showDelete.value = false;
};
const deleteEmit = () => {
  showDelete.value = false;
  emits('fundDelete');
};

/* deposit */
const showDeposit: Ref<boolean> = ref(false);
const closeDeposit = () => {
  showDeposit.value = false;
};
const depositEmit = async () => {
  showDeposit.value = false;
  await fetchData();
  emits('refresh');
};

/* transfer */
const showTransfer: Ref<boolean> = ref(false);
const closeTransfer = () => {
  showTransfer.value = false;
};
const transferEmit = async () => {
  showTransfer.value = false;
  await fetchData();
  emits('refresh');
};

/* withdrawal */
const showWithdrawal: Ref<boolean> = ref(false);
const closeWithdrawal = () => {
  showWithdrawal.value = false;
};
const withdrawalEmit = async () => {
  showWithdrawal.value = false;
  await fetchData();
  emits('refresh');
};

onBeforeMount(() => {
  fetchData();
});

// Watch for changes in the id prop
watch(
  () => props.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      fetchData();
    }
  }
);
</script>
