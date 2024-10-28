<template>
    <div id="cues-holistic">
    <button class="cue-select-btn" id="simple-wheel" @click="selectCue('simple')" v-bind:class="{ active: wheelType === 'simple' }">Holistic</button>
    <button class="cue-select-btn" id="simple-segments" @click="selectCue('segments')" v-bind:class="{ active: wheelType === 'segments' }">Segments</button>
    <button class="cue-select-btn" id="simple-segments" @click="selectCue('aging')" v-bind:class="{ active: wheelType === 'aging' }">Longevity</button>
  </div>
  <div id="saved-cues">
    <div class="network-cues" v-for="ncue of cuesNetworkList" :value="ncue">
      <button class="cue-item" @click="viewCue(ncue)">{{ ncue.name }}</button>
    </div>
  </div>
  <div id="view-cues" v-if="cueActive !== 'segdown'">
    <div class="pie" v-if="cueType === 'simple'">
      <pie-chartcues :cueType="'simple'" :chartData="cuesHolistic" :options="{}" @segmentClick="cueSelect"></pie-chartcues>
    </div>
    <div class="pie-segments" v-if="cueType === 'segments'">
      <pie-chartcues :cueType="'segments'" :chartData="cuesSegments" :options="{}" @segmentClick="cueSelect"></pie-chartcues>
    </div>
    <div class="pie-segments" v-if="cueType === 'aging'">
      <pie-chartcues :cueType="'aging'" :chartData="cuesData" :options="{}" @segmentClick="cueSelect"></pie-chartcues>
      Source: <a href="https://peterattiamd.com/the-challenges-of-defining-aging/" target="_blank">All marks of aging</a>
    </div>
  </div>
  <div id="cue-bentobox">
    <div id="cue-type" v-if="cueActive === 'segdown'">
      <pie-chartcues v-if="liveDoughData" :chartData="liveDoughData" :options="{}" @segmentClick="cueSelect" ></pie-chartcues>
    </div>
    <div id="cue-type" v-if="cueActive === 'Movement'">
      <pie-chartcues :chartData="cuesBody" :options="{}" @segmentClick="cueSelect" ></pie-chartcues>
    </div>
    <div id="cue-type" v-if="cueActive === 'Buildings'">
      <pie-chartcues :chartData="cuesBuilding" :options="{}" @segmentClick="cueSelect" ></pie-chartcues>
    </div>
    <div id="cue-type" v-if="cueActive === 'Climate/weather'">
      <pie-chartcues :chartData="cuesNature" :options="{}" @segmentClick="cueSelect" ></pie-chartcues>
    </div>
  </div>
</template>

<script setup>
import PieChartcues from '@/components/visualisation/charts/doughnutChart.vue'
import { ref, computed } from 'vue'
import { cuesStore } from '@/stores/cuesStore.js'

  const storeCues = cuesStore()

  let cueType = ref('')
  let wheelType = ref('')
  let cueActive = ref('')

  /* cumputed */
  const cuesHolistic = computed(() => {
    return storeCues.hopCues
  })

  const cuesSegments = computed(() => {
    return storeCues.cuesSegments
  })

  const cuesData = computed(() => {
    return storeCues.longevityCues
  })

  const cuesNetworkList = computed(() => {
    // let testCues = [{ cueid: 123456, name: 'holistic' }]
    // storeCues.cuesList = testCues
    return storeCues.cuesList
  })

  const cuesSelection = computed(() => {
    return storeCues.activeCueSegment
  })

  const cuesNature = computed(() => {
    return storeCues.natureBoundries
  })

  const cuesEnvironment = computed(() => {
    return storeCues.cuesEnvironment
  })

  const cuesCulture = computed(() => {
    return storeCues.cuesCulture
  })

  const cuesLife = computed(() => {
    return storeCues.cuesLife
  })

  const cuesBody = computed(() => {
    let testPie = {
      labels: ['Brain', 'Skin', 'Heart', 'Immunesystem', 'Cardio', 'Muscle mass', 'Inflamation', 'Blood', 'Hormones', 'Sight', 'Mouth/teeth'],
      datasets: [
        {
        backgroundColor: ['#191fe7', '#920914', '#09921c', '#560992', '#17c8d1', '#f08113', '#61819c', '#e66553', '#8bf5b0', '#999999' ,'#999999', '#999999'],
        data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
        }
      ]}
    return testPie
  })

  const cuesBuilding = computed(() => {
    let testPie = {
      labels: ['Hotel1', 'Hotel2', 'Hotel3', 'Hotel4', 'Hotel5', 'Hotel6', 'Hotel7', 'Hotel8', 'Hotel9', 'Hotel10', 'Hotel11'],

      datasets: [
        {
        backgroundColor: ['#191fe7', '#920914', '#09921c', '#560992', '#17c8d1', '#f08113', '#61819c', '#e66553', '#8bf5b0', '#999999' ,'#999999', '#999999'],
        data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
        }
      ]}
    return testPie
  })

  const liveDoughData = computed(() => {
    return storeCues.activeDougnnutData
  })


  /* methods */
  const selectCue = (type) => {
    cueType.value = type
    cueActive.value = ''
  }

  const viewCue = (cue) => {
    cueActive.value = 'segdown'
    let cueRelData = cue.relationship
    storeCues.activeDougnnutData = cueRelData
  }

  const cueSelect = async (segType, segInfo) => {
    // match seg to data set
    cueActive.value = 'segdown'
    if (segInfo.label === 'Nature') {
      storeCues.activeDougnnutData = cuesNature
    } else if (segInfo.label === 'Environment') {
      storeCues.activeDougnnutData = cuesNature
    } else if (segInfo.label === 'Culture') {
      storeCues.activeDougnnutData = cuesNature
    } else if (segInfo.label === 'Life') {
      storeCues.activeDougnnutData = cuesLife
    }
  }

</script>


<style scoped>

.network-cues{
  display: inline-block;
  margin-top: 1em;
  margin-right: .8em;
}

@media (min-width: 1024px) {


}

</style>