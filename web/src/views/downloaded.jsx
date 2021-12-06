import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Badge } from 'ant-design-vue'
import { downloadList } from '../apis/index'

export default defineComponent({
  name: 'Downloaded',
  setup (props, ctx) {
    const router = useRouter()
    const fileList = ref([])

    // mounted
    onMounted(() => {
      init()
    })

    async function init () {
      const data = await downloadList()
      /**
       * file type
       * 0  无法确定
       * 1  先进先出/管道文件
       * 2  字符设备
       * 4  目录
       * 6  块设备
       * 8  常规数据文件
       * 10 链接
       * 12 套接字文件
       */
      fileList.value = data.data
    }

    function backToHome () {
      router.push('/')
    }

    return () => (
      <div className="downloaded-container" style="padding: 20px;">
        <p><Button type="primary" onClick={ backToHome }>返回首页</Button></p>
        <div>
          {
            fileList.value.map(item => <p><Badge status="success" text={item.name} /><br /></p>)
          }
        </div>
      </div>
    )
  }
})
