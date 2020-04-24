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
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 54px;
  @media (max-width: 540px) {
    padding-top: 50px;
  }
}

* {
  box-sizing: border-box;
}
</style>
