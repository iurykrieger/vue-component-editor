<template>
  <div class="rating">
    <span class="rating-stars">
      <span class="rating-fill" :style="ratingWidth"></span>
    </span>
    <span v-if="count" class="rating-count">(<Number :value="count" />)</span>
  </div>
</template>

<script>
import NumberFormatter from "@/components/Number";

export default {
  name: "Rating",
  components: {
    Number: NumberFormatter
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    best: {
      type: Number,
      default: 5
    },
    count: {
      type: Number
    }
  },
  computed: {
    ratingWidth() {
      return {
        width: `${(this.value / this.best) * 100}%`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.rating-stars {
  background: url(../assets/rating.png) no-repeat 0 1px;
  height: 14px;
  width: 66px;
  display: inline-block;
}

.rating-fill {
  display: block;
  background: url(../assets/rating.png) no-repeat 0 100%;
  height: 14px;
}

.rating-count {
  font-size: 0.8em;
}
</style>
