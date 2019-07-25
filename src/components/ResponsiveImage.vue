<template>
  <img :src="src" :alt="alt" />
</template>

<script>
export default {
  name: "ResponsiveImage",
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String
    }
  }
};
</script>

<style scoped type="scss">
img {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
