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
            @click="showEdit = true"
          >
            <EditIcon class="w-6 h-6" />
          </i>
          <i
            class="p-2 flex items-center justify-center rounded-lg hover:bg-red-600 text-white h-min transition-all cursor-pointer hover:text-black"
            @click="showDelete = true"
          >
            <DeleteIcon class="w-6 h-6" />
          </i>
        </div>
      </div>
    </div>
  </div>
  <DeleteUser
    v-if="showDelete"
    :user-id="props.user.id"
    @close="showDelete = false"
    @onDeleted="emit('onDeleted'), (showDelete = false)"
  />
  <EditUser
    v-if="showEdit"
    :data="updateModel"
    @close="showEdit = false"
    @user-edit="emit('onEdit'), (showEdit = false)"
  />
</template>

<script lang="ts" setup>
import PostCustom from '@/components/PostCustom.vue';
import { defineEmits, defineProps, onMounted, ref, Ref } from 'vue';
import { IEditUserDto, IUserDto } from '@/interfaces/dto';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import EditIcon from '@/components/icons/EditIcon.vue';
import { longDate } from '@/store/global';
import DeleteUser from '@/views/usersView/DeleteUser.vue';
import EditUser from './EditUser.vue';

const props = defineProps<{ user: IUserDto }>();
const updateModel: Ref<IEditUserDto> = ref({
  id: props.user.id,
  username: props.user.username,
  email: props.user.email,
});
const emit = defineEmits(['onDeleted', 'onEdit']);

const showDelete = ref(false);
const showEdit = ref(false);

onMounted(() => {
  window.location.href = `${window.location.pathname}#details`;
});
</script>
