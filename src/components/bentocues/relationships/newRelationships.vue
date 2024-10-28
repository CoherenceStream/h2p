<template>
  <div id="cue-relationships" class="pie">
    <div id="rel-tools">
      tools
    </div>
    <div id="rel-columns">
      <div id="rel-one">
        <div id="select-cue-a">
          Select a Cue
          <div class="cues-list" v-for="cue in cuesList">
            <button>{{ cue.name }}</button>
          </div>
        </div>
        <div id="doughnut-size-add" v-if="columnA === 'cueA'">
          <pie-chartcues v-if="cuesNew.labels.length > 0" :cueType="'view'" :chartData="cuesColA" :options="{}" @segmentClick="cueSelectAdd"></pie-chartcues>
        </div>
      </div>
      <div id="relationship-glue">
        Relationship
        <div id="connection-glue">
          <button>Down</button>
          <button>Up</button>
          <button>Equal</button>
          <button>Unknown</button>
        </div>
      </div>
      <div id="rel-two">
        <div id="select-cue-a">
          Select a cue B
          <!-- existing cues -->
          <cues-prepared></cues-prepared>
        </div>
        <div id="doughnut-size-add" v-if="columnB === 'cueB'">
          <pie-chartcues v-if="cuesNew.labels.length > 0" :cueType="'view'" :chartData="cuesColB" :options="{}" @segmentClick="cueSelectAdd"></pie-chartcues>
        </div>
      </div>
    </div>
    <div id="glue-relationship">
      <button id="glue-type-button" @click="mapGlue">Glue relationship</button>
    </div>
  </div>
</template>

<script setup>
import hashObject from 'object-hash'
import { ref, computed } from 'vue'
import CuesPrepared from '@/components/bentocues/prepareCues.vue'
import PieChartcues from '@/components/visualisation/charts/doughnutChart.vue'
import { aiInterfaceStore } from '@/stores/aiInterface.js'
import { bentoboxStore } from '@/stores/bentoboxStore.js'
import { libraryStore } from '@/stores/libraryStore.js'
import { cuesStore } from '@/stores/cuesStore.js'

  const storeAI = aiInterfaceStore()
  const storeBentobox = bentoboxStore()
  const storeLibrary = libraryStore()
  const storeCues = cuesStore()

  let columnA = ref(false)
  let columnB = ref(false)

  /*  computed  */
  const cuesColA = computed(() => {
    return storeCues.cueColumnA
  })

  const cuesColB = computed(() => {
    return storeCues.cueColumnB
  })

  const cuesList = computed(() => {
    return storeCues.cuesmenuList
  })


  /* methods */
  const cueSelectAdd = (type, seg) => {
    console.log('select label')
    console.log(type)
    console.log(seg.chart.$context.chart.tooltip.dataPoints[0])
    let labelA = seg.chart.$context.chart.tooltip.dataPoints[0].label
  }

  const mapGlue = () => {
    console.log('glue relationsips pelease')
  }

</script>

<style scoped>

#cue-relationships {
  display: grid;
  grid-template-columns: 1fr;
  margin: 2em;
}

#rel-columns {
  display: grid;
  grid-template-columns: 1fr;  
}

#relationship-glue {
  display: grid;
}

#connection-glue {
  display: grid;
  grid-template-columns: 1fr;
}

#glue-relationship {
  border: 2px solid green;
  justify-self: center;
}

#glue-type-button {
  margin-top: 1em;
  font-size: 1.2em;
}

@media (min-width: 1024px) {

  #rel-columns {
    display: grid;
    grid-template-columns: 4fr 1fr 4fr;
    border: 2px solid red;
    min-height: 200px;
  }

  #rel-one {
    border: 1px solid blue;
  }

  #relationship-glue {
    display: grid;
    grid-template-columns: 1fr;
    border: 2px solid purple;
  }

}
</style>
