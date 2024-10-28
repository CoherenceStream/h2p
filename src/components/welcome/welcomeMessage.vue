<template>
  <div class="beebee-welcome" v-if="storeAI.startChat === true">
    <div id="message-question">
      <h1 class="welcome-message">Welcome to LHA :</h1>
      <div class="sub-message">Longevity Health Agents</div>
    </div>
    <div id="bb-features">
      <div class="message-bb">
        <header>Longevity Agents</header>
        <div class="message-learn">
          Help with research, biomarkers, analysis & charting
        </div>
      </div>
      <div class="message-bb">
        <header>Community</header>
        <div class="message-learn">
          Build networks of N=1 experiments around research, intervention or supplements etc.
        </div>
      </div>
      <div class="message-bb">
        <header>Secure storage & sharing</header>
        <div class="message-learn">
          Import sovereign data and share with those you trust
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { aiInterfaceStore } from '@/stores/aiInterface.js'

  const storeAI = aiInterfaceStore()
</script>

<style>
.beebee-welcome {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
}

.welcome-message {
  color: black;
  opacity: 100%;
}

.sub-message {
  color: black;
  font-size: 1.2em;
  font-weight: bold;
}

#message-question {
  text-align: center;
}

#bb-features {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: .6em;
  justify-content: center;
  padding: 2em;
}

.message-bb {
  display: grid;
  border: 1px solid rgb(238, 215, 172);
  background-color: white;
}

.message-bb header {
  display: grid;
  justify-content: center;
  padding-top: 0.1em;
}

.message-learn {
  padding: .6em;
  overflow-wrap: break-word;
}

  @media (min-width: 1024px) {

    .beebee-welcome {
      position: relative;
      z-index: 2;
      border: 0px dashed blue;
      width: 80%;
    }

    #message-question {
      text-align: center;
      padding: 2em;
      border-radius: 30%;
      background-color: aliceblue;
      background-color: rgba(204, 204, 204, 0.5);
    }

    #bb-features {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2em;
      justify-content: center;
    }

    .message-bb {
      display: grid;
      border: 1px solid rgb(0, 13, 255);
      box-shadow: 8px 8px 8px 1px rgb(238, 215, 172);
      justify-content: center;
    }

    .message-bb header {
      display: grid;
      justify-content: center;
      padding-top: 1em;
    }

    .message-learn {
      padding: 2em;
      overflow-wrap: break-word;
    }

  }
</style>