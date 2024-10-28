<template>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal-space :show="bentospaceStatus" @close="closeBentoSpace">
      <template #header>
        <!-- The code below goes into the header slot -->
        <div id="space-modal-header">
          <button
            type="button"
            class="btn-green"
            @click="closeBentoSpace"
            aria-label="Close modal"
          >
            Close
          </button>
          <h3>BentoSpace # {{ storeAI.liveBspace.name }}</h3>
          <div id="return-modal-close" @click="closeBentoSpace">return</div>
        </div>
      </template>
      <template #body>
        <beebee-ai></beebee-ai>
        <button id="open-beebee" @click.prevent="setShowBeeBee">beebee</button>
        <div id="space-toolbar">
          <!--<div id="beebee-help"></div>-->
          <div id="cues-connector">
            <button @click="cueConnect()" v-bind:class="{ active: cuesTools === true }">Cues</button>
          </div>
          <div id="decision-tools">
            <button @click="addCueDecision()" v-bind:class="{ active: spaceDecision === true }">+ decision</button>
          </div>
          <div id="add-context">
            <button @click="contextAdd()" v-bind:class="{ active: contextTools === true }">+ context</button>
          </div>
          <div id="space-bar">space bar</div>
          <div class="scale-item scalebuttons">
            <label>Scale</label>
            <!--<input type="range" min="0.1" max="2" step="0.1" v-model.number="scalelocal" @change="setzoomScale">-->
            <button class="point-change" @click="setzoomScale(-0.05)">-</button>
            {{ Math.round(zoomscaleValue * 100) }} %
            <button class="point-change" @click="setzoomScale(0.05)">+</button>
          </div>
        </div>
        <div id="space-context-tools" v-if="contextTools === true">
          <div id="n1-tools">
            <button @click="addBentoN1()">+ N=1</button>
            <div id="bento-n1" v-if="spaceN1setup === true">
              New network experitment or join
            </div>
          </div>
          <div id="media-tools">
            <button @click="addBentoMedia()">+ media</button>
            <div id="bento-media" v-if="spaceMedia === true">
              <h3>Bento Media tools</h3>
              <div id="bento-media-video">
                <form id="add-video-form" @submit.prevent="videoAdd()">
                  <label for="video"></label>
                  <input type="input" id="video-add" name="video" placeholder="add video url" v-model="videoURLadd" autofocus>
                </form>
                <button id="bento-media-task" type="submit" @click.prevent="videoAdd()">
                  + add
                </button>
              </div>
            </div>
          </div>
          <div id="research-tools">
            <button @click="addCueResearch()">+ research</button>
            <div id="bento-cue-research" v-if="spaceResearch === true">
                <research-cue></research-cue>
            </div>
          </div>
          <div id="marker-tools">
            <button @click="addCueMarker()">+ marker</button>
            <div id="bento-cue-marker" v-if="spaceMarker === true">
                <marker-cue></marker-cue>
            </div>
          </div>
          <div id="product-tools">
            <button @click="addCueProduct()">+ product</button>
            <div id="bento-cue-product" v-if="spaceProduct === true">
                <!-- need product view or link to source etc. -->
            </div>
          </div>
        </div>
        <div id="bentospace-holder" v-dragscroll.noleft.noright="true" @click="whereMinmap($event)">
          <div id="bento-space" v-bind:style="{ transform: 'scale(' + zoomscaleValue + ')' }">
            <div id="cues-context-tools" v-if="cuesTools === true">
              cues tools please
              <!-- existing cues -->
             <cues-prepared v-if="wheelType === 'cues'"></cues-prepared>
            </div>
            <div id="bento-cue-decicion" v-if="spaceDecision === true">
              <decision-cue></decision-cue>
            </div>
            <!-- location for bentobox - es -->
            <div id="space-bento-items">
              <div id="bento-layout" v-for="bbox in storeAI.bentoboxList[storeAI.liveBspace.spaceid]">
                <bento-boxspace :bboxid="bbox.bboxid" :contractid="bbox.contract"></bento-boxspace>
              </div>
              <!--video / image /  decision  / cues etc  to compliment bentobox-->
              <div id="bento-media-space" v-for="bmedia in storeBentobox.videoMedia[storeAI.liveBspace.spaceid]">
                <media-space :bstag="bmedia.tag" :bsmedia="bmedia.id"></media-space>
              </div>
              <!-- research media -->
              <div id="bento-research-space" v-for="rmedia in storeBentobox.researchMedia[storeAI.liveBspace.spaceid]">
                <research-space :bstag="rmedia.tag" :bsmedia="rmedia.id"></research-space>
              </div>
                <!-- marker -->
                <div id="bento-research-space" v-for="mkmedia in storeBentobox.markerMedia[storeAI.liveBspace.spaceid]">pp {{ mkmedia }}
                <marker-space :bstag="mkmedia.tag" :bsmedia="mkmedia.id.marker"></marker-space>
              </div>
              <!-- product -->
              <!--<div id="bento-product-space" v-for="mkproduct in storeBentobox.productMedia[storeAI.liveBspace.spaceid]">pp {{ mkprodcut }}-->
                <!--<product-space :bstag="mkproduct.tag" :bsmedia="mkproduct.id.marker"></product-space>-->
              <!--</div>-->
            </div>
          </div>
        </div>
        <mininav-map :spaceid="storeAI.liveBspace.spaceid" :bboxid="'null'"></mininav-map>
      </template>
      <template #footer>
      </template>
    </modal-space>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import ModalSpace from '@/components/bentospace/spaceModal.vue'
import CuesPrepared from '@/components/bentocues/prepareCues.vue'
import BentoBoxspace from '@/components/bentobox/bentoboxSpace.vue'
import MediaSpace from '@/components/bentospace/video/mediaSpace.vue'
import ResearchSpace from '@/components/bentospace/research/researchSpace.vue'
import MarkerSpace from '@/components/bentospace/marker/markerSpace.vue'
import DecisionCue from '@/components/bentocues/decisions/decisionCues.vue'
import ResearchCue from '@/components/bentocues/research/researchCues.vue'
import MarkerCue from '@/components/bentocues/marker/markerCues.vue'
import BeebeeAi from '@/components/beebeehelp/spaceChat.vue'
import MininavMap from '@/components/bentospace/map/mininavMap.vue'
import { aiInterfaceStore } from '@/stores/aiInterface.js'
import { bentoboxStore } from '@/stores/bentoboxStore.js'
import { mapminiStore } from '@/stores/mapStore.js'

  const storeAI = aiInterfaceStore()
  const storeBentobox = bentoboxStore()
  const storeMmap = mapminiStore()

  let mouseLive = ref(
    {
      x: 10,
      y: 10
    }
  )
  let wheelType = ref('cues')
  let cuesTools = ref(false)
  let contextTools = ref(false)
  let spaceN1setup = ref(false)
  let spaceMedia = ref(false)
  let videoURLadd = ref('')
  let spaceDecision = ref(false)
  let spaceResearch = ref(false)
  let spaceMarker = ref(false)
  let spaceProduct = ref(false)

  /* computed */
  const bentospaceStatus = computed(() => {
    return storeAI.bentospaceState
  })

  const zoomscaleValue = computed(() => {
    return storeBentobox.scaleZoom
  })

  /* methods */
  const setShowBeeBee = () => {
    // beebeeSpace.value = !beebeeSpace.value
    console.log('open space chat pel\seS')
    storeAI.bentochatState = !storeAI.bentochatState
  }

  const closeBentoSpace = () => {
    storeAI.beebeeContext = 'chat'
    storeAI.bentospaceState = !storeAI.bentospaceState
    // save the current layout on close
    storeBentobox.saveLayoutSpace(storeAI.liveBspace.spaceid)
  }

  const setzoomScale = (change) => {
    storeBentobox.scaleZoom = storeBentobox.scaleZoom + change
  }

  const whereMinmap = (mo) => {
    mouseLive.x = mo.offsetX
    mouseLive.y = mo.offsetY
    // if click on minimap do not send
    if (mo.target.id !== 'minimap') {
      storeMmap.actionPostionCoordMouse(mouseLive)
    }
  }

  const addBentoN1 = () => {
    spaceN1setup.value = !spaceN1setup.value
  }

  const addBentoMedia = () => {
    spaceMedia.value = !spaceMedia.value
  }

  const videoAdd = () => {
    // assume youtube and extract id
    if (videoURLadd.value.length > 0) {
      let videoSplit = videoURLadd.value.split('/')
      // console.log(videoSplit)
      // set mbox in boxstore and add to media list
      // check if holder setup
      if (storeBentobox.locationMbox[storeAI.liveBspace.spaceid] === undefined) {
        storeBentobox.locationMbox[storeAI.liveBspace.spaceid] = {}
      }
      storeBentobox.setLocationMbox(storeAI.liveBspace.spaceid, videoSplit[3])
      if (storeBentobox.videoMedia[storeAI.liveBspace.spaceid]) {
        storeBentobox.videoMedia[storeAI.liveBspace.spaceid].push({ tag: 'video', id: videoSplit[3]})
      } else {
        storeBentobox.videoMedia[storeAI.liveBspace.spaceid] = []
        storeBentobox.videoMedia[storeAI.liveBspace.spaceid].push({ tag: 'video', id: videoSplit[3]})
      }
    } else {
      console.log('empty URL')
    }
    spaceMedia.value = false
    videoURLadd.value = ''
  }

  const addCueDecision = () => {
    console.log('decision doughnut please')
    spaceDecision.value = !spaceDecision.value
    // storeAI.decisionDoughnutCue = !storeAI.decisionDoughnutCue
  }

  const addCueResearch = () => {
    spaceResearch.value = !spaceResearch.value
  }

  const addCueMarker = () => {
    spaceMarker.value = !spaceMarker.value
  }

  const addCueProduct = () => {
    spaceProduct.value = !spaceProduct.value
  }

  const cueConnect = () => {
    cuesTools.value = !cuesTools.value
  }

  const contextAdd = () => {
    contextTools.value = !contextTools.value
  }

</script>

<style scoped>

.active {
  background-color: rgb(113, 172, 114);
}

#space-toolbar {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 2fr 1fr;
  background-color: antiquewhite;
}

#cues-context-tools {
  display: absolute;
  left: 0;
  top: 0;
  border: 1px solid lightgrey;
  height: 460px;
  width: 460px;
  background-color: white;
}

#space-context-tools {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 1em;
  margin-bottom: .6em;
}

#bentospace-holder {
  border: 0px solid red;;
}

#bento-space {
  display: grid;
  grid-template-columns: 1fr;
  border: 2px solid green;
  height: 80vh;
  width: 100%;
  margin-top: 0.1em;
  transform-origin: left top;
  border: 1px solid orange;
  background-color: #fff4f4;
  background: linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px);
  background-size: 60px 60px, 60px 60px;
}

#return-modal-close {
  text-align: right;
}

/*  media bar  */
#bento-media {
  position: absolute;
  z-index: 33;
  top: 10;
  left: 20;
  border-bottom: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  padding: 1em;
  background: rgb(176, 176, 204);
  width: 300px;
  opacity: .8;
}

/* decision tools */
#bento-cue-decicion {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 33;
  width: auto;
  border-bottom: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  padding: 1em;
  background: rgb(176, 176, 204);
  opacity: .98;
}

  @media (min-width: 1024px) {

    #space-modal-header {
      display: grid;
      grid-template-columns: 1fr 8fr 1fr;
    }

    #bentospace-holder {
      height: 80vh;
      width: 100%;
      overflow: scroll;
    }

    #bento-space {
      height: 998vh;
      width: 998vw;
      z-index: 2;
    }

    #space-bento-items {
      position: relative;
    }

    #space-modal-header {
      display: grid;
      grid-template-columns: 1fr 8fr 1fr;

    }

    #return-modal-close {
      justify-content: right;
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

  .scale-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-self: end;
  }

  #bento-layout {
    position: relative;
    border: 3px solid purple;
    height: 1px;
    width: 1px;
  }

  #bento-media-space {
    position: relative;
    border: 2px solid green;
    height: 1px;
    width: 1px;
  }

  /*  media bar  */
  #bento-media {
    position: absolute;
    z-index: 33;
    top: 10;
    left: 20;
    border-bottom: 1px solid lightgrey;
    border-left: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
    padding: 1em;
    background: rgb(176, 176, 204);
    width: 300px;
    opacity: .8;
  }

  /* decision tools */
  #bento-cue-decicion {
    position: absolute;
    z-index: 33;
    width: auto;
    height: auto;
    margin-left: 0px;
    border-bottom: 1px solid lightgrey;
    border-left: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
    padding: 1em;
    background: rgb(176, 176, 204);
    opacity: .98;
  }

  /* research tools */
  #bento-cue-research {
    position: absolute;
    z-index: 33;
    width: auto;
    height: auto;
    margin-left: -120px;
    border-bottom: 1px solid lightgrey;
    border-left: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
    padding: 1em;
    background: rgb(176, 176, 204);
    opacity: .98;
  }

}

</style>
