<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import 'normalize-scss';
@include normalize();

a {
  text-decoration: none;
  color: $text-color;
  font-weight: bold;

  &:hover {
    color: $hover-color;
  }
}

#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
  background-color: $background-color;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: $hover-color;
    &.router-link-exact-active {
      color: $action-color;
    }
  }
}
</style>
