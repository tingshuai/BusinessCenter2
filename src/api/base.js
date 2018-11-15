import axios from 'axios'
// import {mapMutations} from 'vuex'
// axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
let port = '';
//请求方法
export default {
    // ...mapMutations(["SET_LOADING_TAG"]),
    fetchGet(url, data = {}, noPocPort = false) {
        let params = data.params ? this.setParams(data.params) : {};
        return new Promise((resolve, reject) => {
            axios.get((noPocPort? url : (this.getPocPort() + url)), {
                params
            }).then(res => {
                if (res.data.code == 200) {
                    resolve(res.data)
                } else {
                    if (data.Vue) {
                        data.Vue.$message.error(res.data.message);
                        reject(res)
                    }
                }
            }).catch(error => {
                if (data.Vue) {
                    data.Vue.$message.error('系统异常');
                }
                reject(null, error)
            })
        })
    },
    fetchQuickSearch(url, Vue) {
        return new Promise((resolve, reject) => {
            axios.get(this.getPocPort() + url).then(res => {
                if (res.data.result) {
                    resolve(res.data)
                } else {
                    if (Vue) {
                        Vue.$message.error(res.data.message);
                    }
                    reject(res)
                }
            }).catch(error => {
                if (Vue) {
                    Vue.$message.error('系统异常');
                }
                reject(null, error)
            })
        })
    },
    fetchPost(url, data = {},noPocPort=false) {
        if(data.Vue){
            data.Vue.$store.commit("SET_LOADING_TAG",1)
        }
        let params = data.params ? this.setParams(data.params) : {};
        return new Promise((resolve, reject) => {
            axios.post((noPocPort? url : (this.getPocPort() + url)), params).then(res => {
                if (res.data.result) {
                    resolve(res.data)
                } else {
                    if (data.Vue) {
                        data.Vue.$message.error(res.data.message);
                    }
                    reject(res)
                }
                if (data.Vue) {
                    setTimeout(() => {
                        data.Vue.$store.commit("SET_LOADING_TAG", -1)
                    }, 100);
                }
            }).catch(error => {
                if (data.Vue) {
                    data.Vue.$message.error('系统异常');
                }
                reject(null, error)
                if (data.Vue) {
                    setTimeout(() => {
                        data.Vue.$store.commit("SET_LOADING_TAG", -1)
                    }, 100);
                }
            })
        })
    },
    fetchPostJson(url, data = {}, noPocPort = false) {
        return new Promise((resolve, reject) => {
            axios.post((noPocPort? url : (this.getPocPort() + url)), data.params).then(res => {
                if (res.data.result) {
                    resolve(res.data)
                } else {
                    if (data.Vue) {
                        data.Vue.$message.error(res.data.message);
                    }
                    reject(res);
                }
            }).catch(error => {
                if (data.Vue) {
                    data.Vue.$message.error('系统异常');
                }
                reject(null, error);
            })
        })
    },
    setParams(params) {
        let fdata = new URLSearchParams();
        for (let attr in params) {
            if (null !== params[attr]) {
                fdata.append(attr, params[attr]);
            }
        }
        return fdata;
    },
    getPocPort() {
        if (!port) {
            port = localStorage.getItem('ports');
            console.log('port====>',port);
        }
        return port;
    }
}
