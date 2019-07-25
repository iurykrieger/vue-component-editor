<template>
  <div class="product" itemtype="http://schema.org/Product" itemscope>
    <ResponsiveImage itemprop="image" :src="thumbnail" />
    <meta itemprop="sku" :content="sku" />
    <meta itemprop="description" :content="description" />
    <div
      v-if="rating"
      itemprop="aggregateRating"
      itemscope
      itemtype="http://schema.org/AggregateRating"
    >
      <meta itemprop="ratingValue" :content="rating.value" />
      <meta itemprop="bestRating" :conent="rating.best" />
      <meta itemprop="ratingCount" :value="rating.count" />
      <Rating :best="rating.best" :value="rating.value" :count="rating.count" />
    </div>
    <a itemprop="url" :href="url">
      <span itemprop="name">{{ name }}</span>
    </a>
    <span itemprop="brand">{{ brand }}</span>
    <div
      itemprop="offers"
      itemscope
      itemtype="http://schema.org/AggregateOffer"
    >
      <meta :href="url" />
      <meta itemprop="availability" :content="availabilitySchema" />
      <meta itemprop="priceCurrency" :content="currency" />
      <meta itemprop="itemCondition" :content="itemConditionSchema" />
      <meta itemprop="lowPrice" :content="lowPrice" />
      <meta itemprop="highPrice" :content="highPrice" />
      <Number format="currency" :value="lowPrice" />to
      <Number v-if="highPrice" format="currency" :value="highPrice" />from
      <Number
        v-if="sellerCount"
        itemprop="offerCount"
        :value="sellerCount"
      />sellers
    </div>
  </div>
</template>

<script>
import ResponsiveImage from "@/components/ResponsiveImage";
import NumberFormatter from "@/components/Number";
import Rating from "@/components/Rating";
import { mapState } from "vuex";
import { URL } from "url";

export default {
  name: "Product",
  components: {
    ResponsiveImage,
    Number: NumberFormatter,
    Rating
  },
  props: {
    sku: {
      type: String,
      required: true
    },
    url: {
      type: URL,
      required: true
    },
    thumbnail: {
      type: URL,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    lowPrice: {
      type: Number,
      required: true
    },
    highPrice: {
      type: Number
    },
    brand: {
      type: String
    },
    description: {
      type: String
    },
    availability: {
      type: String,
      default: "InStock",
      validator: status => [
        "Discontinued",
        "InStock",
        "InStoreOnly",
        "LimitedAvailability",
        "OnlineOnly",
        "OutOfStock",
        "PreOrder",
        "PreSale",
        "SoldOut"
      ]
    },
    rating: {
      type: Object,
      validator: ({ value, best, count }) => value && best && count
    },
    sellerCount: {
      type: Number
    },
    itemCondition: {
      type: String,
      default: "NewCondition"
    }
  },
  computed: {
    ...mapState({
      currency: state => state.i18n.currency
    }),
    availabilitySchema() {
      return `https://schema.org/${this.availability}`;
    },
    itemConditionSchema() {
      return `https://schema.org/${this.itemCondition}`;
    }
  }
};
</script>

<style scoped lang="scss"></style>
