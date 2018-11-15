import http from "../../api/base.js"

export let warehouseList = (data, self) => {
    return http.fetchPost('/warehouse/list', data, self)
}

export let warehouseGrid = (data, self) => {
    return http.fetchPost('/warehouse/grid', data, self)
}

export let warehouseAdd = (data, self) => {
    return http.fetchPost('/warehouse/add', data, self)
}

export let warehouseEdit = (data, self) => {
    return http.fetchPost('/warehouse/edit', data, self)
}
export let warehouseAble = (data, self) => {
    return http.fetchPost('/warehouse/able', data, self)
}
export let warehouseDel = (data, self) => {
    return http.fetchPost('/warehouse/del', data, self)
}

export let dataModelList = (data, self) => {
    return http.fetchPost('/datamodel/list', data, self)
}

export let dataModelGrid = (data, self) => {
    return http.fetchPost('/datamodel/grid', data, self)
}

export let dataModelAdd = (data, self) => {
    return http.fetchPost('/datamodel/add', data, self)
}
export let dataModelAble = (data, self) => {
    return http.fetchPost('/datamodel/able', data, self)
}
export let dataModelEdit = (data, self) => {
    return http.fetchPost('/datamodel/edit', data, self)
}
export let dataModelDel = (data, self) => {
    return http.fetchPost('/datamodel/del', data, self)
}


export let versionList = (data, self) => {
    return http.fetchPost('/version/list', data, self)
}
export let versionGrid = (data, self) => {
    return http.fetchPost('/version/grid', data, self)
}
export let versionAdd = (data, self) => {
    return http.fetchPost('/version/add', data, self)
}

export let versionEdit = (data, self) => {
    return http.fetchPost('/version/edit', data, self)
}

export let versionAble = (data, self) => {
    return http.fetchPost('/version/able', data, self)
}

export let versionDel = (data, self) => {
    return http.fetchPost('/version/del', data, self)
}




