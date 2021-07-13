<template>
  <div class="layout">
    <nav-bar class="nav-bar"></nav-bar>
    <main-app class="main-app"></main-app>
  </div>
</template>

<script>
import NavBar from "./components/navBar"
import MainApp from "./components/mainApp"

export default {
  name: "index",
  components: {
    NavBar,
    MainApp
  }
}
</script>

<style scoped>

  .main-app {
    margin-bottom: 40px;
  }

</style>