import http from "api/base.js"

export let productsList = (data, self) => {
    return http.fetchGet('operating-products/market-and-class-and-product', data, self)
};
export let getPublicData = (data, self) => {
    return http.fetchGet(`operating-products/product-model-attr/${data.id}`, data, self)
}