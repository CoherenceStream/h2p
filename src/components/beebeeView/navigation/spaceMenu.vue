<template>
  <div id="space-menu">
    <button class="create-space" @click="newSpacemenu">
      + create space
    </button>
    <div id="space-form-save" v-if="saveSpace">
      <form id="ask-ai-form" @submit.prevent="saveSpacename()">
        <label for="spacename"></label>
        <input type="input" id="newspace" name="newspace" placeholder="space name" v-model="newSpacename">
        <button id="save-space-name" type="submit">
          add
        </button>
      </form>
    </div>
    <div class="history-list" v-for="sis in spaceList">
      <button
          class="flat-history"  v-bind:class="{ active: sis?.active }" @click="bentoSpaceOpen(sis)" @mouseover="hoverCheck(sis)" @mousemove="moveCheck(sis)"> {{ sis.name }}
        </button> <!--@mouseup="dropBBox"-->
      <button class="save-chat-history" @click="saveSpaceHistory(sis)">save</button>
      <button class="delete-chat-history" @click="deleteSpaceHistory(sis)">Del</button>
    </div>
    <h2>Cues</h2>
    <div class="cues-list" v-for="cue in cuesList">
      <div id="cue-holistic">
        <button class="flat-history"  v-bind:class="{ active: cue?.active }" @click="bentoSpaceOpen(cue)" @mouseover="hoverCheck(cue)" @mousemove="moveCheck(cue)"> {{ cue.name }}
        </button>
        <span id="drill-cue" v-if="cue.expand === true">
          <button class="drill-cue-history" @click="drillCue(cue)">c-></button>     
        </span>
        <button class="save-chat-history" @click="saveSpaceHistory(cue)">save</button>
        <button class="delete-chat-history" @click="deleteSpaceHistory(cue)">Del</button>
      </div>
      ---------
      <div id="gule-cues" v-if="glueTarget === true">
        <div class="cues-list" v-for="cues in selectCues">
          <div id="cue-holistic" v-if="cue.gluedown === glueName">
            <button class="flat-history"  v-bind:class="{ active: cues?.active }" @click="bentoSpaceOpen(cues)" @mouseover="hoverCheck(cues)" @mousemove="moveCheck(cues)"> {{ cues.name }}
            </button>
            <span id="drill-cue" v-if="cues.expand === true">
              <button class="drill-cue-history" @click="drillCue(cues)">c-></button>     
            </span>
            <button class="save-chat-history" @click="saveSpaceHistory(cues)">save</button>
            <button class="delete-chat-history" @click="deleteSpaceHistory(cues)">Del</button>
          </div>
          <div id="gule-cues" v-if="glueTarget === true && glueName === 'Nature'">
            another drill down?
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import hashObject from 'object-hash'
import { cuesStore } from '@/stores/cuesStore.js'
import { bentoboxStore } from '@/stores/bentoboxStore.js'
import { aiInterfaceStore } from '@/stores/aiInterface.js'
import { ref, computed, onMounted } from 'vue'

  const storeCues = cuesStore()
  const storeAI = aiInterfaceStore()
  const storeBentobox = bentoboxStore()

  let saveSpace = ref(false)
  let newSpacename = ref('')
  let glueTarget = ref(false)
  let glueName = ref('')


  /* on mount */
  onMounted(() => {
    storeCues.setSpaceGlue()
  })


  /*  computed  */
  const spaceList = computed(() => {
    return storeBentobox.spaceList
  })

  const cuesList = computed(() => {
    return storeCues.cuesmenuList
  })

  const selectCues = computed(() => {
    if (storeCues.selectCues[glueName.value] !== undefined) {
      return storeCues.selectCues[glueName.value].labels
    } else {
      return []
    }

  })

  const cuesNature = computed(() => {
    return storeCues.cuesNature.labels
  })

  const cuesLongevity = computed(() => {
    return storeCues.cuesLongevity.labels
  })

  const cuesBiomarkers = computed(() => {
    return storeCues.cuesBiomarkers.labels
  })

  cuesBiomarkers

  /* methods */
  const hoverCheck = (sis) => {
    // console.log('hover id')
    // console.log(sis)
  }

  const moveCheck = (sis) => {
    // console.log('move id')
    // console.log(sis)
  }

  const newSpacemenu = () => {
    saveSpace.value = !saveSpace.value
  }

  const drillCue = (cuem) => {
    glueTarget.value = !glueTarget.value
    glueName.value = cuem.gluedown
  }

  const bentoSpaceOpen = (spaceID) => {
    storeAI.beebeeContext = 'chatspace'
    storeAI.bentospaceState = !storeAI.bentospaceState
    storeAI.liveBspace = spaceID
    // make button green
    let spaceLiveList = []
    for (let spi of storeBentobox.spaceList) {
      if (spi.spaceid === spaceID.spaceid) {
        spi.active = true
        spaceLiveList.push(spi)
      } else {
        spi.active = false
        spaceLiveList.push(spi)
      }
    }
    storeBentobox.spaceList = spaceLiveList
  }

  const saveSpacename = () => {
    saveSpace.value = !saveSpace.value
    let spaceID = hashObject(newSpacename.value + new Date())
    let newSpaceItem = {}
    newSpaceItem.name = newSpacename.value
    newSpaceItem.spaceid = spaceID
    newSpaceItem.active = false
    storeBentobox.spaceList.push(newSpaceItem)
    storeAI.bentoboxList[spaceID] = []
    newSpacename.value = ''
    // make this the active space
    storeAI.liveBspace = newSpaceItem
    let spaceLiveList = []
    for (let spi of storeBentobox.spaceList) {
      if (spi.spaceid === spaceID) {
        spi.active = true
        spaceLiveList.push(spi)
      } else {
        spi.active = false
        spaceLiveList.push(spi)
      }
    }
    storeBentobox.spaceList = spaceLiveList
    storeBentobox.locationBbox[spaceID] = {}
  }

  const saveSpaceHistory = (space) => {
    let saveBentoBoxsetting = {}
    saveBentoBoxsetting.type = 'bentobox'
    saveBentoBoxsetting.reftype = 'space-history'
    saveBentoBoxsetting.action = 'save'
    saveBentoBoxsetting.task = 'save'
    saveBentoBoxsetting.data = space
    saveBentoBoxsetting.bbid = ''
    storeAI.prepareSpaceSave(saveBentoBoxsetting)
  }

  const deleteSpaceHistory = (space) => {
    // remove form chat list and delete message
    let updateSpacelist = []
    for (let sp of storeBentobox.spaceList) {
      if (sp.spaceid !== space.spaceid) {
        updateSpacelist.push(sp)
      }
    }
    storeBentobox.spaceList = updateSpacelist
    let delBentoBoxsetting = {}
    delBentoBoxsetting.type = 'bentobox'
    delBentoBoxsetting.reftype = 'space-history'
    delBentoBoxsetting.action = 'delete'
    delBentoBoxsetting.task = 'delete'
    delBentoBoxsetting.data = space
    delBentoBoxsetting.bbid = ''
    console.log('dleelel sapce')
    console.log(delBentoBoxsetting)
    storeAI.sendMessageHOP(delBentoBoxsetting)
  }

</script>

<style scoped>
#space-menu {
  display: grid;
  grid-template-columns: 1fr;
  height: 100%;
  overflow-y: scroll;
  overflow-x: visible;
}

.create-space {
  margin-top: 1em;
  background-color: white;
  border: 1px dashed grey;
  margin-bottom: 1em;
}

.flat-history {
  background-color: rgb(178, 188, 227);
  border: 0px;
  margin: .4em;
  padding: .5em;
}

.active {
  background-color: rgb(113, 172, 114);
}

/* .history-list:first-child {
  background-color: green;
} */

.live-drop-zone {
  display: block;
  height: 2em;
}

  @media (min-width: 1024px) {

    .menulive {
      background-color: 1px solid green;
    }

    .live-drop-zone {
      height: 100%;
      border: 0px dashed rgb(228, 137, 39);
    }

    .live-drop-zone:hover {
      background-color: rgb(244, 245, 246);
    }

    #gule-cues {
      position: relative;
    }

    .cues-list {
      position: relative;
    }


  }
</style>