<template>
  <div class="flex flex-col gap-6">
    <ListModal
      name="Fondos"
      :add-enabled="true"
      :hidden-mobile="[2, 3, 4, 5]"
      :is-loading="false"
      :header="header"
      :keys="keys"
      :data="data"
      button-label="AGREGAR FONDO"
    />
    <div class="flex gap-6 flex-wrap">
      <div v-for="(value, index) in detailsValue" :key="index" class="flex min-[480px]:w-min w-full flex-1">
        <PostCustom :title="detailsKey[index]" :content="value"></PostCustom>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ListModal from '../default/ListModal.vue';
import PostCustom from '@/components/PostCustom.vue';

const header = ['Nombre', 'Balance Total', 'EUR', 'USD', 'MLC', 'MXN'];
const keys = ['currency', 'totalBalance', 'EUR', 'USD', 'MLC', 'MXN'];
const detailsKey = ['Nombre', 'Usuario', 'Creado en', 'EUR', 'USD', 'MLC', 'CUP', 'Dirección', 'Detalles'];
const detailsValue = [
  'Test',
  'Alberto',
  '24-06-2024',
  '10000',
  '10000',
  '10000',
  '10000',
  'carretera Fontanar wajay km 2 y 1/2 sin # de ksa',
  'Son muchos detalles',
];

const data = [
  {
    currency: 'Test',
    totalBalance: 106000,
    EUR: 340,
    USD: 323,
    MLC: 265,
    MXN: 18,
  },
  {
    currency: 'Test',
    totalBalance: 106000,
    EUR: 340,
    USD: 323,
    MLC: 265,
    MXN: 18,
  },
  {
    currency: 'Test',
    totalBalance: 106000,
    EUR: 340,
    USD: 323,
    MLC: 265,
    MXN: 18,
  },
  {
    currency: 'Test',
    totalBalance: 106000,
    EUR: 340,
    USD: 323,
    MLC: 265,
    MXN: 18,
  },
  {
    currency: 'Test',
    totalBalance: 106000,
    EUR: 340,
    USD: 323,
    MLC: 265,
    MXN: 18,
  },
  {
    currency: 'Test',
    totalBalance: 106000,
    EUR: 340,
    USD: 323,
    MLC: 265,
    MXN: 18,
  },
  {
    currency: 'Test',
    totalBalance: 106000,
    EUR: 340,
    USD: 323,
    MLC: 265,
    MXN: 18,
  },
  {
    currency: 'Test',
    totalBalance: 106000,
    EUR: 340,
    USD: 323,
    MLC: 265,
    MXN: 18,
  },
  {
    currency: 'Test',
    totalBalance: 106000,
    EUR: 340,
    USD: 323,
    MLC: 265,
    MXN: 18,
  },
  {
    currency: 'Test',
    totalBalance: 106000,
    EUR: 340,
    USD: 323,
    MLC: 265,
    MXN: 18,
  },
];
</script>
