import http from "./base.js"

//设备中心--设备模型
export let dataDefineIndustryList = (data, self) => {
    return http.fetchPost('/data-define/listByDirCode', data, self)
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

