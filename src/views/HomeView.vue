<template>
  <div>
    <InputSelect title="Select Input" :model-value="test" :options="testArray" :default-value="testArray[1]" />
    <InputMultiSelect title="MultiSelect Input" :model-value="[testArray[1]]" :options="testArray" />
    <!-- <PostCustom></PostCustom> -->
  </div>
</template>

<script lang="ts" setup>
import InputSelect from '@/components/InputSelect.vue';
import InputMultiSelect from '@/components/InputMultiSelect.vue';
const test = 'testDefault';
const testArray = [
  { value: 'testtest', text: 'test' },
  { value: 'testtest1', text: 'test1' },
  { value: 'testtest2', text: 'test2' },
];
</script>
