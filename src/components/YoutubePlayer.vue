<template>
  <div id="youtube-player"></div>
</template>

<script setup lang="ts">
import YouTubePlayer from 'youtube-player';
import { useLessonsStore } from 'src/stores/lessons';
import { nextTick, watch, ref } from 'vue';
import { useQuasar } from 'quasar';

let player;
let timer;

const timerCount = ref(0);

const IS_PLAYING_CODE = 1;
const IS_PAUSED_CODE = 2;
const MINUTE = 60;

const store = useLessonsStore();
const $q = useQuasar();

watch(
  () => store.selectedLesson,
  (newValue) => {
    if (newValue && newValue.video_url) {
      nextTick(() => {
        setTimerToDefault();
        initPlayer();
      });
    }
  },
  { immediate: true }
);

function initPlayer() {
  if (store.selectedLesson?.video_url) {
    if (player) {
      player.loadVideoById(store.selectedLesson?.video_url);
      player.stopVideo().then(() => {
        console.log('stop');
      });
    } else {
      player = YouTubePlayer('youtube-player');
      player.loadVideoById(store.selectedLesson?.video_url);
      player.stopVideo().then(() => {
        console.log('stop');
      });
    }
    player.on('stateChange', onPlayerStateChange);
  }
}

function setTimerToDefault() {
  if (timer) {
    clearInterval(timer);
  }
  timerCount.value = 0;
}

function onPlayerStateChange(event) {
  if (event.data === IS_PLAYING_CODE) {
    runTimer();

    console.log('Click play');
  } else if (event.data === IS_PAUSED_CODE) {
    console.log('Click pause');
    stopInterval();

    // removeInterval();
  }
}

function notifyAvailableNewLesson() {
  $q.notify({
    type: 'info',
    message: 'New lesson available!',
  });
}

function runTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    if (timerCount.value >= store.selectedLesson?.video_time * MINUTE) {
      console.log('ENABLED NEW!');
      store.enableLessonByLatesEnabled(store.selectedLesson?.id);
      notifyAvailableNewLesson();
      removeInterval();
    }
    console.log('tick');
    timerCount.value += 1;
  }, 1000);
}

function stopInterval() {
  if (timer) {
    clearInterval(timer);
  }
}

function removeInterval() {
  if (timer) {
    timerCount.value = 0;
    clearInterval(timer);
    timer = null;
  }
}
</script>
