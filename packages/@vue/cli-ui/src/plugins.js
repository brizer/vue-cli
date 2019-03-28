import Vue from 'vue'
import VueUi from '@vue/ui'
//基于vue的搜索
import InstantSearch from 'vue-instantsearch'
//管理meta
import VueMeta from 'vue-meta'
//跨组件的slot
import PortalVue from 'portal-vue'
//基于intersection observer api的指令，判断是否视窗内
import VueObserveVisibility from 'vue-observe-visibility'
//所有的过滤器
import * as Filters from './filters'
//处理响应式
import Responsive from './util/responsive'
//通用数据的处理 
import SharedData from './util/shared-data'
import PluginAction from './util/plugin-action'
import ClientState from './mixins/ClientState'
import SetSize from './util/set-size'
import Focus from './util/focus'
//引入简单的eventbus
import Bus from './util/bus'
import AnsiColors from './util/ansi-colors'

Vue.use(InstantSearch)
Vue.use(VueMeta)
//针对不同尺寸，使用util中的responsive，给Vue原型上的$responsive，打上不同标识
//方便在各个ui层做响应式处理
Vue.use(Responsive, {
  computed: {
    mobile () {
      return this.width <= 768
    },
    tablet () {
      return this.width <= 900
    },
    desktop () {
      return !this.tablet
    },
    wide () {
      return this.width >= 1300
    }
  }
})
Vue.use(VueUi)
Vue.use(PortalVue)
Vue.use(VueObserveVisibility)
Vue.use(SharedData)
Vue.use(PluginAction)
Vue.use(Bus)
Vue.use(AnsiColors)

for (const key in Filters) {
  Vue.filter(key, Filters[key])
}

Vue.mixin(ClientState)

Vue.directive('set-size', SetSize)
Vue.directive('focus', Focus)
