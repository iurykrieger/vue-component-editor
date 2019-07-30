<template>
  <div class="product" itemtype="http://schema.org/Product" itemscope>
    <meta itemprop="sku" :content="sku" />
    <meta itemprop="description" :content="description" />
    <div class="product-thumbnail">
      <a :href="url">
        <ResponsiveImage itemprop="image" :src="thumbnail" />
      </a>
    </div>
    <div class="product-content">
      <div
        class="product-rating"
        v-if="rating"
        itemprop="aggregateRating"
        itemscope
        itemtype="http://schema.org/AggregateRating"
      >
        <meta itemprop="ratingValue" :content="rating.value" />
        <meta itemprop="bestRating" :conent="rating.best" />
        <meta itemprop="ratingCount" :value="rating.count" />
        <Rating
          :best="rating.best"
          :value="rating.value"
          :count="rating.count"
        />
      </div>
      <div class="product-description">
        <span class="product-brand" itemprop="brand">{{ brand }}</span>
        <a itemprop="url" :href="url">
          <span itemprop="name">{{ name }}</span>
        </a>
      </div>
      <div
        class="offers"
        itemprop="offers"
        itemscope
        itemtype="http://schema.org/AggregateOffer"
      >
        <meta itemprop="availability" :content="availabilitySchema" />
        <meta itemprop="priceCurrency" :content="currency" />
        <meta itemprop="itemCondition" :content="itemConditionSchema" />
        <meta itemprop="highPrice" :content="highPrice" />
        <meta itemprop="lowPrice" :content="lowPrice" />
        <span class="high-price-label">
          de
          <Number
            v-if="highPrice"
            format="currency"
            :value="highPrice"
            class="high-price"
          />
        </span>
        <span class="low-price-label">
          por
          <Number format="currency" :value="lowPrice" class="low-price" />
        </span>
        <meta v-if="sellerCount" itemprop="offerCount" :content="sellerCount" />
      </div>
    </div>
  </div>
</template>

<script>
import ResponsiveImage from '@/components/ResponsiveImage'
import NumberFormatter from '@/components/Number'
import Rating from '@/components/Rating'
import { mapState } from 'vuex'
import { URL } from 'url'

export default {
  name: 'Product',
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
      default: 'InStock',
      validator: status => [
        'Discontinued',
        'InStock',
        'InStoreOnly',
        'LimitedAvailability',
        'OnlineOnly',
        'OutOfStock',
        'PreOrder',
        'PreSale',
        'SoldOut'
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
      default: 'NewCondition'
    }
  },
  computed: {
    ...mapState({
      currency: state => state.i18n.currency
    }),
    availabilitySchema() {
      return `https://schema.org/${this.availability}`
    },
    itemConditionSchema() {
      return `https://schema.org/${this.itemCondition}`
    }
  }
}
</script>

<style scoped lang="scss">
span,
a {
  display: block;
  font-weight: 500;
}

.product {
  border-radius: $base-size;
  box-shadow: $box-shadow;
  background-color: #fff;
  margin: $base-size / 2;
  transition: $transition;
  min-height: 97%;

  &:hover {
    box-shadow: $box-shadow-hover;
  }
}

.product-thumbnail {
  display: block;
  margin: $base-size auto 0;
  padding: $base-size * 2;
}

.product-content {
  border-top: 1px solid #ddd;
  padding: $base-size * 1.5;
  text-align: left;
}

.product-description {
  margin: $base-size 0;
}

.product-brand {
  margin-bottom: $base-size;
  font-size: 0.8em;
}

.currency {
  display: inline-block;
  font-size: 1.1em;

  &.low-price {
    font-weight: bold;
    color: $accent-color;
  }

  &.high-price {
    text-decoration: line-through;
  }
}
</style>
