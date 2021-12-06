import axios from 'axios'

// create an axios instance
const request = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL, // url = base url + request url
  // baseURL: 'http://localhost:8080/api'
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    return res
  },
  error => {
    console.error('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default request
