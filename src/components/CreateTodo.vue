<script setup lang="ts">

import { ref } from 'vue';
import { createItem } from '../request';


const emit = defineEmits(['item-created'])

const currentDate = () => new Date().toISOString().slice(0, 10)

const text = ref('')
const date = ref(currentDate())


async function onPlusClick() {
  const dateValue = date.value
  const item = await createItem(text.value, false, dateValue)
  text.value = ''
  emit('item-created', item)
}

</script>

<template>
  <div class="create">
    <button class="plus" @click="onPlusClick">+</button>
    <input class="text-input" v-model="text" placeholder="Add a new todo" />
    <input class="date-input" type="date" v-model="date" />
  </div>
</template>

<style scoped>
.create {
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  /* align-items: center; */

  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #ddd;
}

.plus {
  width: 2rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  border: none;
  background-color: #333;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}

.text-input {
  width: 80%
}

.date-input {
  font: 1rem, sans-serif;
  margin-left: 0.5rem;
}
</style>
