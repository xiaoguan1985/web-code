
import axios from 'axios'
import qs from 'qs'
import {buff} from '@/api/api.js'
/*
    *配置axios默认信息
*/
axios.defaults.headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.withCredentials=true;
axios.defaults.headers['token'] =  sessionStorage.getItem('token' + buff);
/**
 * 配置axios拦截请求响应
 */
axios.interceptors.request.use((config) => {

    if (sessionStorage.getItem('token' + buff)) {
        config.headers.token = sessionStorage.getItem('token'+ buff);
    }

    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

axios.interceptors.response.use((res) => {
    let data = res.data;
    return res;
}, (error) => {
    return Promise.reject(error);
})

function fetchGet(url, data) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: data })
            .then((res) => {
                let data = res.data;
                if (data.status) {
                    resolve(data);
                } else {
                    reject(data)
                }
            }, (err) => {
                err = {
                    message: '哎呀，网络不好啦'
                }
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

function fetchPost(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => {
                let data = res.data;
                if (data.status) {
                    resolve(data);
                } else {
                    reject(data)
                }
            }, err => {
                err = {
                    message: '哎呀，网络不好啦'
                }
                reject(err);
            })
    })
}

export {
    fetchGet,
    fetchPost
}