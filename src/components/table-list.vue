<template>
  <div class="box-container">
    <div class="banner">
      <div class="repo">
        <p>@hoc-element/table</p>
        <a
          href="https://github.com/pdsuwwz/hoc-element-table"
          target="_blank"
        >
          <svg class="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
        </a>
      </div>
    </div>
    <div class="content">
      <hoc-el-table
        title="表格Demo"
        :source="sourceList.data"
        :pagination="sourceList.pagination"
        :config="config"
        :loading="loading"
        :border="border"
        :height="tableHeight"
        :action-list="[
          { text: '固定表头', action: () => setFixedRow() },
          { text: '固定最右则列', action: () => setFixedRight() },
          { text: '居中表头label', action: () => setLabelCenter() },
          { text: '添加边框', action: () => setBorder() }
        ]"
        @getList="getList"
      >
      </hoc-el-table>

    </div>
  </div>
</template>

<script>

import TableChildrenA from './table-children-a'
import TableChildrenB from './table-children-b'

export default {
  components: {
    TableChildrenA,
    TableChildrenB
  },
  methods: {
    sleep (time = 1000) {
      return new Promise((resolve) => setTimeout(resolve, time))
    },
    async getList () {
      this.loading = true
      
      await this.sleep()
      
      this.sourceList = this.mockData
      this.loading = false
    },
    setFixedRight () {
      if (!this.fixedRight) {
        this.fixedRight = 'right'
      } else {
        this.fixedRight = false
      }
    },
    setFixedRow () {
      if (!this.tableHeight) {
        this.tableHeight = '350'
      } else {
        this.tableHeight = ''
      }
    },
    setLabelCenter () {
      if (!this.align) {
        this.align = 'center'
      } else {
        this.align = ''
      }
    },
    setBorder () {
      this.border = !this.border
    },
    setPublish (row) {
      this.$confirm(`此操作会将${row.name}发布到线上, 是否继续?`, `编号${row.id}提示`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '发布成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发布'
        })
      })
    },
    async setForbid (row) {
      this.loading = true
      await this.sleep()
      this.loading = false
      row.isForbid = !row.isForbid
    }
  },
  data () {
    return {
      loading: false,
      fixedRight: 'right',
      align: 'center',
      tableHeight: '350',
      border: false,
      sourceList: {}
    }
  },
  async created () {
    await this.getList()
  },
  computed: {
    mockData () {
      return {
        data: [
          { id: 0, name: '王小虎1', isForbid: false },
          { id: 1, name: '王小虎2', isForbid: false },
          { id: 2, name: '王小虎3', isForbid: false }
        ],
        pagination: {
          total: 3,
          pageSize: 10,
          currentPage: 1
        }
      }
    },
    config () {
      const self = this
      const align = self.align
      return [
        {
          attrs: {
            label: '编号',
            align,
            prop: 'id'
          }
        },
        {
          attrs: {
            label: '名称',
            prop: 'name',
            align,
            width: 200
          }
        },
        {
          attrs: {
            label: '状态',
            prop: 'isForbid',
            align,
            width: 200
          },
          // 渲染字符串，默认不想展示 prop 的值，而是想对它做一些处理的时候，可以用这个方法
          render (isForbid) {
            return isForbid ? '✖️禁用中' : '✔️非禁用'
          }
        },
        {
          attrs: {
            label: '详情A',
            align,
            width: 400
          },
          // 渲染组件，返回值为一个数组， data 作为组件的 v-model，适用于需要展示复杂的数据的场景
          renderComponent (row) {
            return [
              { name: 'TableChildrenA', data: row },
              { name: 'el-input', data: row.name },
              { name: 'el-rate', data: row.id }
            ]
          }
        },
        {
          attrs: {
            label: '详情B',
            align,
            width: 400
          },
          renderComponent (row) {
            return [
              { name: 'TableChildrenB', data: row }
            ]
          }
        },
        {
          attrs: {
            label: '操作',
            width: '260',
            align,
            fixed: self.fixedRight
          },
          // 渲染 el-button，一般用在最后一列。目前只支持 el-button 和 click 事件，后续会根据需求支持任意的 el-xxx 和事件委托
          renderHTML (row) {
            return [
              {
                attrs: {
                  label: '查看',
                  type: 'text',
                  size: 'medium'
                },
                el: 'button',
                click () {
                  this.$message(JSON.stringify(row))
                }
              },
              {
                attrs: {
                  label: '编辑',
                  type: 'text',
                  size: 'medium'
                },
                el: 'button',
                click () {
                  this.$message(`编号${row.id} router -> 已跳转到编辑页面！`)
                }
              },
              {
                attrs: {
                  label: '发布',
                  type: 'text',
                  size: 'medium'
                },
                el: 'button',
                click () {
                  this.setPublish(row)
                }
              },
              !row.isForbid ? {
                attrs: {
                  label: '禁用',
                  type: 'text',
                  disabled: false,
                  size: 'medium'
                },
                el: 'button',
                click () {
                  this.setForbid(row)
                }
              } : {
                attrs: {
                  label: '解除禁用',
                  type: 'text',
                  disabled: false,
                  size: 'medium',
                  style: {
                    color: '#e6a23c'
                  }
                },
                el: 'button',
                click () {
                  this.setForbid(row)
                }
              }
            ]
          }
        }
      ]
    }
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
    .repo {
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      a {
        color: #2c3e50;
        text-decoration: none;
      }
    }
    @media screen and (min-width: 400px) {
      .repo {
        width: 400px;
      }
    }
  }
  .content {
    position: relative;
    padding: 20px 20px 0;
    margin: 0 auto;
  }
}
</style>
