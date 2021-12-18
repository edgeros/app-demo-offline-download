import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { download } from '../apis/index'
import { socketio } from '../libs/socketio'
import md5 from 'blueimp-md5'
import './home.less'
import { Progress, InputSearch, Button } from 'ant-design-vue'

export default defineComponent({
  name: 'Home',
  setup (props, ctx) {
    const router = useRouter()
    const resource = ref()
    const downloadList = ref([])

    onMounted(() => {
      socketio.socket.on('progress', data => {
        console.log('call:', data)
        downloadList.value.forEach(item => {
          if (item.hash === data.hash) {
            item.progress = data.data
            item.name = data.name
          }
        })
        if (data.data === 100) {
          console.log('>>>> download over <<<<')
        }
      })
    })

    // 进入下载列表
    function goDownloaded () {
      router.push('/downloaded')
    }

    // 下载
    async function handleDownload () {
      //
      console.log('调用API 下载', resource.value)
      if (!resource.value) return 0
      const hash = md5(resource.value)
      // 查询当前下载列表中的下载项
      console.log('>> down list:', downloadList)
      const find = downloadList.value.find(item => item.hash === hash)
      // 如果存在 则不进行操作
      if (find) return 0
      download({
        url: resource.value,
        hash: hash
      }).then(data => {
        console.log('>> data:', data)
        if (data.code === 0) {
          resource.value = ''
        }
        downloadList.value.push({
          hash: hash,
          progress: 0
        })
      })
    }

    // 渲染新建下载
    function _renderAdd () {
      return (
        <div>
          <InputSearch
            vModel={ [resource.value, 'value'] }
            placeholder="资源地址"
            enterButton={() => (<Button type="primary">下载</Button>)}
            style="width: 60%"
            allowClear
            onSearch={ handleDownload }
            size="large">
          </InputSearch>
        </div>
      )
    }
    return () => (
      <div className="home-container">
        <p>
          <Button type="primary" onClick={ goDownloaded }>已下载</Button>
        </p>
        {
          _renderAdd()
        }
        {/* 下载列表 */}
        <div className="down-list">
          {
            downloadList.value.map(item => (
              <div class="download-list-container">
                <div class="list">
                  <p>{item.name}</p>
                  <p class="progress">
                    <Progress percent={item.progress} />
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
})
