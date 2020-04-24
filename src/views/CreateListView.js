import MovieList from './MovieList.vue'

export default function createListView (type, name) {
  return {
    name: `${name}-movie-view`,

    render (h) {
      return h(MovieList, { props: { type } })
    }
  }
}
