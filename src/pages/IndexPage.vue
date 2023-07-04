<template>
  <div class="q-pa-sm">
    <CurrentEpisode />
    <q-page class="row">
      <div class="col-xs-12 col-md-6">
        <EpisodeDescription />
      </div>
      <div class="col-xs-12 col-md-6">
        <EpisodesTabs />
      </div>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import CurrentEpisode from 'components/episodes/CurrentEpisode.vue';
import EpisodesTabs from 'components/episodes/EpisodesTabs.vue';
import EpisodeDescription from 'components/episodes/EpisodeDescription.vue';
import { onMounted } from 'vue';
import { useLessonsStore } from '../stores/lessons';

const store = useLessonsStore();

onMounted(() => {
  store.fetchLessons();
});
</script>
