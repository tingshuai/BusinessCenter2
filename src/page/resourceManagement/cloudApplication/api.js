import http from "api/base.js"

//资源管理--云应用
export let marketList = (data, self) => { //获取标签数据
    return http.fetchGet('/apps/tags', data, self)
}

export let cloudCompanyList = (data, self) => { //获取云应用列表
    return http.fetchGet('/apps', data, self)
}

export let newCloudApplication = (data, self) => { //新增云应用
    return http.fetchPostJson('/apps/add-edit', data, self)
}

// export let newCloudApplications = (data, self) => { //编辑云应用
//     return http.fetchPostJson('/apps/add-edits', data, self)
// }

export let batchDeleting = (data, self) => { //批量删除云应用
    return http.fetchPostJson('/apps/delete', data, self)
}

export let BatchStartAndStopCloudApplication = (data, self) => { //批量启停云应用
    return http.fetchPostJson('/apps/able', data, self)
}

export let saveOrUpdateMarket = (data, self) => {
    return http.fetchPost('/market-mgr/save-or-update', data, self)
}

export let deletMarket = (data, self) => {
    return http.fetchPost('/market-mgr/delete', data, self)
}

export let ableOrDisableMarket = (data, self) => {
    return http.fetchPost('/market-mgr/able-or-disable', data, self)
}
