<template>
  <div>
    <h1 class="logo">cnodejs Api Test</h1>
    <ul class="list">
      <li v-for="item in lists" v-text="item.title"></li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lists:[]
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.get_data()
  },
  methods: {
    get_data: function(params) {
      var v = this
      if (!params) params = {}
      v.$api.get('topics', params, function(r) {
          v.lists = r.data
      })
    },
  },
}
</script>
