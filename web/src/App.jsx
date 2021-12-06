import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import './app.less' // css 设置白色背景及安全距离

export default defineComponent({
  name: 'App',
  setup (props, ctx) {
    return () => (<RouterView />)
  }
})
