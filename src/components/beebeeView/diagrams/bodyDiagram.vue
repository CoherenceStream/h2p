<template>
  <div id="body-diagram-parts">
    Human body navigation
    <!--<img class="right-display-menu" src="@/assets/human-diagram.png" alt="human body">-->
    <canvas id="human-canvas" width="600px" height="900px" @click="bodypartSelect($event)"></canvas>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import picBody from '@/assets/human-diagram.png'

  let bodycanvas = ref(null)
  let canvas = ref({})
  let ctx = ref({})

  /* on mount */
  onMounted(() => {
    drawBodyImage()
  })


  const drawBodyImage = () => {
    canvas = document.getElementById('human-canvas')
    console.log(canvas)
    console.log(canvas.width)
    console.log(canvas.height)
    ctx = canvas.getContext("2d")
    const image = new Image()
    let imageD = picBody
    image.src = imageD // 'https://www.bentoboxds.org/assets/logo-CQ0an4it.png'
    image.onload = () => {
       ctx.drawImage(image, 0, 0, image.width * 1.4, image.height * 1.4)
    }
  }

  const bodypartSelect = (ev) => {
    console.log('--canvas pos')
    // get mouse position 
    let mouseLoc = offSetCalc(ev)
    console.log('mouse pos')
    console.log(mouseLoc)
    // ctx.beginPath()
    // ctx.fillRect(mouseLoc.x, mouseLoc.y, 10, 10)
    // ctx.fillStyle = 'blue'
    // ctx.fill()
    // ctx.stroke()
    const pointColour = ctx.getImageData(mouseLoc.x, mouseLoc.y, 2, 2).data
    console.log(pointColour)
    function rgbToHex(r, g, b) {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }
    let hexColor = rgbToHex(pointColour[0], pointColour[1], pointColour[2])
    console.log(hexColor)
    if (hexColor === '#e2552a' || hexColor === '#f05f22' || hexColor === '#f26522') {
      console.log('guts')
    } else if (hexColor === '#fd1e32' || hexColor === '#f4e9d7') {
      console.log('heart')
    }
  }

  const offSetCalc = (ev) => {
    let x = 0
    let y = 0
    var offsetX = 0, offsetY = 0
    let element = canvas
    if (element.offsetParent) {
      do {
        offsetX += element.offsetLeft
        offsetY += element.offsetTop
      } while ((element = element.offsetParent))
    }
    x = ev.pageX - offsetX
    y = ev.pageY - offsetY
    let mousePos = {}
    mousePos.x = x
    mousePos.y = y
    return mousePos
  }

</script>


<style scoped>
#body-diagram-parts {
  display: grid;
  grid-template-columns: 1fr;
}

#human-canvas {
  display: block;
  /*background-image: url("@/assets/human-diagram.png");
  background-repeat: no-repeat; */
  width: 600px;
  height: 900px;
}


@media (min-width: 1024px) {
  #body-diagram-parts {
    display: block;
  }

  #human-canvas {
    display: block;
    width: 600px;
    height: 900px;
    /*background-image: url("@/assets/human-diagram.png");
    background-repeat: no-repeat; */
    z-index: 88;
  }
}

</style>