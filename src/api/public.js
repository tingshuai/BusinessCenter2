import http from './base.js'
// 分页获取群组列表接口 
export let getList = (data,self)=>{
    return http.get('/weighing/testXform',data,self)
}

