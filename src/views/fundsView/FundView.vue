<template>
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
</template>

<script lang="ts" setup>
import ListModal from '../default/ListModal.vue';
const header = ['Nombre', 'Balance Total', 'EUR', 'USD', 'MLC', 'MXN'];
const keys = ['currency', 'totalBalance', 'EUR', 'USD', 'MLC', 'MXN'];

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
