<template>
  <div class="home">
    <h1>aosdhiohaisdohids</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
    <Product
      sku="1234"
      url="https://example.com"
      thumbnail="https://res.cloudinary.com/ssenseweb/image/upload/b_white,c_lpad,g_south,h_1086,w_724/c_scale,h_560/v588/171924M176006_1.jpg"
      name="Produto Teste"
      brand="SEPHORA"
      description="Product description"
      :rating="{ count: 12, best: 5, value: 4.5 }"
      :low-price="120.45"
      :high-price="129.45"
      :seller-count="2"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Product from "@/components/Product.vue";

export default {
  name: "Home",
  components: {
    Product
  }
};
</script>
