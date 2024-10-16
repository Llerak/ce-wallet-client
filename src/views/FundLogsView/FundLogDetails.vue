<template>
  <h4>Detalles</h4>
  <div class="flex max-w-xl flex-col gap-4 p-4 bg-custom-gradient-dark rounded-lg shadow-custom-shadow">
    <div class="flex flex-wrap gap-3">
      <PostCustom :content="data.name || 'No disponible'" title="Nombre" />
      <PostCustom :content="data.user?.username || 'No disponible'" title="Usuario" />
    </div>
    <div class="flex flex-wrap gap-3">
      <PostCustom
        v-for="(currency, index) in data.currencies"
        :key="index"
        :content="currency.amount"
        :title="currency.currency"
      />
    </div>
    <div class="flex flex-wrap gap-3">
      <PostCustom :content="data.address || 'No disponible'" title="Dirección" />
    </div>
    <div class="flex flex-wrap gap-3">
      <PostCustom :content="data.details || 'No disponible'" title="Detalles" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PostCustom from '@/components/PostCustom.vue';
import { defineProps, onMounted, Ref, ref, watch } from 'vue';
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
