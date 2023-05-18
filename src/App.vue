<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TodoList from './components/TodoList.vue';
import CreateTodo from './components/CreateTodo.vue';
import { deleteItem, getItem, setItem } from './request';
import { TodoItem } from './types/Item';
import { TodoDay } from './types/TodoDay';

const currentDate = ref(new Date().toLocaleDateString())


type todosType = {
  [date: string]: Array<TodoItem>
}
const todos = ref<todosType>({})
const items = ref<Array<TodoItem>>([])

async function onDoneChange(id: string) {
  const item = items.value.find((item) => item.id === id)
  item.done = !item.done
  setItem(item)
}

async function onDelete(item: TodoItem) {
  deleteItem(item.id)
  const dateItems = todos.value[item.date]
  if (dateItems) {
    todos.value[item.date] = dateItems.filter((todo) => todo.id !== item.id)
  }
}

async function fetcthAll() {
  currentDate.value = new Date().toLocaleDateString()
  const res = await getItem()
  if (res.data) {
    const dateUnion: todosType = res.data.reduce((acc: todosType, item: TodoItem) => {
      if (!acc[item.date]) {
        acc[item.date] = [item]
      } else {
        acc[item.date].push(item)
      }
      return acc
    }, {})
    todos.value = dateUnion
    items.value = res.data
  }
}

function onItemCreated(item: TodoItem) {
  const date = item.date
  console.log(date, item)
  if (!todos.value[date]) {
    todos.value[date] = [item]
  } else {
    todos.value[date].push(item)
  }
  items.value.push(item)
}


onMounted(async () => {
  fetcthAll()
})

</script>

<template>
  <main>
    <CreateTodo @item-created="onItemCreated" />
    <!-- {{ currentDate }} -->
    <TodoList @item-done-change="onDoneChange" @delete="onDelete" :todos="todos" />
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
