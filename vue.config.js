
/* eslint-disable */
const path = require('path')
const manifestJSON = require('./public/manifest.json')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  pwa: {
    themeColor: manifestJSON.theme_color
  }
}
