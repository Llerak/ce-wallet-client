<template>
  <div class="flex flex-col gap-2">
    <div class="relative overflow-x-auto shadow-custom-shadow bg-white rounded-lg">
      <table class="w-full text-sm text-left min-h-[540px]">
        <thead class="text-[14px] text-[#344767] text-nowrap">
          <tr class="h-[50px]">
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
          <tr v-if="data.length < 1" class="h-[50px]">
            <td :colspan="headers.length" class="align-center">
              <div class="flex justify-center p-4">
                <SpinnerLoanding v-if="loading" />
                <p v-else>{{ props.noDataMessage || 'No data available' }}</p>
              </div>
            </td>
          </tr>
          <tr
            v-else
            class="border-b cursor-pointer relative h-[50px]"
            v-for="(item, i) in data"
            :key="i"
            @click="watchClickInObject(item)"
          >
            <td
              v-for="(key, j) in keys"
              :key="j"
              class="px-6 py-4 max-h-[50px]"
              :class="{ hiddenCol: props.hiddenMobile.includes(j) }"
            >
              <span v-if="typeof key === 'object'">
                {{ reduceObject(item, key) }}
              </span>
              <span v-else>{{ item[key] }}</span>
            </td>
            <slot name="td" :item="item" />
          </tr>
          <tr
            v-show="!props.loading && data.length > 0"
            v-for="i in 10 - data.length"
            :key="'empty-' + i"
            class="border-b h-[50px]"
          >
            <td :colspan="headers.length" class="px-6 py-4" />
          </tr>
        </tbody>
      </table>
    </div>
    <div class="w-full justify-end flex">
      <div class="shadow-custom-shadow bg-white w-min flex flex-row items-center rounded-lg">
        <button
          @click="backPage"
          class="text-[#344767]"
          :class="{ 'opacity-60 cursor-default pointer-events-none': !enabledBack }"
        >
          <ArrowDownIcon class="rotate-90 w-4 h-4" />
        </button>
        <span>{{ pageCurrent }}</span>
        <button
          @click="nextPage"
          class="text-[#344767]"
          :class="{ 'opacity-60 cursor-default pointer-events-none': !enabledNext }"
        >
          <ArrowDownIcon class="-rotate-90 w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import ArrowDownIcon from './icons/ArrowDownIcon.vue';
import SpinnerLoanding from '@/components/SpinnerLoanding.vue'; // Asegúrate de importar el componente SpinnerLoanding

const emit = defineEmits(['returnId', 'returnItem']);
const watchClickInObject = (item: any) => {
  emit('returnId', item.id);
  emit('returnItem', item);
};

const props = defineProps<{
  headers: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  pageCurrent?: number;
  enabledNext: boolean;
  enabledBack: boolean;
  nextPage: ((payload: MouseEvent) => void) | undefined;
  backPage: ((payload: MouseEvent) => void) | undefined;
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

<style scoped>
@media (max-width: 760px) {
  .hiddenCol {
    display: none;
  }
}
</style>
