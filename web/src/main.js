import { createApp } from 'vue'
import App from './App.jsx'
import router from './router'
import store from './store'

// antdv css
import 'ant-design-vue/dist/antd.css'

createApp(App).use(store).use(router).mount('#app')
