<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';


const serverUrl = 'http://localhost:3000'

const currentDate = ref(new Date().toLocaleDateString())

type TodoItemType = {
  id: number;
  text: string;
  done: boolean;
}

const items = ref<Array<TodoItemType>>([])

async function onDoneChange(id: number) {
  const item = items.value.find((item) => item.id === id)
  if (item) {
    item.done = !item.done
    await axios.put(`${serverUrl}/items/${id}`, item)
  }
}

onMounted(async () => {
  currentDate.value = new Date().toLocaleDateString()
  const res = await axios.get(`${serverUrl}/items`)
  if (res.data) {
    items.value = res.data
  }
})

</script>

<template>
  <main>
    <TodoList @item-done-change="onDoneChange" :items="items" :date="currentDate" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 60%;
  margin: auto;
}
</style>
