<template>
  <Carousel
    class="widget"
    :per-page="4"
    :mouse-drag="true"
    :navigation-enabled="true"
    :navigationClickTargetSize="16"
  >
    <Slide v-for="product in products" :key="product.sku">
      <Product
        :sku="product.sku"
        :url="product.url"
        :thumbnail="product.thumbnail"
        :name="product.name"
        :brand="product.brand"
        :description="product.description"
        :rating="product.rating"
        :low-price="product.lowPrice"
        :high-price="product.highPrice"
        :seller-count="product.sellerCount"
      />
    </Slide>
  </Carousel>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import Product from "@/components/Product";

export default {
  name: "Widget",
  components: {
    Carousel,
    Slide,
    Product
  },
  data() {
    return {
      products: [
        {
          sku: "1234",
          url: "https://example.com",
          thumbnail:
            "https://thumbs.buscape.com.br/tv/smart-tv-4k-ultra-hd-lg-led-55-polegadas-55sk8500psa_300x300-PUa2150_1.jpg",
          name: "Produto Teste com um nome um pouco maior do que o normal",
          brand: "SEPHORA",
          description: "Product description",
          rating: {
            count: 12,
            best: 5,
            value: 2
          },
          lowPrice: 120.45,
          highPrice: 129.45,
          sellerCount: 2
        },
        {
          sku: "1235",
          url: "https://example.com",
          thumbnail:
            "https://thumbs.buscape.com.br/tv/smart-tv-full-hd-aoc-led-43-polegadas-le43s5970_300x300-PU9ae3d_1.jpg",
          name: "Produto Teste",
          brand: "SEPHORA",
          description: "Product description",
          rating: {
            count: 12,
            best: 5,
            value: 4.5
          },
          lowPrice: 120.45,
          highPrice: 129.45,
          sellerCount: 2
        },
        {
          sku: "1232",
          url: "https://example.com",
          thumbnail:
            "https://thumbs.buscape.com.br/livros/a-sutil-arte-de-ligar-o-f-da-se-manson-mark-855100249x_300x300-PU6e929559_1.jpg",
          name: "Produto Teste",
          brand: "SEPHORA",
          description: "Product description",
          rating: {
            count: 12,
            best: 5,
            value: 4.5
          },
          lowPrice: 120.45,
          highPrice: 129.45,
          sellerCount: 2
        },
        {
          sku: "1231",
          url: "https://example.com",
          thumbnail:
            "https://thumbs.buscape.com.br/tv/smart-tv-4k-ultra-hd-lg-led-55-polegadas-55sk8500psa_300x300-PUa2150_1.jpg",
          name: "Smart TV 4K Ultra HD LG LED 65 polegadas 65UK6530PSF",
          brand: "SEPHORA",
          description: "Product description",
          rating: {
            count: 12,
            best: 5,
            value: 4.5
          },
          lowPrice: 120.45,
          highPrice: 129.45,
          sellerCount: 2
        },
        {
          sku: "12",
          url: "https://example.com",
          thumbnail:
            "https://thumbs.buscape.com.br/tv/smart-tv-4k-ultra-hd-lg-led-55-polegadas-55sk8500psa_300x300-PUa2150_1.jpg",
          name: "Produto Teste",
          brand: "SEPHORA",
          description: "Product description",
          rating: {
            count: 12,
            best: 5,
            value: 4.5
          },
          lowPrice: 120.45,
          highPrice: 129.45,
          sellerCount: 2
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.widget {
  height: 100%;
}
</style>
