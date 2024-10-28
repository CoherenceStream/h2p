<template>
  <h3>Research tools</h3>
  <div id="bento-research-cues">
    <form id="add-research-form" @submit.prevent="researchAdd()">
      <label for="research"></label>
      <input type="input" id="research-add" name="research" placeholder="add research url" v-model="researchURLadd" autofocus>
    </form>
    <button id="bento-research-task" type="submit" @click.prevent="researchAdd()">
      + add paper
    </button>
  </div>
  <div id="research-paper-list">
    <div id="research-paper-select" v-for="pap in researchPapers" :value="pap.id">
      <button class="research-paper-item" @click="viewRsearch(pap)">
        {{ pap }}
      </button>
      <button class="research-paper-source" @click="viewSourcePaper(pap)">
        View source
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed} from 'vue'
import { bentoboxStore } from '@/stores/bentoboxStore.js'
import { aiInterfaceStore } from '@/stores/aiInterface.js'

  const storeAI = aiInterfaceStore()
  const storeBentobox = bentoboxStore()

  let researchURLadd = ref('')
  let spaceResearch = ref(false)
  let researchPapers = ref([])


    /* computed */
    const researchMedia = computed(() => {
      return storeBentobox.researchMedia
    })

  /* methods */

  const researchAdd = () => {
    // assume youtube and extract id
    if (researchURLadd.value.length > 0) {
      researchPapers.value.push(researchURLadd.value)
      researchURLadd.value = ''
    }
  }

  const viewRsearch = (paper) => {
    if (paper.length > 0) {
      // check if holder setup
      if (storeBentobox.locationRbox[storeAI.liveBspace.spaceid] === undefined) {
        storeBentobox.locationRbox[storeAI.liveBspace.spaceid] = {}
      }
      storeBentobox.setLocationRbox(storeAI.liveBspace.spaceid, paper)
      if (storeBentobox.researchMedia[storeAI.liveBspace.spaceid]) {
        storeBentobox.researchMedia[storeAI.liveBspace.spaceid].push({ tag: 'paper', id: paper })
      } else {
        storeBentobox.researchMedia[storeAI.liveBspace.spaceid] = []
        storeBentobox.researchMedia[storeAI.liveBspace.spaceid].push({ tag: 'paper', id: paper })
      }
    } else {
      console.log('empty URL')
    }
    //  need to emit to close one component up
    // spaceResearch.value = false
  }

  const viewSourcePaper = (paper) => {
    // visit source in new tab
    window.open(paper, '_blank')
  }

</script>

<style scoped>

</style>