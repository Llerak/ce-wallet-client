<template>
  <div class="flex flex-col gap-3 w-full max-w-[680px]">
    <h4 class="flex">Detalles</h4>
    <div class="flex p-4 bg-custom-gradient-dark rounded-lg shadow-custom-shadow min-h-[400px]">
      <div v-if="!isLoading" class="flex flex-col gap-4 w-full">
        <div class="flex flex-wrap gap-3">
          <PostCustom title="Nombre" :content="data.name || 'No disponible'" />
          <PostCustom title="Usuario" :content="data.user?.username || 'No disponible'" />
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
          <PostCustom title="Dirección" :content="data.address || 'No disponible'" />
          <PostCustom
            title="Creado en"
            :content="new Date(data.createAt).toLocaleDateString('es-ES', locale) || 'No disponible'"
          />
        </div>
        <div class="flex flex-wrap gap-3">
          <PostCustom title="Detalles" :content="data.details || 'No disponible'" />
        </div>
        <div class="flex flex-wrap gap-3 w-full justify-end">
          <i
            class="p-2 flex items-center justify-center rounded-lg hover:bg-blue-600 text-white h-min transition-all cursor-pointer"
          >
            <LinkUserIcon class="w-5 h-5" />
          </i>
          <i
            class="p-2 flex items-center justify-center rounded-lg hover:bg-red-600 text-white h-min transition-all cursor-pointer"
            @click="showDelete = true"
          >
            <DeleteIcon class="w-5 h-5" />
          </i>
        </div>
      </div>
      <div v-else class="flex justify-center items-center w-full h-full">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-[#F58D71] border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
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
  <DeleteFund v-if="showDelete" :id="id" :close-delete="closeDelete" @fund-delete="deleteEmit" />
</template>

<script lang="ts" setup>
import PostCustom from '@/components/PostCustom.vue';
import { defineProps, ref, Ref, onMounted, watch, defineEmits } from 'vue';
import { fundService } from '@/services';
import { IFundDto } from '@/interfaces/dto';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import LinkUserIcon from '@/components/icons/LinkUserIcon.vue';
import DeleteFund from './DeleteFund.vue';

const locale: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};
const isLoading: Ref<boolean> = ref(false);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(['fundDelete']);

const data: Ref<IFundDto> = ref({
  id: '',
  name: '',
  createAt: '',
  locationUrl: null,
  address: null,
  details: null,
  currencies: [],
  user: null,
});

const fetchData = async () => {
  isLoading.value = true;
  const res = await fundService.getFund(props.id);
  if (res) {
    data.value = res;
  }
  window.location.href = `${window.location.pathname}#details`;

  isLoading.value = false;
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

onMounted(() => {
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
