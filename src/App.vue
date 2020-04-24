<template>
  <div id="app">
    <app-toolbar />
    <router-view/>
  </div>
</template>

<script>
import AppToolbar from './components/AppToolbar'

export default {
  components: { AppToolbar }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  background: rgb(60,10,94);
  background: linear-gradient(90deg, rgba(60,10,94,1) 0%, rgba(11,13,14,1) 50%, rgba(60,10,94,1) 100%);
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 54px;
  @media (max-width: 576px) {
    padding-top: 50px;
  }
}
</style>
