<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/component-editor">Component Editor</router-link>
    </div>
    <router-view id="content" />
  </div>
</template>

<style lang="scss">
@import 'normalize-scss';
@include normalize();

a {
  text-decoration: none;
  color: $text-color;

  &:hover {
    color: $hover-color;
  }
}
</style>

<style lang="scss" scoped>
body {
  background-color: $background-color;
}

#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text-color;
}

#nav {
  background-color: #fff;
  position: fixed !important;
  z-index: 1;
  overflow: auto;
  height: 100%;
  width: 20%;
  box-shadow: $box-shadow;

  a {
    font-weight: bold;
    color: $hover-color;
    &.router-link-exact-active {
      color: $action-color;
    }
  }
}

#content {
  margin-left: 20%;
  position: fixed;
}
</style>
