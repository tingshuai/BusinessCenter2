import http from "api/base.js"

export let getUnitList = (data, self) => {//获取单位列表
    return http.fetchGet('unit-groups/list', data, self)
}
export let getUnitItem = (data, self) => {//获取单位列表
    return http.fetchGet('market-base/market-and-class-and-product-unit-group', data, self)
}