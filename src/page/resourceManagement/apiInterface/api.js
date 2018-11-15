import http from "api/base.js"

//资源管理--API接口
export let marketList = (data, self) => { //获取标签数据
    return http.fetchGet('/apis/tags', data, self)
}

export let cloudCompanyList = (data, self) => { //获取apI接口列表
    return http.fetchGet('/apis', data, self)
}

export let newCloudApplication = (data, self) => { //新增API接口
    return http.fetchPostJson('/apis/add-edit', data, self)
}

// export let newCloudApplications = (data, self) => { //编辑
//     return http.fetchPostJson('/apps/add-edits', data, self)
// }

export let batchDeleting = (data, self) => { //删除
    return http.fetchPostJson('/apis/delete', data, self)
}

export let BatchStartAndStopCloudApplication = (data, self) => { //批量启停
    return http.fetchPostJson('/apis/able', data, self)
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
