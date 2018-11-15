import http from "./base.js"

//市场中心--市场管理
export let marketClassAndProductClassList = (data, self) => {
    return http.fetchPost('/market-base/market-and-class-and-product', data, self)
}

export let dataDirProductRefResourceList = (data, self) => {
    return http.fetchPost('/data-define/listByDirCode1', data, self)
}

export let modelPublicAttrList = (data, self) => {
    return http.fetchPostJson('/product-class/model-public-attr', data, self)
}

export let modelAttrList = (data, self) => {
    return http.fetchPostJson('/product-class/model-attr', data, self)
}

export let saveOrUpdateProductClass = (data, self) => {
    return http.fetchPostJson('/product-class/save-or-update', data, self)
}

export let deletProductClass = (data, self) => {
    return http.fetchPost('/product-class/delete', data, self)
}

export let ableOrDisableProductClass = (data, self) => {
    return http.fetchPost('/product-class/able-or-disable', data, self)
}


