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

const PlayerState = {
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
}

const stateHandlers = {
  [PlayerState.PLAYING]: handlePlayingState,
  [PlayerState.PAUSED]: handlePausedState,
  [PlayerState.ENDED]: handleEndedState,
};

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
  console.log('event: ', event);

  const stateHandler = stateHandlers[event.data];
  
  if (stateHandler) {
    stateHandler();
  }
}

function handlePlayingState() {
  runTimer();
  console.log('Click play');
}

function handlePausedState() {
  console.log('Click pause');
  stopInterval();
}

function handleEndedState() {
  console.log('ended')
  stopInterval();
}

function notifyAvailableNewLesson() {
  $q.notify({
    type: 'info',
    message: 'New lesson available!',
  });
}

function runTimer() {
  clearInterval(timer);
  console.log('runTimer: ', timerCount.value);

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
