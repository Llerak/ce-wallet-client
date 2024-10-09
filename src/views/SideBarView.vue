<template>
  <div
    class="w-[250px] h-[100vh] pt-4 pb-4 pl-4 flex-col flex bg-transparent justify-between"
  >
    <div class="flex flex-col">
      <div class="pl-8 pr-8 pt-6 pb-6">
        <img src="../../public/logo.png" alt="logo" />
      </div>
      <hr
        class="border-none h-[1px] flex w-full mb-4 bg-custom-gradient-linear"
      />
      <div class="flex flex-col">
        <template v-for="(item, index) in links" :key="index">
          <LinkCustom
            :icon="item.icon"
            :text="item.text"
            :is-active="router.currentRoute.value.name === item.link"
            :link="item.link"
          />
          <template v-if="index === links.length - 2">
            <label class="pl-4 mb-1 mt-4 opacity-[0.6]">PERFIL</label>
          </template>
        </template>
      </div>
    </div>
    <button
      type="submit"
      class="w-full bg-[#F58D71] text-white"
      @click="router.push('/')"
    >
      CERRAR SESIÓN
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LinkCustom from '@/components/LinkCustom.vue';
import ProfileIcon from '@/components/icons/ProfileIcon.vue';
import DashBoardIcon from '@/components/icons/DashBoardIcon.vue';
import BankIcon from '@/components/icons/BankIcon.vue';
import RegisterIcon from '@/components/icons/RegisterIcon.vue';
import SettingIcon from '@/components/icons/SettingIcon.vue';
import UsersIcon from '@/components/icons/UsersIcon.vue';
import router from '@/router';

const links = ref([
  { icon: DashBoardIcon, text: 'Dashboard', link: 'dashboard' },
  { icon: BankIcon, text: 'Fondos', link: 'funds' },
  { icon: RegisterIcon, text: 'Registro', link: 'register' },
  { icon: UsersIcon, text: 'Usuarios', link: 'users' },
  { icon: SettingIcon, text: 'Configuraciones', link: 'settings' },
  { icon: ProfileIcon, text: 'Opciones de usuario', link: 'profile' },
]);
</script>
