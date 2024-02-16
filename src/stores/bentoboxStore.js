import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { aiInterfaceStore } from '@/stores/aiInterface.js'

export const bentoboxStore = defineStore('bentostore', {
  state: () => ({
    storeAI: aiInterfaceStore(),
    historyActive: false,
    chatList: [
      {
        name:'latest', chatid:'12345', active: true
      }
    ],
    spaceList: [
      {
        name:'openspace', spaceid:'91919191', active: true
      }
    ],
    chartStyle: {},
    locationBbox: {},
    boxLocation:
    {
      x: 200,
      y: 200
    },
    locX: 140,
    locY: 140
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    setChartstyle (id, style) {
      this.chartStyle[id] = style
    },
    setBoxlocation (loc) {
      // const tempLoc = {}
      // tempLoc.x = 10
      // tempLoc.y = 10
      this.boxLocation = loc
      this.locX = loc.x
      this.locY = loc.y
    },
    processReply (message) {
      console.log('message bentobox')
      console.log(message)
      // prepare chat menu and pairs
      if (message.reftype.trim() === 'chat-history') {
        if (message.action.trim() === 'start') {
          // set the saved chats for peer
          let chatMenu = []
          for (let cm of message.data) {
            if(cm?.value?.chat) {
              chatMenu.push(cm.value.chat)
            }
            // build datapair
            if (cm?.value?.pair) {
              // is setting for chat or space?
              if ('space' in cm.value !== true ) {
                this.storeAI.historyPair[cm.key] = cm.value.pair
                // loop over boxids for this chat
                let pairCount = 0
                for (let pair of cm?.value?.pair) {
                  this.storeAI.beebeeChatLog[pair.reply.bbid] = true
                  if (cm.value?.visData) {
                    let hopDataChart = {}
                    hopDataChart.datasets = [ { data: cm.value?.visData[pairCount]?.datasets[0]?.data } ]
                    hopDataChart.labels = cm.value?.visData[pairCount]?.labels
                    this.storeAI.visData[pair.reply.bbid] = hopDataChart
                    if (cm.value?.hop !== undefined) {
                      let summaryHOP = cm.value?.hop[0]
                      summaryHOP.bbid = pair.reply.bbid
                      this.storeAI.hopSummary.push({ HOPid: pair.reply.bbid, summary: summaryHOP })
                    }
                  }
                  this.chartStyle[pair.reply.bbid] = 'line'
                  pairCount++
                }
              } else {
                // add to menu list
                this.spaceList.push(cm.value.space)
                this.storeAI.liveBspace = cm.value.space
                if (cm.value.bboxlist.length > 0) {
  
                  this.storeAI.bentoboxList[cm.value.space.spaceid] = cm.value.bboxlist
                  // set the default or save location of box in space
                  for (let bbox of cm.value.bboxlist) {
                    const tW = 440
                    const tH = 440
                    let updateBox = {}
                    updateBox.tW = 480
                    updateBox.tH = 480
                    updateBox.handlers = ref(["r", "rb", "b", "lb", "l", "lt", "t", "rt"])
                    updateBox.left = ref(`calc(2% - ${tW / 2}px)`)
                    updateBox.top = ref(`calc(8% - ${tH / 2}px)`)
                    updateBox.height = ref('fit-content')
                    updateBox.width = ref('fit-content')
                    updateBox.maxW = ref('100%')
                    updateBox.maxH = ref('100%')
                    updateBox.minW = ref('20vw')
                    updateBox.minH = ref('20vh')
                    updateBox.fit = ref(false)
                    updateBox.event = ref('')
                    updateBox.dragSelector = ref('.drag-container-1, .drag-container-2')
                    this.locationBbox[bbox] = updateBox
                  }
                } else {
                  this.storeAI.bentoboxList[cm.value.space.spaceid] = []
                }
              }
            }
            // check for location spaces info. already saved
            if (cm?.value?.location) {
              this.storeAI.bentoboxList[cm.value.spaceid] = cm?.value?.boxlist
              for (let boxsp of cm?.value?.boxlist) {
                for (let cord of cm?.value?.location) {
                  if (cord.bbox === boxsp) {
                    this.locationBbox[boxsp] = cord.coord 
                  }
                } 
              }
            } else {
              console.log('no locat d oroords')
            }
          }
          this.chatList = chatMenu
          // set the chat list live
          this.storeAI.historyList = 'history'
          this.storeAI.chatAttention = this.chatList[0].chatid
          this.storeAI.setupChatHistory(this.chatList[0])
          this.historyActive = true
        } else if (message.action.trim() === 'save') {
          console.log('saved feedback')
        }

      }
    },
    setLocationBbox (bbox) {
      // check not already set
      if (bbox in this.locationBbox) {
      } else {
        const tW = 440
        const tH = 440
        let updateBox = {}
        updateBox.tW = 480
        updateBox.tH = 480
        updateBox.handlers = ref(["r", "rb", "b", "lb", "l", "lt", "t", "rt"])
        updateBox.left = ref(`calc(2% - ${tW / 2}px)`)
        updateBox.top = ref(`calc(8% - ${tH / 2}px)`)
        updateBox.height = ref('fit-content')
        updateBox.width = ref('fit-content')
        updateBox.maxW = ref('100%')
        updateBox.maxH = ref('100%')
        updateBox.minW = ref('20vw')
        updateBox.minH = ref('20vh')
        updateBox.fit = ref(false)
        updateBox.event = ref('')
        updateBox.dragSelector = ref('.drag-container-1, .drag-container-2')
        this.locationBbox[bbox] = updateBox
      }
    },
    saveLayoutSpace (spaceID) {
      // save layout per space
      console.log('current locatio to ba save e ')
      console.log(this.locationBbox)
      // gather info per box
      let boxLocList = []
      for (let bbox of this.storeAI.bentoboxList[spaceID]) {
        let locInfo = this.locationBbox[bbox]
        boxLocList.push({ bbox: bbox, coord: locInfo })
      }
      let spaceInfo = {}
      spaceInfo.spaceid = spaceID
      spaceInfo.boxlist = this.storeAI.bentoboxList[spaceID]
      spaceInfo.location = boxLocList
      let spaceSave = {}
      spaceSave.type = 'bentobox'
      spaceSave.reftype = 'space-history'
      spaceSave.action = 'save-position'
      spaceSave.data = spaceInfo
      spaceSave.bbid = ''
      console.log(spaceSave)
      this.storeAI.sendMessageHOP(spaceSave)
    }
  }
})
