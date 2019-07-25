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
            "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176003_1.jpg",
          name: "Produto Teste",
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
            "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176006_1.jpg",
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
            "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176006_1.jpg",
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
            "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176006_1.jpg",
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
          sku: "12",
          url: "https://example.com",
          thumbnail:
            "https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176006_1.jpg",
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

<style scoped lang="scss"></style>
