<template>
  <section id="component-editor">
    <Widget />
  </section>
</template>

<script>
import Widget from "@/components/Widget";

export default {
  name: "ComponentEditor",
  components: {
    Widget
  }
};
</script>

<style lang="scss" scoped>
#component-editor {
  max-width: 1024px;
  margin: 0 auto;
}
</style>
