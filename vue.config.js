module.exports = {
  devServer: {
    host: 'suite.development.linximpulse.net'
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
        `
      }
    }
  }
}
