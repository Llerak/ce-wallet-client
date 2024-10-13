<script setup lang="ts">
import TableCustom from '@/components/TableCustom.vue';
import InputCustom from '@/components/InputCustom.vue';
import { defineProps } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  addEnabled: {
    type: Boolean,
    default: true,
  },
  enabledNext: {
    type: Boolean,
  },
  enabledBack: {
    type: Boolean,
  },
  showAdd: {
    type: Function as unknown as () => ((payload: MouseEvent) => void) | undefined,
  },
  nextPage: {
    type: Function as unknown as () => ((payload: MouseEvent) => void) | undefined,
  },
  backPage: {
    type: Function as unknown as () => ((payload: MouseEvent) => void) | undefined,
  },
  header: {
    type: Array as () => string[],
    required: true,
  },
  keys: {
    type: Array as () => string[],
    required: true,
  },
  hiddenMobile: {
    type: Array as () => number[],
    required: true,
  },
  pageCurrent: {
    type: Number,
  },
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: Array as () => any[],
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Buscar...',
  },
  buttonLabel: {
    type: String,
    default: 'AGREGAR',
  },
  filterLabel: {
    type: String,
    default: 'FILTROS',
  },
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-8 shadow-custom-shadow bg-white p-3 rounded-lg">
      <h4>Fondos</h4>
      <div class="flex w-full justify-between items-center flex-wrap gap-3">
        <button @click="showAdd" v-if="props.addEnabled" class="bg-[#F58D71] text-white w-min text-nowrap">
          {{ props.buttonLabel }}
        </button>
        <div class="flex gap-3 items-center flex-wrap">
          <InputCustom :placeholder="props.placeholder" type="text" />
          <button class="bg-white text-[#F58D71] border-[#F58D71] border-solid border-[1px] w-min text-nowrap">
            {{ props.filterLabel }}
          </button>
        </div>
      </div>
    </div>
    <TableCustom
      :headers="props.header"
      :data="props.data"
      :keys="props.keys"
      :loading="props.isLoading"
      :hidden-mobile="props.hiddenMobile"
      :next-page="nextPage"
      :back-page="backPage"
      :page-current="pageCurrent"
      :enabled-next="enabledNext"
      :enabled-back="enabledBack"
    />
  </div>
</template>
