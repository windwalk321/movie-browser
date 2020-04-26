<template>
  <div class="app-toolbar-search">
    <div
      class="overlay"
      @click="removeFocus"
      :class="{ active: isFocused }"
    ></div>
    <div class="actions" :class="{ focused: isFocused }">
      <button class="actions__focus" @click="setFocus">
        <font-awesome-icon :icon="['fas', 'search']" />
      </button>
      <input
        type="text"
        class="actions__input"
        placeholder="Search"
        ref="search"
        v-model.trim="search"
        @keypress.enter="searchHandler"
        @input="searchHandler"
        @click="isFocused = true"
      >
      <button class="actions__close" @click="removeFocus">
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
    </div>
    <div class="response" :class="{ visible: isResponse}">
      <ul class="movies" v-show="results.length">
        <li
          class="movies__item"
          v-for="item in results"
          :key="item.id"
        >
          <div class="poster">
            <img
              v-if="item.poster_path"
              :src="`https://image.tmdb.org/t/p/w500/${item.poster_path}`"
            >
            <img
              v-else
              src="../assets/empty-poster.png"
            >
          </div>
          <div class="info">
            <span @click="replaceRoute({ name: 'movie', params: { id: item.id }})" class="info__title">{{ item.original_title }}</span>
            <span class="info__release">{{ item.release_date }}</span>
            <span class="info__rating">IMDb: {{ item.vote_average }}</span>
            <p class="info__description">{{ item.overview }}</p>
          </div>
        </li>
      </ul>
      <button @click="replaceRoute({ name: 'search', params: { filter: search, page: 1 } })" class="button">
        <span v-if="results.length">Watch more</span>
        <span v-else>Nothing found</span>
      </button>
    </div>
  </div>
</template>

<script>
// fix vh bug on mobile devices
window.addEventListener('resize', () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
})

export default {
  name: 'AppToolbarSearch',

  data: function () {
    return {
      isFocused: false,
      isResponse: false,
      search: '',
      searchData: {}
    }
  },

  computed: {
    results () {
      return this.searchData.results || []
    }
  },

  methods: {
    getSearchData () {
      const tmdbKey = '0b4539da1961c9e4d049f757c9b5e940'
      const baseURL = 'https://api.themoviedb.org/3'

      return this.$http
        .get(`${baseURL}/search/movie?api_key=${tmdbKey}&query=${this.search}`)
        .then(response => {
          this.searchData = response.data
        })
        .catch(error => console.log(error))
    },

    removeFocus: function () {
      this.search = ''
      this.searchData = {}
      this.isFocused = false
      this.isResponse = false
    },

    setFocus: function () {
      if (!this.isFocused) {
        this.$refs.search.focus()
        this.isFocused = true
      } else {
        this.replaceRoute({ name: 'search', params: { filter: this.search, page: 1 } })
      }
    },

    async replaceRoute (route) {
      await this.$router.replace(route).catch(error => console.info(error))
      this.isResponse = false
      this.isFocused = false
      this.search = ''
    },

    async searchHandler () {
      if (this.search.length >= 3) {
        await this.getSearchData()
        this.isResponse = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-toolbar-search {
  position: absolute;
  top: 0;
  height: 100%;
  right: 140px;
  left: 190px;
  @media (max-width: 992px) {
    right: 74px;
    left: 249px;
  }
  @media (max-width: 768px) {
    right: 54px;
    left: 0;
  }
  @media (max-width: 576px) {
    right: 50px;
  }
  .overlay {
    background: rgba(0,0,0,.5);
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    visibility: hidden;
    opacity: 0;
    transition: opacity .4s ease-out;
  }
  .overlay.active {
    opacity: 1;
    visibility: visible;
    z-index: 9;
  }
  .actions {
    position: relative;
    margin-left: auto;
    width: 110px;
    height: 100%;
    background-color: #151515;
    border-left: 1px solid #565656;
    transition: all 0.2s ease-out;
    @media (max-width: 768px) {
      width: 54px;
    }
    @media (max-width: 576px) {
      width: 50px;
    }
    &:hover {
      .actions__input::placeholder {
        color: #ff8b00;
      }
      .actions__focus {
        color: #ff8b00;
      }
    }
    &__focus {
      position: absolute;
      width: 54px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 100%;
      outline: none;
      background: transparent;
      border: none;
      font-size: 22px;
      color: #565656;
      @media (max-width: 576px) {
        width: 50px;
      }
    }
    &__input {
      height: 100%;
      width: 100%;
      padding: 0 16px 0 50px;
      background: transparent;
      border: none;
      outline: none;
      color: #fff;
      &::placeholder {
        color: #969696;
      }
      &::-webkit-input-placeholder {
        font-size: .8em;
      }
      &::-ms-input-placeholder {
        transform: scale(.8) translateX(-.2em);
      }
    }
    &__close {
      visibility: hidden;
      position: absolute;
      right: 0;
      top: 0;
      width: 50px;
      border: none;
      outline: none;
      background: transparent;
      height: 100%;
      color: #565656;
      font-size: 22px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
  .actions.focused {
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 99;
    .actions__close {
      visibility: visible;
    }
  }
  .response {
    position: absolute;
    visibility: hidden;
    display: flex;
    flex-direction: column;
    right: 0;
    top: -100%;
    width: 100%;
    z-index: 9;
    background-color: #1d1d1d;
    transition: top .15s ease-out;
    .movies {
      margin: 0;
      height: calc((var(--vh, 1vh) * 100) - 108px);
      margin-right: 20px;
      padding: 0 20px 0 20px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar-track {
        background-color: #828080;
        margin: 20px 0;
      }
      &::-webkit-scrollbar {
        width: 7px;
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #000000;
        border: 2px solid #828080;
        height: 33.3%;
      }
      @media (max-width: 576px) {
        margin-right: 10px;
        padding: 0 10px 0 10px;
        height: calc((var(--vh, 1vh) * 100) - 104px);
      }
      &__item {
        display: -webkit-flex;
        display: flex;
        border-bottom: 1px solid #565656;
        padding: 20px 0;
        @media (max-width: 576px) {
          flex-direction: column;
        }
        .poster {
          align-self: start;
          max-width: 200px;
          @media (max-width: 576px) {
            align-self: center;
          }
          img {
            width: 100%;
          }
        }
        .info {
          display: flex;
          flex-direction: column;
          color: #969696;
          margin: 0 0 0 20px;
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
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 54px;
      border: none;
      background: linear-gradient(90deg, #fc9929 0, #f88901);
      color: #fff;
      font-weight: 500;
      cursor: pointer;
      letter-spacing: 1px;
    }
  }
  .response.visible {
    visibility: visible;
    top: 100%;
  }
}
</style>
