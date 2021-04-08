(function(global) {
  global.scalePage = {
    init() {
      window.onresize = () => {
        this.scalePage();
      };
      this.scalePage();
    },
    scalePage() {
      const oHtml = document.getElementsByTagName('html')[0];
      const htmlW = oHtml.clientWidth;
      oHtml.style.fontSize = `${htmlW / 1920 * 100}px`;
    }
  };
  global.scalePage.init();
})(window);