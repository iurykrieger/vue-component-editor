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
  border: none;
  width: 100%;
  max-height: 90%;
}
</style>
