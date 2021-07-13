<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { getCookie } from "./utils/cookie";
import CanvasNest from 'canvas-nest.js';

const config = {
  color: '151,168,190',
  pointColor: '0,0,0',
  count: 350,
  opacity: 1,
  zIndex: -9999
};

export default {
  name: 'App',
  mounted() {
    if (this.$store.state.navBarActiveModule.activeIndex === '') {
      this.$store.dispatch("actionUpdateActiveIndex", getCookie("navBarActiveIndex"))
    }
    new CanvasNest(document.getElementById("app"), config);
  }
}
</script>

<style>
</style>
