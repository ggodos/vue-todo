<script setup lang="ts">
import TodoItem from './TodoItem.vue';

const props = defineProps(['items', 'date'])

</script>

<template>
  <div>{{ props.date }}</div>
  <ul>
    <li :key="item.id" v-for="item in props.items">
      <TodoItem @checkbox-pressed="$emit('item-done-change', item.id)" :checked="item.done">
        <template #text>{{ item.text }}</template>
      </TodoItem>
    </li>
  </ul>
</template>

<style scoped>
li {
  list-style: none;
}
</style>

