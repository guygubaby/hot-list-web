import axios from 'axios'
import qs from 'qs'
import app from '../main'


class Http{
  instance = null
  constructor(){
    this.instance = axios.create({
      timeout:5000
    })
    this.instance.defaults.baseURL = '/api'
    this.instance.defaults.headers = {
      _id:'',
      token:'',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    this.instance.interceptors.request.use(
      config => {
        return config
      },
      error => {
        // app.$Progress.fail()
        return Promise.error(error)
      }
    )
    
    this.instance.interceptors.response.use(
      // 请求成功
      res => {
        return Promise.resolve(res.data)
      },
      // 请求失败
      error => {
        if (error.message.includes('timeout')) {
          this.tips('请求超时啦')
        } else if (error.request.status === 404) {
          this.tips('请求的链接不存在')
        } else if (error.request.status === 500) {
          this.tips('服务器内部错误')
        } else {
          this.tips(error)
        }
        return Promise.reject(error)
      }
      )
  }

  get(url, params, config = {}) {
    const finalConfig = {
      params,
      paramsSerializer: param =>
        qs.stringify(param, {
          indices: false
        }),
      ...config
    }
    return this.instance.get(url, finalConfig)
  }

  post(url, params, config = {}) {
    return this.instance.post(url, qs.parse(params), config)
  }

  del(url, param={}) {
    return this.instance.delete(url, {
      data: param
    })
  }

  put(url, params={}) {
    return this.instance.put(url, params)
    // return this.instance.put(url, QS.parse(params));
  }

  tips(msg = 'request error') {
    app.$message.warning(msg)
  }

  setHeaders(header) {
    this.instance.defaults.headers = {
      ...this.instance.defaults.headers,
      ...header
    }
  }

}

export default new Http()
