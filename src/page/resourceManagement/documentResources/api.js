import http from "api/base.js"

export let treestructure = (data, self) => {  //点击标题父级文件夹 
    return http.fetchGet('/folders/parents', data, self)
}

export let warehouseList = (data, self) => {
    return http.fetchPost('/warehouse/list', data, self)
}

export let dataModelList = (data, self) => { //点击标题
    return http.fetchGet("/resources/folders/parents", data, self)
}

export let warehouseAdd = (data, self) => { //保存
    return http.fetchGet("/resources/folders/add-edit", data, self)
}

export let queryFileList = (data, self) => { //查询文件列表
    return http.fetchGet("/resources/files", data, self)
}

export let batchUpload = (data, self) => { //批量上传
    return http.fetchPostJson("/resources/files/upload", data, self)
}

export let batchDeleting = (data, self) => { //批量删除
    return http.fetchPostJson("/resources/files/delete", data, self)
}
