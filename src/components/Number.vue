<template>
  <span>{{ formattedNumber }}</span>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Number",
  props: {
    /**
     * Setting the value
     */
    value: {
      type: Number,
      required: true
    },
    /**
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
     * Number format. Can be "decimal", "currency" or "percent"
     */
    format: {
      type: String,
      default: "decimal",
      validator: style => ["decimal", "percent", "currency"].includes(style)
    }
  },
  computed: {
    ...mapState({
      currency: state => state.i18n.currency,
      currencyDisplay: state => state.i18n.currencyDisplay,
      locale: state => state.i18n.locale
    }),
    formattedNumber() {
      try {
        const value = this.format === "percent" ? this.value / 100 : this.value;
        return value.toLocaleString(this.locale, {
          style: this.format,
          currency: this.currency,
          currencyDisplay: this.currencyDisplay
        });
      } catch (error) {
        return this.value.toString();
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
