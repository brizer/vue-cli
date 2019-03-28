/**
 * 一个自定义插件，用来做响应式的尺寸
 */
export let responsive

export default {
  install (Vue, options) {
    const finalOptions = Object.assign({}, {
      computed: {}
    }, options)

    responsive = new Vue({
      data () {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      computed: finalOptions.computed
    })
    //在屏幕尺寸变化后，将不同属性赋值到$responsive
    Object.defineProperty(Vue.prototype, '$responsive', {
      get: () => responsive
    })

    window.addEventListener('resize', () => {
      responsive.width = window.innerWidth
      responsive.height = window.innerHeight
    })
  }
}
