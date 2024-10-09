<template>
  <div
    class="flex h-[100vh] w-[100vw] items-center justify-center p-4 bg-[#f8f9fa]"
  >
    <form
      @submit.prevent="handleLogin"
      class="flex w-[360px] flex-col gap-6 bg-white p-12 shadow-custom-shadow"
      autocomplete="off"
    >
      <h2 class="text-xl text-[#F58D71]">Iniciar Sesión</h2>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <InputCustom
            v-model="username"
            type="text"
            placeholder="Usuario"
            :show-error="showErrorUserName"
          />
          <InputCustom
            v-model="password"
            type="password"
            placeholder="Contraseña"
            :show-error="showErrorPassword"
          />
        </div>
        <div class="flex flex-col gap-2">
          <span
            class="text-sm text-red-600 transition-all"
            :class="{
              'scale-100': showErrorGeneral,
              'scale-0': !showErrorGeneral,
            }"
            >Usuario o contraseña incorrecto</span
          >
          <button type="submit" class="w-full">Iniciar</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import InputCustom from '@/components/InputCustom.vue';
import usersServices from '@/services/usersServices';
import router from '@/router';

const username = ref('');
const showErrorUserName = ref(false);
const password = ref('');
const showErrorPassword = ref(false);

const showErrorGeneral = ref(false);

const handleLogin = async () => {
  showErrorGeneral.value = false;
  if (validationUserLogin()) {
    try {
      const user = {
        name: username.value,
        password: password.value,
      };
      await usersServices.login(user);
      console.log('Login successful');
      router.push('/home');
    } catch (error) {
      showErrorGeneral.value = true;
      console.error('Login failed:', error);
    }
  }
};

function validationUserLogin() {
  showErrorUserName.value = false;
  showErrorPassword.value = false;
  if (username.value === '') {
    showErrorUserName.value = true;
  }
  if (password.value === '') {
    showErrorPassword.value = true;
  }

  if (showErrorUserName.value || showErrorPassword.value) return false;
  return true;
}
</script>
