import request from '../libs/request'

export function download ({ url = '', hash = '' }) {
  return request({
    url: '/api/download',
    method: 'POST',
    data: {
      url,
      hash
    }
  })
}

export function downloadList () {
  return request({
    url: '/api/download-list',
    method: 'GET'
  })
}
