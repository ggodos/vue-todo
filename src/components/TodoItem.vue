<script setup lang="ts">
import { watch, ref } from 'vue';


const props = defineProps(['checked'])

const emit = defineEmits(['checkbox-pressed'])

const isChecked = ref(props.checked)

watch(() => props.checked, (newValue) => {
  isChecked.value = newValue
})


function onCheckboxClick() {
  emit('checkbox-pressed')
}
</script>


<template>
  <div class="item">
    <input id="checkbox" @click="onCheckboxClick" class="done" type="checkbox" v-model="isChecked" />
    <slot name="text"></slot>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  padding: 1rem;
  background-color: #ddd;
}

.done {
  margin-right: 1rem;
}

/* 
.done {
  position: relative;
  padding-left: 25px;
  margin-bottom: 10px;
  margin-right: 1rem;
  cursor: pointer;
  font-size: 18px;
}

.done:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  background-color: #fff;
}

.done input[type="checkbox"]:checked+.done:before {
  background-color: #007bff;
  border-color: #007bff;
}
 */
.done:hover:before {
  border-color: #999;
}
</style>

