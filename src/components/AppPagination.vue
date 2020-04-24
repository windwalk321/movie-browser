<template>
  <div class="pagination">
    <div class="pagination__left">
      <router-link v-if="page > 1" :to="{ params: {page: page - 1 }}">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </router-link>
      <a v-else class="disabled">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </a>
    </div>
    <div class="pagination__mid">
      <router-link v-if="this.rangeStart !== 1" :to="{ params: { page: 1 }}">1</router-link>
      <span v-if="this.rangeStart !== 1">...</span>
      <router-link
        class="pages"
        v-for="(page, index) in pages"
        :key="index"
        :to="{ params: { page: page }}"
      >
        {{ page }}
      </router-link>
      <span v-if="this.rangeEnd < this.maxPage">...</span>
      <router-link
        v-if="this.rangeEnd < this.maxPage"
        :to="{ params: { page: maxPage }}"
      >
        {{ maxPage }}
      </router-link>
    </div>
    <div class="pagination__right">
      <router-link v-if="hasMore" :to="{ params: { page: page + 1 }}">
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </router-link>
      <a v-else class="disabled">
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    maxPage: Number
  },

  data: function () {
    return {
      pageRange: 2
    }
  },

  computed: {
    page () {
      return Number(this.$route.params.page) || 1
    },

    hasMore () {
      return this.page < this.maxPage
    },

    pages () {
      const pages = []

      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i)
      }

      return pages
    },

    rangeStart () {
      const start = this.page - this.pageRange

      return (start > 0) ? start : 1
    },

    rangeEnd () {
      const end = this.page + this.pageRange

      return (end < this.maxPage) ? end : this.maxPage
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
  background-color: #fff;
  bottom: 0;
  left: 0;
  padding: 10px 0;
  @media (max-width: 576px) {
    justify-content: space-between;
  }
  .pagination__mid {
    display: flex;
    @media (max-width: 576px) {
      display: none;
    }
  }
  .router-link-active {
    color: #ff8b00;
    border: #ff8b00 1px solid ;
  }
  .disabled {
    color: #dee2e6;
  }
  span {
    display: flex;
    align-items: flex-end;
    color: #969696;
  }
  a {
    color: #969696;
    padding: 5px 8px;
    border: transparent 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    &:hover {
      color: #ff8b00;
    }
  }
}
</style>
