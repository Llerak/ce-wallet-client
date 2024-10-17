<template>
  <h4>Detalles</h4>
  <div class="flex w-xl flex-col gap-4 p-4 bg-custom-gradient-dark rounded-lg shadow-custom-shadow">
    <div class="flex flex-wrap gap-3">
      <PostCustom :content="data.user" title="Usuario" />
      <PostCustom :content="data.fund" title="Fondo" />
      <PostCustom :content="data.activity" title="Accion" />
      <PostCustom v-if="data.transactionType" :content="data.transactionType" title="Transaccion" />
      <PostCustom v-if="data.currency" :content="data.currency" title="Moneda" />
      <PostCustom v-if="data.amount" :content="data.amount" title="Monto" />
      <PostCustom :content="data.createdAt" title="Fecha" />
      <PostCustom :content="data.details || 'No disponible'" title="Detalles" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PostCustom from '@/components/PostCustom.vue';
import { defineProps, Ref, ref, watch } from 'vue';
import { IFundLogDto } from '@/interfaces/dto';

const props = defineProps<{ log: IFundLogDto }>();
const data: Ref<IFundLogDto> = ref(props.log);

// Watch for changes in the id prop
watch(
  () => props.log,
  () => {
    data.value = props.log;
  }
);
</script>
