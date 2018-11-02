import axios from 'axios'
import store from '../store'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  config.withCredentials = true
  const token = localStorage.getItem('token')
  if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加
    config.headers.Authorization = `${token}`
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  // response => {
  //   const res = response.data
  //   if (res.status === -1) {
  //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //       confirmButtonText: '重新登录',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       store.dispatch('FedLogOut').then(() => {
  //         location.reload()
  //       })
  //     })
  //   } else if (res.status === 1) {
  //     return res
  //   } else {
  //     if (res.code === '9000') {
  //       Message({
  //         message: "参数错误",
  //         type: 'error',
  //         duration: 3 * 1000
  //       })
  //     }
  //     if (res.code === '3333') {
  //       Message({
  //         message: "无权访问",
  //         type: 'error',
  //         duration: 3 * 1000
  //       })
  //     }
  //     if (res.code === '9999') {
  //       Message({
  //         message: "系统异常",
  //         type: 'error',
  //         duration: 3 * 1000
  //       })
  //     }
  //     return res
  //   }
  // },
  response => {
    if (response.data.code) {
      switch (response.data.code) {
        case 301:
          localStorage.removeItem('token')
          router.replace({
            path: '/launch',
            query: {redirect: router.currentRoute.fullPath}
          })
          break
      }
    }
    return response
  },
  error => {
    // console.log('err' + error)
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 3 * 1000
    // })
    // return Promise.reject(error)
    if (error.response) {
      switch (error.response.status) {
        case 301:
          localStorage.removeItem('token')
          router.replace({
            path: '/launch',
            query: {redirect: router.currentRoute.fullPath}
          })
          break
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  })

export default service
