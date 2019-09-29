import http from './http'

export default {
  install(Vue){
    Vue.prototype.$api = {
      types:{
        get(){
          return http.get('/types')
        }
      },
      list:{
        get(cate){
          return http.get('/list',{cate})
        }
      }
    }
  }
}