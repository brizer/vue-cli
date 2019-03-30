<template>
  <div class="nav-content">
    <NavList
      :items="items"
    >
      <slot name="before" slot="before"/>

      <template slot-scope="props">
        <slot v-bind="props"/>
      </template>

      <slot name="after" slot="after"/>
    </NavList>

    <div class="content vue-ui-disable-scroll">
      <!-- 用于渲染二级路由 -->
      <router-view/>
    </div>
  </div>
</template>

<script>
// 一个封装的导航加内容渲染组件
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav-content
  width 100%
  height 100%
  display grid
  grid-template-columns 300px 1fr
  grid-template-rows 1fr
  grid-template-areas "nav content"
  > .nav-list
    grid-area nav
  > .content
    grid-area content
    overflow-x hidden
    overflow-y auto
</style>
