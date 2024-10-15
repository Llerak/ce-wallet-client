<template>
  <div class="flex max-w-xl flex-col gap-4">
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
    </div>
    <div class="flex flex-wrap gap-3">
      <PostCustom title="Detalles" :content="data.details || 'No disponible'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PostCustom from '@/components/PostCustom.vue';
import { defineProps, ref, Ref, onMounted, watch } from 'vue';
import { fundService } from '@/services';
import { IFundDto } from '@/interfaces/dto';
import { statusApi } from '@/store/global';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

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
  statusApi.isLoading = true;
  const res = await fundService.getFund(props.id);
  if (res) {
    data.value = res;
  }
  statusApi.isLoading = false;
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
