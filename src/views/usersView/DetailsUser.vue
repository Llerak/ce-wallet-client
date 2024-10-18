<template>
  <div class="flex flex-col gap-3 w-full">
    <h4 class="flex">Detalles</h4>
    <div class="flex p-4 bg-custom-gradient-dark rounded-lg shadow-custom-shadow">
      <div class="flex flex-col gap-4 w-full">
        <div class="flex flex-wrap gap-3">
          <PostCustom :content="props.user.username" title="Nombre" />
          <PostCustom :content="props.user.role" title="Role" />
          <PostCustom :content="props.user.email" title="Correo" />
          <PostCustom :content="longDate(props.user.createAt)" title="Creado en" />
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import PostCustom from '@/components/PostCustom.vue';
import { defineProps, onMounted } from 'vue';
import { IUserDto } from '@/interfaces/dto';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import { longDate } from '@/store/global';

const props = defineProps<{ user: IUserDto }>();

/* delete */
/* const showDelete: Ref<boolean> = ref(false);
const closeDelete = () => {
  showDelete.value = false;
}; */

onMounted(() => {
  window.location.href = `${window.location.pathname}#details`;
});
</script>
