<template>
  <div class="flex items-center justify-between">
    <label v-if="title !== ''">{{ props.title }}</label>
    <div
      @click="
        () => {
          value = !value;
          emit('returnValue', value);
        }
      "
      :class="{ active: value }"
      class="checkbox-container"
    >
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, defineEmits } from 'vue';

const props = defineProps<{ defaultValue: boolean; title?: string }>();
const value = ref<boolean>(props.defaultValue);
const emit = defineEmits(['returnValue']);
</script>

<style scoped>
.checkbox-container {
  @apply grid items-center;
  margin: 0.2rem;
  height: 20px;
  width: 40px;
  border-radius: 10px;
  outline: 1px solid #e9e9e9;
  box-shadow: inset 1px 2px 5px 0 rgb(0, 0, 0, 0.2);
  transition-duration: 0.3s;
  position: relative;
}

.checkbox-container > div {
  position: absolute;
  height: 80%;
  width: 40%;
  border-radius: 100%;
  margin: 1px 2px;
  background-color: gray;
  border: 1px solid gray;
  transition-duration: 0.3s;
}

.checkbox-container.active {
  @apply bg-primary;
  box-shadow: inset 1px 2px 5px 2px rgb(0, 0, 0, 0.15);
}

.checkbox-container.active > div {
  background-color: whitesmoke;
  border-color: whitesmoke;
  transform: translateX(20px);
}
</style>
