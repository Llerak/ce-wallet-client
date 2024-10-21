<script setup lang="ts">
import TableCustom from '@/components/TableCustom.vue';
import { defineEmits, defineProps, ref, watch } from 'vue';
import { hasPermission, permissions } from '@/store/RolesAndPermission';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  addEnabled: {
    type: Boolean,
    default: false,
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
  showFilter: {
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
    default: Array as () => number[],
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

const showFilterInternal = ref(true);
const hiddeTable = ref(false);

const emit = defineEmits(['returnId', 'returnItem']);
const idValue = (id: string) => {
  emit('returnId', id);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const value = (item: any) => {
  emit('returnItem', item);
};

watch(
  () => props.data,
  (newData) => {
    if (newData.length == 1) {
      showFilterInternal.value = false;
      hiddeTable.value = true;
      let item = newData[0];
      emit('returnId', item.id);
      emit('returnItem', item);
    } else {
      (showFilterInternal.value = true), (hiddeTable.value = false);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-8 shadow-custom-shadow bg-white p-3 rounded-lg">
      <h4>{{ props.name }}</h4>
      <div
        class="flex w-full items-center flex-wrap gap-3"
        :class="{
          'justify-between': props.addEnabled && hasPermission(permissions.add),
          'justify-end': !props.addEnabled || !hasPermission(permissions.add),
        }"
      >
        <button
          v-if="props.addEnabled && hasPermission(permissions.add)"
          class="bg-primary text-white w-min text-nowrap"
          @click="showAdd"
        >
          {{ props.buttonLabel }}
        </button>
        <div class="flex gap-3 items-center flex-wrap">
          <!-- <InputCustom :placeholder="props.placeholder" type="text" />-->
          <button
            @click="showFilter"
            class="bg-white text-primary border-primary border-solid border-[1px] w-min text-nowrap"
            v-if="showFilterInternal"
          >
            {{ props.filterLabel }}
          </button>
          <div v-else />
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
      @return-id="idValue"
      @return-item="value"
      v-if="!hiddeTable"
    />
  </div>
</template>
