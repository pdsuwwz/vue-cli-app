<template>
  <div id="app">
    <TableList />
  </div>
</template>

<script>
import TableList from '@/components/table-list'

export default {
  name: 'App',
  components: {
    TableList
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
