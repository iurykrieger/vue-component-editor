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

<style type="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
