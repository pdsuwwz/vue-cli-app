<template>
  <div id="app">
    <div class="box-container">
      <div class="banner"><repo/> </div>
      <div class="content">
        <hoc-el-affix>
          <div class="box">吸顶</div>
        </hoc-el-affix>
        <div class="long-list">
          <div
            v-for="(item, index) in 100"
            :key="index"
            class="long"
          >
          <template
            v-if="index === 5"
          >
            <hoc-el-affix
              :offsetTop="120"
            >
              <div class="box">距离顶部120px时固定</div>
            </hoc-el-affix>
          </template>
          <template
            v-else
          >
            {{ index === 99 ? '到底了' : `占位符${index + 1}` }}
          </template>
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
    text-align: center;
    .box {
      width: 300px;
      height: 50px;
      line-height: 50px;
      border: 1px solid #000;
    }
    .long-list {
      .long {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
      }
    }
  }
}
</style>

