<template>
  <div class="home">
    <h1>Home page</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',

  methods: {
    getMoviesData () {
      const tmdbKey = '0b4539da1961c9e4d049f757c9b5e940'
      const baseURL = 'https://api.themoviedb.org/3'

      this.$http
        .get(`${baseURL}/movie/popular?api_key=${tmdbKey}`)
        .then((response) => {
          console.log(response.data)
        })
    }
  },

  created: function () {
    this.getMoviesData()
  }
}
</script>
