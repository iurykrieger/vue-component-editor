<template>
  <div class="home">
    <Widget />
  </div>
</template>

<script>
import Widget from "@/components/Widget";

export default {
  name: "Home",
  components: {
    Widget
  }
};
</script>

<style lang="scss" scoped>
.home {
  max-width: 900px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .home {
    width: calc(100% - 22px);
  }
}
</style>
