export default {
  namespaced: true,
  state: {
    /**
     * Currency 3 letter ISO 4217 format (USD, BRL, ...)
     */
    currency: "BRL",
    /**
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
     * Currency display mode. Can be "symbol", "code" or "name"
     */
    currencyDisplay: "symbol",
    /**
     * Currency locale
     */
    locale: "pt-BR"
  },
  getters: {},
  mutations: {},
  actions: {}
};
