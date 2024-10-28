<template>
  <div id="bento-media">
    <div id="bento-media-video">
      <form id="add-video-form">
        <label for="video"></label>
        <input type="input" id="video-add" name="video" placeholder="add video url" v-model="storeLibrary.newMediaForm.url" autofocus>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { libraryStore } from '@/stores/libraryStore.js'

  const storeLibrary = libraryStore()

  /* methods */

</script>

<style scoped>

#bento-media {
  display: grid;
  grid-template-columns: 1fr;
  margin: 2em;
}

input {
  width: 40vw;
}

  @media (min-width: 1024px) {


  }
  
</style>
