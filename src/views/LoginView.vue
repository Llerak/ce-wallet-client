<template>
  <div class="flex h-[100vh] w-[100vw] items-center justify-center p-4 bg-[#f8f9fa]">
    <form
      @submit.prevent="handleLogin"
      class="flex w-[360px] flex-col gap-6 bg-white p-12 shadow-custom-shadow"
      autocomplete="off"
    >
      <div class="flex flex-col gap-2">
        <h4 class="text-[#F58D71]">Bienvenido</h4>
        <p>Ingrese su usuario y contraseña para iniciar sesión</p>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <InputCustom
            title="Usuario"
            v-model="username"
            type="text"
            placeholder="Usuario"
            :show-error="showErrorUserName"
          />
          <InputCustom
            title="Contraseña"
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
          <button type="submit" class="w-full bg-[#F58D71] text-white">INICIAR</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import InputCustom from '@/components/InputCustom.vue';
import { authService } from '@/services';
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
      await authService.login(user);
      router.push('/funds');
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
