<template>
  <div class="movie-list">
    <div class="movie-list__content" v-if="isLoaded">
      <div class="movies">
        <movie-list-item
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          :genres="genres"
        />
      </div>
      <app-pagination :maxPage="maxPage" />
    </div>
    <div v-else class="spinner">
      <font-awesome-icon :icon="['fas', 'spinner']" size="3x" spin />
    </div>
  </div>
</template>

<script>
import MovieListItem from '../components/MovieListItem'
import AppPagination from '../components/AppPagination'

export default {
  components: {
    MovieListItem,
    AppPagination
  },

  props: {
    type: String
  },

  data: function () {
    return {
      isLoaded: false,
      tmdbKey: '0b4539da1961c9e4d049f757c9b5e940',
      baseURL: 'https://api.themoviedb.org/3',
      moviesData: {},
      genres: []
    }
  },

  computed: {
    movies () {
      return this.moviesData.results
    },

    maxPage () {
      return this.moviesData.total_pages
    }
  },

  methods: {
    getMoviesData () {
      const page = this.$route.params.page

      return this.$http
        .get(`${this.baseURL}/movie/${this.type}?api_key=${this.tmdbKey}&page=${page}`)
        .then(response => {
          this.moviesData = response.data
        })
        .catch(error => console.log(error))
    },

    getGenres () {
      return this.$http
        .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.tmdbKey}`)
        .then(response => {
          this.genres = response.data.genres
        })
        .catch(error => console.log(error))
    }
  },

  created: async function () {
    await this.getGenres()
    await this.getMoviesData()
    this.isLoaded = true
  },

  watch: {
    $route: async function () {
      this.isLoaded = false
      await this.getMoviesData()
      this.isLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-list__content {
  position: relative;
  padding: 10px 10px 48px 10px;
  max-width: 1200px;
  margin: 30px auto;
  padding: 0 30px 50px 30px;
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
.spinner {
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>
