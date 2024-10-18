<template>
  <div class="flex flex-col gap-3 w-full">
    <h4 class="flex">Detalles</h4>
    <div class="flex p-4 bg-custom-gradient-dark rounded-lg shadow-custom-shadow">
      <div v-if="!isLoading" class="flex flex-col gap-4 w-full">
        <div class="flex flex-wrap gap-3">
          <PostCustom title="Nombre" :content="data.username || 'No disponible'" />
          <PostCustom title="Usuario" :content="data.role || 'No disponible'" />
          <PostCustom :content="longDate(data.createAt)" title="Creado en" />
        </div>
        <div class="flex flex-wrap gap-3 w-full justify-end">
          <i
            class="p-2 flex items-center justify-center rounded-lg hover:bg-yellow-400 text-white h-min transition-all cursor-pointer hover:text-black"
          >
            <EditIcon class="w-6 h-6" />
          </i>
          <i
            class="p-2 flex items-center justify-center rounded-lg hover:bg-red-600 text-white h-min transition-all cursor-pointer hover:text-black"
          >
            <DeleteIcon class="w-6 h-6" />
          </i>
        </div>
      </div>
      <div v-else class="flex justify-center items-center w-full h-full min-h-[320px]">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PostCustom from '@/components/PostCustom.vue';
import { defineProps, onMounted, ref, Ref, watch } from 'vue';
import { IUserDto } from '@/interfaces/dto';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import { userService } from '@/services/userService';
import { longDate } from '@/store/global';

const isLoading: Ref<boolean> = ref(false);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const data: Ref<IUserDto> = ref({
  id: '',
  username: '',
  role: '',
  createAt: '',
});

const fetchData = async () => {
  isLoading.value = true;
  const res = await userService.find(props.id);
  console.log(res);
  if (res) {
    data.value = res;
  }
  window.location.href = `${window.location.pathname}#details`;

  isLoading.value = false;
};

/* delete */
/* const showDelete: Ref<boolean> = ref(false);
const closeDelete = () => {
  showDelete.value = false;
}; */

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
