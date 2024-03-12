import { api, buff } from '@/api/api.js'
import { fetchGet } from '@/api/axios_config.js'

export default {
    namespaced: true,
    state: {

        token : sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
        userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : '',
        userName: sessionStorage.getItem('userName') ? sessionStorage.getItem('userName') : '',
        roleId: sessionStorage.getItem('roleId') ? sessionStorage.getItem('roleId') : '',
        agentType: sessionStorage.getItem('agentType') ? sessionStorage.getItem('agentType') : '',
    },
    
    mutations: {
        // 更新用户相关信息
        update_user(state, payload) {
            console.log(payload)

            state.token = payload.token;
            state.userId = payload.userId;
            state.userName = payload.userName;
            state.roleId     = payload.roleId;
            state.agentType     = payload.agentType;
           
            sessionStorage.setItem('token', payload.token)
            sessionStorage.setItem('userId', payload.userId)
            sessionStorage.setItem('userName', payload.userName);
            sessionStorage.setItem('roleId', payload.roleId);
            sessionStorage.setItem('agentType', payload.agentType);
        },

        clear_user(state){

            state.token = '';
            state.userId = '';
            state.userName = '';
            state.roleId = '';
            state.agentType = '';
           
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userId')
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('roleId');
            sessionStorage.removeItem('agentType');
        }
    }
}