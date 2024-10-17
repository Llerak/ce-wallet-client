<script lang="ts">
import { defineProps, ref } from 'vue';

const props = defineProps<{ value: boolean }>();
const value = ref<boolean>(props.value);


</script>

<template>
  <div :class="{ active: value }" class="checkbox-container">
    <div></div>
  </div>
</template>

<style scoped>
.checkbox-container {
  margin: 0.2rem;
  height: 13px;
  width: 26px;
  border-radius: 10px;
  outline: 1px solid #e9e9e9;
  box-shadow: inset 1px 2px 5px 0 rgb(0, 0, 0, 0.2);
  transition-duration: 0.3s;
  position: relative;
}

.checkbox-container > div {
  position: absolute;
  height: 70%;
  width: 40%;
  border-radius: 100%;
  margin: 1px 2px;
  background-color: gray;
  border: 1px solid gray;
  transition-duration: 0.3s;
}

.checkbox-container.active {
  outline: 1px solid #02ad02;
  background-color: limegreen;
  box-shadow: inset 1px 2px 2px 2px rgb(0, 0, 0, 0.15);
}

.checkbox-container.active > div {
  background-color: whitesmoke;
  border-color: whitesmoke;
  transform: translateX(10px);
}
</style>
