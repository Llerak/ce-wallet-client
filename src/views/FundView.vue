<script setup lang="ts">
import TableCustom from '@/components/TableCustom.vue';
import InputCustom from '@/components/InputCustom.vue';

const header = ['Nombre', 'Balance Total', 'EUR', 'USD', 'MLC', 'MXN'];
const keys = ['currency', 'totalBalance', 'EUR', 'USD', 'MLC', 'MXN'];

const data = [
  {
    currency: 'Test',
    totalBalance: 10000,
    EUR: 10000,
    USD: 10000,
    MLC: 10000,
    MXN: 10000,
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

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-8">
      <h4>Fondos</h4>
      <div class="flex w-full justify-between items-center">
        <button class="bg-[#F58D71] text-white w-min text-nowrap">
          AGREGAR FONDO
        </button>
        <div class="flex gap-3 items-center">
          <InputCustom placeholder="Buscar..." />
          <button
            class="bg-white text-[#F58D71] border-[#F58D71] border-solid border-[1px] w-min text-nowrap"
          >
            FILTROS
          </button>
        </div>
      </div>
    </div>
    <TableCustom :headers="header" :data="data" :keys="keys" :loading="true" />
  </div>
</template>
