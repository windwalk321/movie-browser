<template>
  <div class="search">
    <div class="search__content" v-if="isLoaded">
      <span class="search__title">Searching results</span>
      <div class="search__input">
        <input
          type="text"
          placeholder="Search..."
          v-model.trim="search"
          @keypress.enter="searchHandler"
        >
        <button @click="searchHandler">Start searching</button>
      </div>
      <ul class="search__items" v-if="results.length">
        <li
          class="search__item"
          v-for="item in results"
          :key="item.id"
        >
          <img
            v-if="item.poster_path"
            :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`"
            class="poster"
          >
          <img v-else src="../assets/empty-poster.png" class="poster">
          <div class="info">
            <router-link
              tag="span"
              :to="{ name: 'movie', params: { id: item.id } }"
              class="info__title"
            >
              {{ item.original_title }}
            </router-link>
            <span class="info__release">{{ item.release_date }}</span>
            <span class="info__rating">IMDb: {{ item.vote_average }}</span>
            <p class="info__description">{{ item.overview }}</p>
          </div>
        </li>
      </ul>
      <app-pagination v-if="maxPage > 1" :maxPage="maxPage" />
    </div>
    <div v-else class="spinner">
      <font-awesome-icon :icon="['fas', 'spinner']" size="3x" spin />
    </div>
  </div>
</template>

<script>
import AppPagination from '../components/AppPagination'

export default {
  name: 'Search',

  components: {
    AppPagination
  },

  data: function () {
    return {
      isLoaded: false,
      search: '',
      searchData: {}
    }
  },

  computed: {
    results () {
      return this.searchData.results || []
    },

    maxPage () {
      return this.searchData.total_pages
    }
  },

  methods: {
    searchHandler () {
      if (this.search.length >= 3) {
        this.$router.replace({ name: 'search', params: { filter: this.search, page: 1 } }).catch(error => console.info(error))
      }
    },

    getSearchData () {
      const tmdbKey = '0b4539da1961c9e4d049f757c9b5e940'
      const baseURL = 'https://api.themoviedb.org/3'
      const page = this.$route.params.page
      const filter = this.$route.params.filter

      return this.$http
        .get(`${baseURL}/search/movie?api_key=${tmdbKey}&query=${filter}&page=${page}`)
        .then(response => {
          this.searchData = response.data
        })
        .catch(error => console.log(error))
    }
  },

  created: async function () {
    await this.getSearchData()
    this.search = this.$route.params.filter
    this.isLoaded = true
  },

  watch: {
    $route: async function () {
      this.isLoaded = false
      await this.getSearchData()
      this.isLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
.search__content {
  background-color: #1D1D1D;
  position: relative;
  padding: 10px 30px 50px 30px;
  max-width: 1200px;
  margin: 30px auto;
  @media (max-width: 992px) {
    padding: 10px 10px 48px 10px;
  }
  .search__title {
    font-size: 1.8rem;
    line-height: 2.4rem;
    color: #e7e7e7;
    font-weight: 500;
  }
  .search__input {
    margin: 20px 0 30px 0;
    display: flex;
    input {
      flex: 0 1 340px;
      padding: 10px 10px;
      color: #e7e7e7;
      font-size: .8rem;
      outline: none;
      background-color: transparent;
      border: 1px solid #4b4b4b;
      &:focus {
        border: 1px solid #ff8b00;
      }
      &::placeholder {
        color: #969696;
      }
    }
    button {
      background-color: transparent;
      color: #ff8b00;
      border: 1px solid #ff8b00;
      font-size: .8rem;
      outline: none;
      padding: 0 30px;
      min-width: 110px;
      margin-left: 20px;
      transition: all .2s ease;
      cursor: pointer;
      &:hover {
        background-color: #ff8b00;
        color: #fff;
      }
      @media (max-width: 576px) {
        padding: 0 10px;
        margin-left: 10px;
      }
    }
  }
  .search__items {
    margin: 0;
    display: flex;
    flex-direction: column;
    padding: 0;
  }
  .search__item {
    display: flex;
    border-top: 1px solid #565656;
    padding: 20px 0;
    @media (max-width: 576px) {
      flex-direction: column;
    }
    .poster {
      max-width: 200px;
      align-self: start;
      @media (max-width: 576px) {
        align-self: center;
      }
    }
    .info {
      color: #969696;
      margin: 0 0 0 20px;
      display: flex;
      align-items: start;
      flex-direction: column;
      @media (max-width: 576px) {
        margin: 10px 0 0 0;
      }
      &__title {
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        transition: color 0.15s ease-out;
        &:hover {
          color: #ff8b00;
        }
      }
      &__release {
        font-size: 18px;
      }
      &__rating {
        font-size: 18px;
      }
      &__description {
        color: #b8b8b8;
      }
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
