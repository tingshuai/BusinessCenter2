import http from "api/base.js"

//设备中心--设备模型
export let dataDefineIndustryList = (data, self) => { //获取标签数据
    return http.fetchGet('/dev-models/tags', data, self)
}

export let devModelList = (data, self) => {
    return http.fetchPost('/dev-model/model/list', data, self)
}

export let devModelAttrList = (data, self) => {
    return http.fetchPost('/dev-model/attr/list', data, self)
}

export let devModelParamList = (data, self) => {
    return http.fetchPost('/dev-model/param/list', data, self)
}
export let devModelFilterList = (data, self) => {
    return http.fetchPost('/dev-model/filter/list', data, self)
}
export let devModelResolutionList = (data, self) => {
    return http.fetchPost('/dev-model/resolution/list', data, self)
}