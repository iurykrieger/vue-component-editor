export default {
  data() {
    return {
      isMobile: this.detectMobileAgent()
    }
  },
  methods: {
    /**
     * Checks if current browser has a mobile agent.
     *
     * @returns { Boolean } true if mobile, false if don't
     */
    detectMobileAgent() {
      const userAgents = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
      ]
      return (
        Boolean(
          userAgents.find(userAgent =>
            window.navigator.userAgent.match(userAgent)
          )
        ) || window.screen.width <= 768
      )
    },
    onResize(event) {
      this.isMobile = this.detectMobileAgent()
    }
  },
  created() {
    window.addEventListener('resize', this.onResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize)
  }
}
