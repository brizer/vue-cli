/**
 * We register all the components so future cli-ui plugins
 * could use them directly
 */
//全局注册所有组件，故而可以直接在Vue的全居范围 直接使用

import Vue from 'vue'

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context('./components', true, /[a-z0-9]+\.(jsx?|vue)$/i)

// For each matching file name...
requireComponent.keys().forEach(fileName => {
  //通过webpack的require.context拿到所有组件文件名后
  const componentConfig = requireComponent(fileName)
  const componentName = fileName
    .substr(fileName.lastIndexOf('/') + 1)
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')
  // Globally register the component
  //对所有组件进行注册，方便全局使用
  Vue.component(componentName, componentConfig.default || componentConfig)
})
