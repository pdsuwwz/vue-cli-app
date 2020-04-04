<template>
  <div id="app">
    <div class="box-container">
      <div class="banner"><repo/> </div>
      <div class="content">
        <hoc-el-affix>
          <div class="box-1"></div>
        </hoc-el-affix>
        <div class="long-list">
          <div
            v-for="(item, index) in 100"
            :key="index"
            class="long"
          >
          {{ index === 99 ? '到底了' : `占位符${index + 1}` }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import repo from '@/components/repo'

export default {
  name: 'App',
  components: {
    repo
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<style lang="scss" scoped>
.box-container {
  .banner {
    padding: 30px 0;
    background-color: #eee;
  }
  .content {
    position: relative;
    width: 300px;
    margin: 0 auto;
    .box-1 {
      width: 300px;
      height: 50px;
      border: 1px solid #000;
    }
    .long-list {
      text-align: center;
      .long {
        height: 50px;
        font-size: 16px;
      }
    }
  }
}
</style>

