module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,

  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://192.168.128.1:7376',
        changeOrigin: true,
        secure: false
      }
    }
  }
}
