<script setup lang="ts">
import { ref, watch } from 'vue';
import TodoItem from './TodoItem.vue';

const props = defineProps(['todos'])

const emit = defineEmits(['item-done-change', 'delete'])

</script>

<template>
  <div :key="date" v-for="(items, date) in props.todos">
    <div class="date">{{ date }}</div>
    <ul class="todo-list">
      <li :key="item.id" v-for="item in items">
        <TodoItem @checkbox-pressed="$emit('item-done-change', item.id)" @delete="$emit('delete', item)"
          :checked="item.done">
          <template #text>{{ item.text }}</template>
        </TodoItem>
      </li>
    </ul>
  </div>
</template>

<style scoped>
li {
  list-style: none;
}
</style>

