<template>
  <q-tabs v-if="store.list.length > 0" v-model="tab" vertical>
    <q-tab
      v-for="item in store.list"
      :name="item.id"
      :label="item.title"
      :key="item.id"
      :disable="item.disabled"
      @click="onTabClick(item.id)"
    />
  </q-tabs>
</template>

<script setup lang="ts">
import { useLessonsStore } from 'src/stores/lessons';
import { ref } from 'vue';
import { FIRST_ITEM_ID } from 'src/constants';

const tab = ref(FIRST_ITEM_ID);

const store = useLessonsStore();

function onTabClick(id: number) {
  store.selectLesson(id);
}
</script>
