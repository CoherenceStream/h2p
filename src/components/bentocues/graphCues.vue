<template>
  <Teleport to="body">
    <modal-cues :show="bentoGraphStatus" @close="closeBentoGraph">
      Cues
      <template #header>
        <div id="cues-modal-header">
          <button
            type="button"
            class="btn-green"
            @click="closeBentoGraph"
            aria-label="Close modal"
          >
            Close
          </button>
          <div id="cues-context">Graphs</div>
          <div id="return-modal-close" @click="closeBentoGraph">return</div>
        </div>
      </template>
      <template #body>
        <div class="main">
          <beebee-ai></beebee-ai>
          <button id="open-beebee" @click.prevent="setShowBeeBee">beebee</button>
          <div id="graph-toolbar">
            <button class="graph-type-button">Peers</button>
            <button class="graph-type-button">Knowledge</button>
            <button class="graph-type-button">N=1's</button>
          </div>
          <div id="bento-graph">
            <div id="sigma-container"></div>
          </div>
        </div>
      </template>
      <template #footer>
      </template>
    </modal-cues>
  </Teleport>
</template>

<script setup>
import Graph from "graphology"
import Sigma from "sigma"
import { ref, computed, onMounted } from 'vue'
import ModalCues from '@/components/bentocues/cuesModal.vue'
import BeebeeAi from '@/components/beebeehelp/spaceChat.vue'
import { cuesStore } from '@/stores/cuesStore.js'
import { aiInterfaceStore } from '@/stores/aiInterface.js'
import { bentoboxStore } from '@/stores/bentoboxStore.js'

  const storeCues = cuesStore()
  const storeAI = aiInterfaceStore()
  const storeBentobox = bentoboxStore()

  /* on mount */
  onMounted(() => {
    drawSocialGraph()
  })

  /* computed */
  const bentoGraphStatus = computed(() => {
    return storeAI.bentographState
  })


  /* methods */
  const closeBentoGraph = () => {
    storeAI.beebeeContext = 'chat'
    storeAI.bentographState = !storeAI.bentographState
  }

  const setShowBeeBee = () => {
    // beebeeSpace.value = !beebeeSpace.value
    console.log('open space chat pel\seS')
    storeAI.bentochatState = !storeAI.bentochatState
  }

  const drawSocialGraph = () => {
    const graph = new Graph()
    graph.addNode("1", { label: "Node 1", x: 0, y: 0, size: 10, color: "blue" })
    graph.addNode("2", { label: "Node 2", x: 1, y: 1, size: 20, color: "red" })
    graph.addEdge("1", "2", { size: 5, color: "purple" })

    let peerGraph = document.getElementById("sigma-container")
    console.log(peerGraph)
    const sigmaInstance = new Sigma(graph, peerGraph)
  }

</script>

<style scoped>

#graph-toolbar {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.graph-type-button {
  font-size: 1.2em;
  width: 120px;
}

#open-beebee {
    position: fixed;
    bottom: 10px;
    right: 120px;
    z-index: 31;
    display: grid;
    justify-content: center;
    place-self: start;
    align-self: start;
    height: 2em;
    width: 5em;
    background-color: white;
  }

  #sigma-container {
    height: 900px;
    width: 900px;
  }


  @media (min-width: 1024px) {

    #sigma-container {
      height: 900px;
    width: 900px;
    }


    #bento-graph {
      display: grid;
      grid-template-columns: 3fr 1fr;
      border: 1px solid green;
      height: 100%;
    }

    #return-modal-close {
      text-align: right;
    }

    /*  fliters  */
    #filter-cues {
      margin-left: 2em;
    }


  }

</style>