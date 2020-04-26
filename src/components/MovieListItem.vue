<template>
  <router-link
    class="movies__item"
    tag="div"
    :to="{ name: 'movie', params: { id: movie.id }}"
  >
    <img
      class="poster"
      v-if="movie.poster_path"
      :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
    >
    <img
      class="poster"
      v-else
      src="../assets/empty-poster.png"
    >
    <div class="card-body">
      <span class="title">{{ movie.title }}</span>
      <span class="rating">{{ movie.vote_average }}</span>
      <p class="genres">{{ movieGenres }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'MovieListItem',

  props: {
    movie: Object,
    genres: Array
  },

  computed: {
    movieGenres () {
      const genresString = this.movie.genre_ids
        .map(id => {
          const item = this.genres.find(item => item.id === id)
          return item ? item.name : null
        })
        .join(', ')

      return genresString
    }
  }
}
</script>

<style lang="scss" scoped>
.movies__item {
  color: #fff;
  background-color: #000;
  margin: 10px;
  width: calc(20% - 20px);
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, .35);
  cursor: pointer;
  transition: all .15s ease-in-out;
  @media (max-width: 992px) {
    width: calc(25% - 20px);
  }
  @media (max-width: 768px) {
    width: calc(33.333% - 20px);
  }
  @media (max-width: 576px) {
    width: calc(50% - 20px);
  }
  @media (max-width: 420px) {
    width: 90%;
  }
  &:hover {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, .30);
    .card-body .title {
      color: #ff8b00;
    }
  }
  .poster {
    width: 100%;
  }
}

.card-body {
  position: relative;
  padding: 10px 40px 10px 10px;
  .rating {
    position: absolute;
    top: 7px;
    right: 7px;
    border: 2px solid #ff8b00;
    font-size: 13px;
    color: #ff8b00;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .genres {
    font-size: 12px;
    color: #b8b8b8;
  }
}
</style>
