<template>
  <div v-if="isLoaded" class="movie">
    <div class="movie__info">
      <img
        v-if="movie.poster_path"
        :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
        class="poster"
      >
      <img v-else src="../assets/empty-poster.png" class="poster">
      <ul class="description">
        <li>
          <span class="label">
            Original title:
          </span>
          <span class="text">
            {{ movie.original_title }}
          </span>
        </li>
        <li v-if="movie.tagline">
          <span class="label">
            Tagline:
          </span>
          <span class="text">
            {{ movie.tagline }}
          </span>
        </li>
        <li>
          <span class="label">
            Rating IMDb:
          </span>
          <span class="text">
            {{ movie.vote_average }}
          </span>
        </li>
        <li v-if="movie.genres">
          <span class="label">
            Genres:
          </span>
          <span class="text">
            {{ genresStr }}
          </span>
        </li>
        <li>
          <span class="label">
            Release date:
          </span>
          <span class="text">
            {{ movie.release_date }}
          </span>
        </li>
        <li>
          <span class="label">
            Duration:
          </span>
          <span class="text">
            {{ durationStr }}
          </span>
        </li>
        <li v-if="movie.budget">
          <span class="label">
            Budget:
          </span>
          <span class="text">
            {{ budgetStr }} $
          </span>
        </li>
        <li>
          <span class="label">
            Status:
          </span>
          <span class="text">
            {{ movie.status }}
          </span>
        </li>
        <li v-if="movie.production_countries">
          <span class="label">
            Production:
          </span>
          <span class="text">
            {{ productionStr }}
          </span>
        </li>
      </ul>
    </div>
    <div class="movie__overview">
      <span>Overview  "{{ movie.original_title }}"</span>
      <p>{{ movie.overview }}</p>
    </div>
    <div class="movie__recommendations" v-if="recommendationItems.length">
      <span>Recommendations</span>
      <div class="items">
        <movie-list-item
          v-for="movie in recommendationItems"
          :key="movie.id"
          :movie="movie"
          :genres="genres"
        />
      </div>
    </div>
  </div>
</template>
<script>
import MovieListItem from '../components/MovieListItem'

export default {
  name: 'Movie',

  components: {
    MovieListItem
  },

  data: function () {
    return {
      movie: {},
      recommendations: {},
      genres: [],
      isLoaded: false,
      tmdbKey: '0b4539da1961c9e4d049f757c9b5e940',
      baseURL: 'https://api.themoviedb.org/3'
    }
  },

  computed: {
    movieId () {
      return this.$route.params.id
    },

    genresStr () {
      return this.movie.genres.map(item => item.name).join(', ')
    },

    productionStr () {
      return this.movie.production_countries.map(item => item.iso_3166_1).join(', ')
    },

    budgetStr () {
      return this.movie.budget.toLocaleString()
    },

    durationStr () {
      const runtime = this.movie.runtime
      const h = Math.floor(runtime / 60)

      let m = runtime % 60
      m = m < 10 ? '0' + m : m

      return `${h}h ${m}m`
    },

    recommendationItems () {
      return this.recommendations.results || []
    }
  },

  methods: {
    getMovieData () {
      return this.$http
        .get(`${this.baseURL}/movie/${this.movieId}?api_key=${this.tmdbKey}`)
        .then(response => {
          this.movie = response.data
          console.log('1')
        })
        .catch(error => console.log(error))
    },

    getMovieRecommendations () {
      return this.$http
        .get(`${this.baseURL}/movie/${this.movieId}/recommendations?api_key=${this.tmdbKey}`)
        .then(response => {
          this.recommendations = response.data
          console.log('2')
        })
        .catch(error => console.log(error))
    },

    getGenres () {
      return this.$http
        .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.tmdbKey}`)
        .then(response => {
          this.genres = response.data.genres
          console.log('3')
        })
        .catch(error => console.log(error))
    }
  },

  created: async function () {
    await this.getMovieData()
    await this.getGenres()
    await this.getMovieRecommendations()
    this.isLoaded = true
  },

  watch: {
    $route: async function () {
      this.isLoaded = false
      await this.getMovieData()
      await this.getGenres()
      await this.getMovieRecommendations()
      this.isLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
.movie {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 30px auto;
  background-color: #1D1D1D;
  &__info {
    color: #dee2e6;
    display: flex;
    width: 100%;
    padding: 10px 30px;
    position: relative;
    margin-bottom: 10px;
    @media (max-width: 992px) {
      padding: 10px;
    }
    @media (max-width: 768px) {
      flex-direction: column;
    }
    .poster {
      max-width: 300px;
      align-self: flex-start;
      @media (max-width: 768px) {
        align-self: center;
        margin-bottom: 10px;
      }
    }
    .description {
      width: 100%;
      padding-left: 30px;
      @media (max-width: 768px) {
        padding-left: 0;
      }
      li {
        display: flex;
        margin-bottom: 15px;
        .label {
          min-width: 122px;
          color: #666666;
        }
      }
    }
  }
  &__overview {
    border-top: 1px solid #464747;
    padding: 10px 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    @media (max-width: 992px) {
      padding: 10px;
    }
    span {
      color: #e7e7e7;
      font-size: 1.4rem;
      margin-bottom: 10px;
    }
    p {
      line-height: 1.3rem;
      color: #adadad;
    }
  }
  &__recommendations {
    margin-top: 10px;
    width: 100%;
    background-color: #fff;
    padding: 10px 30px;
    @media (max-width: 992px) {
      padding: 10px;
    }
    span {
      color: #565656;
      display: flex;
      justify-content: center;
      padding: 20px;
      text-transform: uppercase;
      background-color: #fff;
      font-size: 24px;
      margin: -10px;
    }
    .items {
      display: flex;
      flex-wrap: wrap;
      margin: -10px;
      @media (max-width: 420px) {
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
</style>
