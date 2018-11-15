import http from "api/base.js"

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

export let structureList = (data, self) => {
    return http.fetchPost('/structure/list', data, self)
}
export let structureGrid = (data, self) => {
    return http.fetchPost('/structure/grid', data, self)
}
export let structureAdd = (data, self) => {
    return http.fetchPost('/structure/add', data, self)
}

export let structureEdit = (data, self) => {
    return http.fetchPost('/structure/edit', data, self)
}

export let structureAble = (data, self) => {
    return http.fetchPost('/structure/able', data, self)
}

export let structureDel = (data, self) => {
    return http.fetchPost('/structure/del', data, self)
}

export let structureGet = (data, self) => {
    return http.fetchPost('/structure/get', data, self)
}


export let structureBatch = (data, self) => {
    return http.fetchPostJson("/structure/batch", data, self)
}

export let permissionSchemeList = (data, self) => {
    return http.fetchPost("/permissionScheme/list", data, self)
}
export let permissionSchemeGrid = (data, self) => {
    return http.fetchPost("/permissionScheme/grid", data, self)
}
export let permissionSchemeAdd = (data, self) => {
    return http.fetchPost("/permissionScheme/add", data, self)
}
export let permissionSchemeEdit = (data, self) => {
    return http.fetchPost("/permissionScheme/edit", data, self)
}
export let permissionSchemeAble = (data, self) => {
    return http.fetchPost("/permissionScheme/able", data, self)
}
export let permissionSchemeDel = (data, self) => {
    return http.fetchPost("/permissionScheme/Del", data, self)
}


export let permissionActionList = (data, self) => {
    return http.fetchPost("/permissionAction/list", data, self)
}
export let permissionActionGrid = (data, self) => {
    return http.fetchPost("/permissionAction/grid", data, self)
}
export let permissionActionAdd = (data, self) => {
    return http.fetchPost("/permissionAction/add", data, self)
}
export let permissionActionEdit = (data, self) => {
    return http.fetchPost("/permissionAction/edit", data, self)
}
export let permissionActionGet = (data, self) => {
    return http.fetchPost("/permissionAction/get", data, self)
}
export let permissionActionDel = (data, self) => {
    return http.fetchPost("/permissionAction/Del", data, self)
}


export let permissionLineList = (data, self) => {
    return http.fetchPost("/permissionLine/list", data, self)
}
export let permissionLineGrid = (data, self) => {
    return http.fetchPost("/permissionLine/grid", data, self)
}
export let permissionLineAdd = (data, self) => {
    return http.fetchPost("/permissionLine/add", data, self)
}
export let permissionLineEdit = (data, self) => {
    return http.fetchPost("/permissionLine/edit", data, self)
}
export let permissionLineGet = (data, self) => {
    return http.fetchPost("/permissionLine/get", data, self)
}
export let permissionLineDel = (data, self) => {
    return http.fetchPost("/permissionLine/Del", data, self)
}




export let permissionColumList = (data, self) => {
    return http.fetchPost("/permissionColum/list", data, self)
}
export let permissionColumGrid = (data, self) => {
    return http.fetchPost("/permissionColum/grid", data, self)
}
export let permissionColumAdd = (data, self) => {
    return http.fetchPost("/permissionColum/add", data, self)
}
export let permissionColumEdit = (data, self) => {
    return http.fetchPost("/permissionColum/edit", data, self)
}
export let permissionColumGet = (data, self) => {
    return http.fetchPost("/permissionColum/get", data, self)
}
export let permissionColumDel = (data, self) => {
    return http.fetchPost("/permissionColum/del", data, self)
}



export let permissionLineRuleList = (data, self) => {
    return http.fetchPost("/permissionLineRule/list", data, self)
}
export let permissionLineRuleGrid = (data, self) => {
    return http.fetchPost("/permissionLineRule/grid", data, self)
}
export let permissionLineRuleAdd = (data, self) => {
    return http.fetchPost("/permissionLineRule/add", data, self)
}
export let permissionLineRuleEdit = (data, self) => {
    return http.fetchPost("/permissionLineRule/edit", data, self)
}
export let permissionLineRuleDel = (data, self) => {
    return http.fetchPost("/permissionLineRule/del", data, self)
}



/*获取所有下拉*/
export let permissionSchemeListWithWareHouse = (data, self) => {
    return http.fetchPost("/permissionScheme/listWithWareHouse", data, self)
}
/*获取已经保存的数据*/
export let datamodelListWithWareHouse = (data, self) => {
    return http.fetchPost("/datamodel/listWithWareHouse ", data, self)
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
export let permissionRoleDel = (data, self) => {
    return http.fetchPost("/permissionRole/del", data, self)
}
export let permissionRoleAddBatch = (data, self) => {
    return http.fetchPost("/permissionRole/addBatch", data, self)
}

export let datamodelListByWareHouse = (data, self) => {
    return http.fetchPost("/datamodel/listByWareHouse", data, self)
}
/*
部门查询
*/
export let permissionRoleListOrg = (data, self) => {
    return http.fetchPost("/permissionRole/listOrg", data, self)
}
/*
部门人员查询 穿orgId
*/
export let permissionRolePageUserPermission = (data, self) => {
    return http.fetchPost("/permissionRole/pageUserPermission", data, self)
}
export let permissionRoleListUser = (data, self) => {
    return http.fetchPost("/permissionRole/listUser", data, self)
}


/*查询方案 */
export let querySchemeList = (data, self) => {
    return http.fetchPost("/queryScheme/list", data, self)
}
export let querySchemeGrid = (data, self) => {
    return http.fetchPost("/queryScheme/grid", data, self)
}
export let querySchemeAdd = (data, self) => {
    return http.fetchPost("/queryScheme/add", data, self)
}
export let querySchemeEdit = (data, self) => {
    return http.fetchPost("/queryScheme/edit", data, self)
}
export let querySchemeDel = (data, self) => {
    return http.fetchPost("/queryScheme/del", data, self)
}
/*查询设计 */
export let queryDesignList = (data, self) => {
    return http.fetchPost("/queryDesign/list", data, self)
}
export let queryDesignGrid = (data, self) => {
    return http.fetchPost("/queryDesign/grid", data, self)
}
export let queryDesignAdd = (data, self) => {
    return http.fetchPost("/queryDesign/add", data, self)
}
export let queryDesignEdit = (data, self) => {
    return http.fetchPost("/queryDesign/edit", data, self)
}
export let queryDesignDel = (data, self) => {
    return http.fetchPost("/queryDesign/del", data, self)
}
export let queryDesignGet = (data, self) => {
    return http.fetchPost("/queryDesign/get", data, self)
}

/* 自定义显示 */ 
export let displaySchemeList = (data, self) => {
    return http.fetchPost("/displayScheme/list", data, self)
}
export let displaySchemeGrid = (data, self) => {
    return http.fetchPost("/displayScheme/grid", data, self)
}
export let displaySchemeAdd = (data, self) => {
    return http.fetchPost("/displayScheme/add", data, self)
}
export let displaySchemeEdit = (data, self) => {
    return http.fetchPost("/displayScheme/edit", data, self)
}
export let displaySchemeDel = (data, self) => {
    return http.fetchPost("/displayScheme/del", data, self)
}
export let displaySchemeGet = (data, self) => {
    return http.fetchPost("/displayScheme/get", data, self)
}
/* 运维设计 */
export let maintainDesignList = (data, self) => {
    return http.fetchPost("/maintainDesign/list", data, self)
}
export let maintainDesignGrid = (data, self) => {
    return http.fetchPost("/maintainDesign/grid", data, self)
}
export let maintainDesignAdd = (data, self) => {
    return http.fetchPost("/maintainDesign/add", data, self)
}
export let maintainDesignEdit = (data, self) => {
    return http.fetchPost("/maintainDesign/edit", data, self)
}
export let maintainDesignDel = (data, self) => {
    return http.fetchPost("/maintainDesign/del", data, self)
}
export let maintainDesignGet = (data, self) => {
    return http.fetchPost("/maintainDesign/get", data, self)
}
/* 自定义运维 */
export let maintainSchemeList = (data, self) => {
    return http.fetchPost("/maintainScheme/list", data, self)
}
export let maintainSchemeGrid = (data, self) => {
    return http.fetchPost("/maintainScheme/grid", data, self)
}
export let maintainSchemeAdd = (data, self) => {
    return http.fetchPost("/maintainScheme/add", data, self)
}
export let maintainSchemeEdit = (data, self) => {
    return http.fetchPost("/maintainScheme/edit", data, self)
}
export let maintainSchemeDel = (data, self) => {
    return http.fetchPost("/maintainScheme/del", data, self)
}
export let maintainSchemeGet = (data, self) => {
    return http.fetchPost("/maintainScheme/get", data, self)
}

/* 自定义显示 */
export let displayDesignList = (data, self) => {
    return http.fetchPost("/displayDesign/list", data, self)
}
export let displayDesignGrid = (data, self) => {
    return http.fetchPost("/displayDesign/grid", data, self)
}
export let displayDesignAdd = (data, self) => {
    return http.fetchPost("/displayDesign/add", data, self)
}
export let displayDesignEdit = (data, self) => {
    return http.fetchPost("/displayDesign/edit", data, self)
}
export let displayDesignDel = (data, self) => {
    return http.fetchPost("/displayDesign/del", data, self)
}
export let displayDesignGet = (data, self) => {
    return http.fetchPost("/displayDesign/get", data, self)
}

export let dataDomainGridDefined = (data, self) => {
    return http.fetchPost("/dataDomain/gridDefined", data, self)
}
export let dataDomainAdd = (data, self) => {
    return http.fetchPost("/dataDomain/add", data, self)
}
export let dataDomainEdit = (data, self) => {
    return http.fetchPost("/dataDomain/edit", data, self)
}
export let dataDomainDel = (data, self) => {
    return http.fetchPost("/dataDomain/del", data, self)
}
// 日志
export let dataLogGrid = (data, self) => {
    return http.fetchPost("/dataLog/grid", data, self)
}
export let dataLogOptionOperateType = (data, self) => {
    return http.fetchPost("/dataLog/optionOperateType", data, self)
}
export let dataLogOptionAppSrc = (data, self) => {
    return http.fetchPost("/dataLog/optionAppSrc", data, self)
}

export let dataLogOptionLike = (data, self) => {
    return http.fetchPost("/dataLog/optionLike", data, self)
}