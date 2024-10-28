<template>
  <div id="">
    Social Graph please
    <div id="graph-container"></div>
  </div>
</template>

<script setup>
import Graph from "graphology"
import Sigma from "sigma"
import { ref, computed, onMounted } from 'vue'

  /* on mount */
  onMounted(() => {
    drawbentoGraph()
  })


  /* methods */
  const drawbentoGraph = () => {
    const graph = new Graph()
    graph.addNode("1", { label: "Node 1", x: 0, y: 0, size: 10, color: "blue" })
    graph.addNode("2", { label: "Node 2", x: 1, y: 1, size: 20, color: "red" })
    graph.addEdge("1", "2", { size: 5, color: "purple" })

    let peerGraph = document.getElementById("graph-container")
    console.log(peerGraph)
    const sigmaInstance = new Sigma(graph, peerGraph)
  }

</script>

<style scoped>

#graph-container {
  height: 30vh;
  width: 80vw;
}


@media (min-width: 1024px) {
 
  #graph-container {
    height: 30vh;
    width: 80vw;
  }

}

</style>