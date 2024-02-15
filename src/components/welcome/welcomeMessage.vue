<template>
  <div class="beebee-welcome" v-if="storeAI.startChat === true">
    <div id="message-question">
      <h1 class="welcome-message">Welcome to H2P :</h1>
      <div class="sub-message">Holistic Health Practitioner</div>
    </div>
    <div id="bb-features">
      <div class="message-bb">
        <header>AI health agent</header>
        <div class="message-learn">
          Patient centric research & health analysis using graphical tools.
        </div>
      </div>
      <div class="message-bb">
        <header>Personalised Communication</header>
        <div class="message-learn">
          Present personalised visualisation and content to each patient
        </div>
      </div>
      <div class="message-bb">
        <header>Secure Data</header>
        <div class="message-learn">
          Keep patient data secure and private.
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
  color: whitesmoke;
}

.sub-message {
  color: whitesmoke;  
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