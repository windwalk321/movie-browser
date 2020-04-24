<template>
  <div class="container">
    <div class="movies">
      <movie-list-item
        v-for="movie in movies"
        :key="movie.id"
        :movie="movie"
        :genres="genres"
      />
    </div>
  </div>
</template>

<script>
import MovieListItem from '../components/MovieListItem'

export default {
  components: {
    MovieListItem
  },

  props: {
    type: String
  },

  data: function () {
    return {
      tmdbKey: '0b4539da1961c9e4d049f757c9b5e940',
      baseURL: 'https://api.themoviedb.org/3',
      moviesData: {},
      genres: []
    }
  },

  computed: {
    movies () {
      return this.moviesData.results
    }
  },

  methods: {
    getMoviesData () {
      const page = this.$route.params.page

      this.$http
        .get(`${this.baseURL}/movie/${this.type}?api_key=${this.tmdbKey}&page=${page}`)
        .then(response => {
          this.moviesData = response.data
        })
    },

    getGenres () {
      this.$http
        .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.tmdbKey}`)
        .then(response => {
          this.genres = response.data.genres
        })
    }
  },

  created: async function () {
    await this.getGenres()
    this.getMoviesData()
  },

  watch: {
    $route: 'getMoviesData'
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  padding: 10px 10px 48px 10px;
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 30px;
  background-color: #fff;
  .movies {
    display: flex;
    flex-wrap: wrap;
    margin: -10px;
    @media (max-width: 420px) {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
