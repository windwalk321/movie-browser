<template>
  <div class="app-toolbar">
    <ul :class="{ active: isMobileMenu }" class="mobile">
      <li
        v-for="(item, index) in routeList"
        :key="index"
        class="mobile__item"
        @click="isMobileMenu = false"
      >
        <router-link class="mobile__link" :to="item.key">{{ item.title }}</router-link>
      </li>
    </ul>
    <div class="mobile-overlay" @click="isMobileMenu = false" :class="{ active: isMobileMenu }"></div>
    <div class="app-toolbar__container">
      <button @click="toggleMobileMenu" class="hamburger-box">
        <div class="hamburger" :class="{ active: isMobileMenu }">
          <span></span>
        </div>
      </button>
      <router-link class="logo" to="/">
        <font-awesome-icon class="logo__icon" :icon="['fas', 'play-circle']"/>
        <span class="logo__title">fanmovies</span>
      </router-link>
      <ul class="navigation">
        <li
          v-for="(item, index) in routeList"
          :key="index"
          class="navigation__item"
        >
          <router-link class="navigation__link" :to="item.key">{{ item.title }}</router-link>
        </li>
      </ul>
      <app-toolbar-search />
      <a
        href="https://github.com/obscureguess/movie-browser"
        class="source"
        target="_blank"
      >
        <font-awesome-icon class="source__icon" :icon="[ 'fab', 'github' ]" />
        <span class="source__title">Github</span>
      </a>
    </div>
  </div>
</template>

<script>
import AppToolbarSearch from './AppToolbarSearch'

export default {
  name: 'AppToolbar',

  components: { AppToolbarSearch },

  data: function () {
    return {
      isMobileMenu: false,
      routeList: [
        {
          title: 'Popular',
          key: '/popular'
        },
        {
          title: 'Now playing',
          key: '/now'
        },
        {
          title: 'Top rated',
          key: '/top'
        },
        {
          title: 'Upcoming',
          key: '/upcoming'
        }
      ]
    }
  },

  methods: {
    toggleMobileMenu () {
      this.isMobileMenu = !this.isMobileMenu
    }
  }
}
</script>

<style lang="scss" scoped>
.app-toolbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 54px;
  background-color: #151515;
  z-index: 1;
  @media (max-width: 540px) {
    height: 50px;
  }
  .mobile {
    position: fixed;
    z-index: 9;
    width: 270px;
    left: -100%;
    top: 54px;
    transition: all 0.4s ease;
    height: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: #151515;
    @media (max-width: 540px) {
      top: 50px;
    }
    .mobile__item {
      position: relative;
      height: 36px;
      border-top: 1px solid #565656;
      &:last-child {
        border-bottom: 1px solid #ff8b00;
      }
      .mobile__link {
        position: absolute;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 0 0 20px;
        height: 100%;
        text-decoration: none;
        color: #ececec;
      }
    }
  }
  .mobile.active {
    left: 0;
  }
  .mobile-overlay {
    background: rgba(0,0,0,.5);
    position: fixed;
    width: 100%;
    height: 100%;
    visibility: hidden;
    transition: opacity .4s ease;
    opacity: 0;
  }
  .mobile-overlay.active {
    visibility: visible;
    opacity: 1;
    z-index: 6;
  }
  &__container {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding: 0 30px;
    color: #fff;
    @media (max-width: 992px) {
      padding: 0;
    }
    .hamburger-box {
      display: none;
      background-color: transparent;
      border: none;
      outline: none;
      height: 100%;
      padding: 0 11px;
      margin-right: 5px;
      z-index: 6;
      border-right: 1px solid #565656;
      border-left: 1px solid #565656;
      @media (max-width: 992px) {
        display: block;
      }
      @media (max-width: 540px) {
        padding: 0 9px;
      }
      .hamburger {
        display: block;
        position: relative;
        width: 30px;
        height: 21px;
        span {
          position: absolute;
          background-color: #fff;
          left: 0;
          width: 100%;
          height: 3px;
          top: 9px;
          transition: all .4s ease;
        }
        &::before, &::after {
          content: '';
          background-color: #fff;
          position: absolute;
          width: 100%;
          height: 3px;
          left: 0;
          transition: all .4s ease;
        }
        &::before {
          top: 0;
        }
        &::after {
          bottom: 0;
        }
      }
      .hamburger.active {
        span {
          transform: scale(0);
        }
        &::before {
          transform: rotate(225deg);
          top: 9px;
        }
        &::after {
          transform: rotate(315deg);
          bottom: 9px;
        }
      }
    }
    .logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      z-index: 5;
      color: #fff;
      &__icon {
        color: #ff8b00;
        font-size: 40px;
      }
      &__title {
        font-size: 26px;
        font-family: 'Acme', sans-serif;
        margin-left: 4px;
      }
    }
    .navigation {
      display: flex;
      list-style: none;
      height: 100%;
      z-index: 5;
      @media (max-width: 992px) {
       display: none;
      }
      &__item {
        margin-left: 26px;
        &:first-child {
          margin-left: 0;
        }
      }
      &__link {
        display: flex;
        align-items: center;
        height: 100%;
        text-decoration: none;
        color: #fff;
        transition: color .15s ease-out;
        &:hover {
          color: #ff8b00;
        }
      }
    }
    .source {
      margin-left: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 110px;
      text-decoration: none;
      border-right: 1px solid #565656;
      border-left: 1px solid #565656;
      color: #565656;
      font-size: 0.8em;
      @media (max-width: 992px) {
        width: 54px;
      }
      @media (max-width: 540px) {
        width: 50px;
      }
      &__title {
        color: #969696;
        margin-left: 16px;
        @media (max-width: 992px) {
          display: none;
        }
      }
      &__icon {
        font-size: 24px;
      }
      &:hover {
        color: #ff8b00;
        .source__title {
          color: #ff8b00;
        }
      }
    }
  }
}
</style>
