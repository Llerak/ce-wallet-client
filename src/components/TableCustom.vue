<script setup lang="ts">
import { defineProps } from 'vue';
import SpinnerLoanding from '@/components/SpinnerLoanding.vue'; // Asegúrate de importar el componente SpinnerLoanding

const props = defineProps<{
  headers: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  keys: string[];
  noDataMessage?: string;
  loading: boolean;
  hiddenMobile: number[]; // Nueva propiedad para columnas ocultas en móvil
}>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reduceObject = (obj: any, path: string[]) => {
  return path.reduce((prev, key) => {
    return prev?.[key];
  }, obj);
};
</script>

<template>
  <div
    class="relative overflow-x-auto shadow-custom-shadow bg-white sm:rounded-lg"
  >
    <table class="w-full text-sm text-left">
      <thead class="text-[14px] text-[#344767] text-nowrap">
        <tr>
          <th
            v-for="(header, i) in headers"
            :key="i"
            scope="col"
            class="px-6 py-3"
            :class="{ hiddenCol: props.hiddenMobile.includes(i) }"
          >
            {{ header }}
          </th>
          <slot name="th" />
        </tr>
      </thead>
      <tbody>
        <tr v-if="data.length < 1">
          <td :colspan="headers.length" class="align-center">
            <div class="flex justify-center p-4">
              <SpinnerLoanding v-if="loading" />
              <p v-else>{{ props.noDataMessage || 'No data available' }}</p>
            </div>
          </td>
        </tr>
        <tr v-else class="border-b" v-for="(item, i) in data" :key="i">
          <td
            v-for="(key, j) in keys"
            :key="j"
            class="px-6 py-4"
            :class="{ hiddenCol: props.hiddenMobile.includes(j) }"
          >
            <span v-if="typeof key === 'object'">
              {{ reduceObject(item, key) }}
            </span>
            <span v-else>{{ item[key] }}</span>
          </td>
          <slot name="td" :item="item" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@media (max-width: 760px) {
  .hiddenCol {
    display: none;
  }
}
</style>
