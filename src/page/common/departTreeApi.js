import http from "../../api/base.js"

export let permissionRoleListRole = (data, self) => {
    return http.fetchPost("/permissionRole/listRole", data, self)
}
export let permissionRoleList = (data, self) => {
    return http.fetchPost("/permissionRole/list", data, self)
}
export let permissionRoleGrid = (data, self) => {
    return http.fetchPost("/permissionRole/grid", data, self)
}
export let permissionRoleAdd = (data, self) => {
    return http.fetchPost("/permissionRole/add", data, self)
}
export let permissionRoleEdit = (data, self) => {
    return http.fetchPost("/permissionRole/edit", data, self)
}
export let permissionRoleGet = (data, self) => {
    return http.fetchPost("/permissionRole/get", data, self)
}
export let permissionRoleDel = (data, self) => {
    return http.fetchPost("/permissionRole/Del", data, self)
}

