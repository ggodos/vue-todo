<script setup>
import { onMounted, ref } from 'vue';

import TodoItem from './TodoItem.vue';

const props = defineProps(['items', 'date'])
const emit = defineEmits(['item-done-change'])




</script>


<template>
  <div class="todo-day">
    <div class="date">{{ props.date }}</div>
    <ul>
      <li :key="item.id" v-for="item in props.items">
        <TodoItem @checkbox-pressed="$emit('item-done-change', item.id)" :checked="item.done">
          <template #text>{{ item.text }}</template>
        </TodoItem>
      </li>
    </ul>
  </div>
</template>
